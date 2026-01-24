"use client"

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createformCadastrarEditarSchema,
  BancaFormInput,
  BancaFormOutput,
} from "./formCadastrarEditarSchema";
import { BancaType } from "@/models/Banca";

interface useCadastrarEditarBancaFormProps {
  banca?: BancaType;
  onSuccess: () => void;
  open?: boolean;
}

export function useCadastrarEditarBancaForm({
  banca,
  onSuccess,
  open,
}: useCadastrarEditarBancaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!banca;
  const idForm = isEditMode ? "formEditarBanca" : "formCadastrarBanca";

  const form = useForm<BancaFormInput>({
    resolver: zodResolver(createformCadastrarEditarSchema(banca)),
    defaultValues: {
      nome: banca?.nome ?? "",
      _id: banca?._id?.toString() ?? "",
    },
  });

  // Carrega dados atualizados se estiver editando
  useEffect(() => {
    const buscarDadosBanca = async () => {
      if (open && isEditMode && banca?._id) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/banca?id=${banca._id}`);

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
              "Não conseguimos buscar as informações atualizadas da banca.",
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

    buscarDadosBanca();
  }, [open, isEditMode, banca?._id, form]);

  const onSubmit = async (values: BancaFormOutput) => {
    // ID único para o toast de carregamento
    const toastId = toast.loading(
      isEditMode ? "Atualizando banca..." : "Criando banca...",
    );

    try {
      setIsSubmitting(true);
      let url = "/api/banca";

      if (isEditMode && banca?._id) url += `?id=${banca._id}`;

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
        isEditMode ? "Banca atualizada!" : "Banca criada com sucesso!",
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
