import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { createUsuarioFormSchema, UsuarioFormInput, UsuarioFormOutput } from "./formSchema";
import { UsuarioType } from "@/models/Usuario";

interface UseUsuarioFormProps {
  usuario?: UsuarioType;
  onSuccess: () => void;
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
  open?: boolean;
}

export function useUsuarioForm({ usuario, onSuccess, setErroAtivo, open }: UseUsuarioFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const isEditMode = !!usuario;
  const idForm = isEditMode ? "formEditarUsuario" : "formCadastrarUsuario";

  const form = useForm<UsuarioFormInput>({
    resolver: zodResolver(createUsuarioFormSchema(usuario)),
    defaultValues: {
      nome: usuario?.nome ?? "",
      email: usuario?.email ?? "",
      isAdmin: usuario?.isAdmin ?? false,
      fotoUrl: usuario?.fotoUrl ?? "",
      senha: "",
      _id: usuario?._id?.toString() ?? "",
    },
  });
  
  useEffect(() => {
    const buscarDadosUsuario = async () => {
      if (open && isEditMode && usuario?._id) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/usuario?id=${usuario._id}`);
          const data = await response.json();

          if (response.ok && data) {
            form.reset({
              nome: data.nome,
              email: data.email,
              isAdmin: data.isAdmin,
              fotoUrl: data.fotoUrl || "",
              _id: data._id,
              senha: "",
            });
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (open && !isEditMode) {
        // Limpa o formulário ao abrir para cadastro
        form.reset({
          nome: "",
          email: "",
          isAdmin: false,
          fotoUrl: "",
          senha: "",
          _id: "",
        });
      }
    };

    buscarDadosUsuario();
  }, [open, isEditMode, usuario?._id, form]);

  const onSubmit = async (values: UsuarioFormOutput) => {
    try {
      setIsSubmitting(true);
      const isPublicRegister = !session;
      let url = isPublicRegister ? "/api/registrarUsuarioLogin" : "/api/usuario";
      
      if (isEditMode && usuario?._id) url += `?id=${usuario._id}`;

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = { titulo: data.titulo || "Atenção", msg: data.msg || "Erro ao salvar." };
        setErroAtivo ? setErroAtivo(errorData) : alert(`${errorData.titulo}: ${errorData.msg}`);
        return;
      }

      form.reset();
      onSuccess();
    } catch (error) {
      const connError = { titulo: "Erro de Conexão", msg: "Falha ao comunicar com o servidor." };
      setErroAtivo ? setErroAtivo(connError) : alert(connError.msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, isLoading, isEditMode, idForm, onSubmit };
}