"use client"

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createformCadastrarEditarSchema,
  OrgaoFormInput,
  OrgaoFormOutput,
} from "./formCadastrarEditarSchema";
import { OrgaoType } from "@/models/Orgao";

interface useCadastrarEditarOrgaoFormProps {
  orgao?: OrgaoType;
  onSuccess: () => void;
  open?: boolean;
}

export function useCadastrarEditarOrgaoForm({
  orgao,
  onSuccess,
  open,
}: useCadastrarEditarOrgaoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!orgao;
  const idForm = isEditMode ? "formEditarOrgao" : "formCadastrarOrgao";

  const form = useForm<OrgaoFormInput>({
    resolver: zodResolver(createformCadastrarEditarSchema(orgao)),
    defaultValues: {
      nome: orgao?.nome ?? "",
      _id: orgao?._id?.toString() ?? "",
    },
  });

  // Carrega dados atualizados se estiver editando
  useEffect(() => {
    const buscarDadosOrgao = async () => {
      if (open && isEditMode && orgao?._id) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/orgao?id=${orgao._id}`);

          if (!response.ok) {
            throw new Error("Não foi possível carregar os dados.");
          }

          const data = await response.json();

          if (data) {
            form.reset({  
              nome: data.nome,
              _id: data._id,
            });
          }
        } catch (error) {
          toast.error("Erro ao carregar dados", {
            description:
              "Não conseguimos buscar as informações atualizadas do órgão.",
          });
        } finally {
          setIsLoading(false);
        }
      } else if (open && !isEditMode) {
        form.reset({
          nome: "",
          _id: "",
        });
      }
    };

    buscarDadosOrgao();
  }, [open, isEditMode, orgao?._id, form]);

  const onSubmit = async (values: OrgaoFormOutput) => {
    // ID único para o toast de carregamento
    const toastId = toast.loading(
      isEditMode ? "Atualizando órgão..." : "Criando órgão...",
    );

    try {
      setIsSubmitting(true);
      let url = "/api/orgao";

      if (isEditMode && orgao?._id) url += `?id=${orgao._id}`;

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
        isEditMode ? "Órgão atualizado!" : "Órgão criado com sucesso!",
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
