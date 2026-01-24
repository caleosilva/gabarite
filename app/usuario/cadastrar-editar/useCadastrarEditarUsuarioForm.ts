"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  createCadastrarEditarUsuarioFormSchema,
  UsuarioFormInput,
  UsuarioFormOutput,
} from "./form-usuario-schema";
import { UsuarioType } from "@/models/Usuario";

interface useCadastrarEditarUsuarioFormProps {
  usuario?: UsuarioType;
  onSuccess: () => void;
  open?: boolean;
}

export function useCadastrarEditarUsuarioForm({
  usuario,
  onSuccess,
  open,
}: useCadastrarEditarUsuarioFormProps) {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!usuario;
  const idForm = isEditMode ? "formEditarUsuario" : "formCadastrarUsuario";

  const form = useForm<UsuarioFormInput>({
    resolver: zodResolver(createCadastrarEditarUsuarioFormSchema(usuario)),
    defaultValues: {
      nome: usuario?.nome ?? "",
      email: usuario?.email ?? "",
      cargo: usuario?.cargo ?? "",
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

          if (!response.ok) {
            throw new Error("Não foi possível carregar os dados.");
          }

          const data = await response.json();
          if (response.ok && data) {
            form.reset({
              nome: data.nome,
              email: data.email,
              cargo: data.cargo,
              _id: data._id,
              senha: "",
            });
          }
        } catch (error) {
          toast.error("Erro ao carregar dados", {
            description:
              "Não conseguimos buscar as informações atualizadas do usuário.",
          });
        } finally {
          setIsLoading(false);
        }
      } else if (open && !isEditMode) {
        // Limpa o formulário ao abrir para cadastro
        form.reset({
          nome: "",
          email: "",
          cargo: "",
          senha: "",
          _id: "",
        });
      }
    };

    buscarDadosUsuario();
  }, [open, isEditMode, usuario?._id, form]);

  const onSubmit = async (values: UsuarioFormOutput) => {
    const toastId = toast.loading(
      isEditMode ? "Atualizando usuário..." : "Criando usuário...",
    );

    try {
      setIsSubmitting(true);
      const isPublicRegister = !session;
      let url = isPublicRegister
        ? "/api/registrarUsuarioLogin"
        : "/api/usuario";

      if (isEditMode && usuario?._id) url += `?id=${usuario._id}`;

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.titulo || "Atenção", {
          description: data.msg || "Erro ao salvar os dados.",
          id: toastId,
        });
        return;
      }

      toast.success(
        isEditMode ? "Usuário atualizado!" : "Usuário criado com sucesso!",
        {
          description: "As alterações já estão disponíveis no sistema.",
          id: toastId,
        },
      );

      form.reset();
      onSuccess();
    } catch (error) {
      toast.error("Erro de Conexão", {
        description: "Não foi possível comunicar com o servidor.",
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, isLoading, isEditMode, idForm, onSubmit };
}
