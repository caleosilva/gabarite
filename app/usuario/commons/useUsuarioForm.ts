// hooks/useUsuarioForm.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { createUsuarioFormSchema, UsuarioFormInput, UsuarioFormOutput } from "./formSchema";
import { UsuarioType } from "@/models/Usuario";

interface UseUsuarioFormProps {
  usuario?: UsuarioType;
  onSuccess: () => void;
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
}

export function useUsuarioForm({ usuario, onSuccess, setErroAtivo }: UseUsuarioFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  return { form, isSubmitting, isEditMode, idForm, onSubmit };
}