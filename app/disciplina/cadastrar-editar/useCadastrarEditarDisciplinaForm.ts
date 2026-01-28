"use client"

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createformCadastrarEditarSchema,
  DisciplinaFormInput,
  DisciplinaFormOutput,
} from "./formCadastrarEditarSchema";
import { DisciplinaType } from "@/models/Disciplina";

interface useCadastrarEditarDisciplinaFormProps {
  disciplina?: DisciplinaType;
  onSuccess: () => void;
  open?: boolean;
}

export function useCadastrarEditarDisciplinaForm({
  disciplina,
  onSuccess,
  open,
}: useCadastrarEditarDisciplinaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!disciplina;
  const idForm = isEditMode ? "formEditarDisciplina" : "formCadastrarDisciplina";

  const form = useForm<DisciplinaFormInput>({
    resolver: zodResolver(createformCadastrarEditarSchema(disciplina)),
    defaultValues: {
      nome: disciplina?.nome ?? "",
      _id: disciplina?._id?.toString() ?? "",
    },
  });

  // Carrega dados atualizados se estiver editando
  useEffect(() => {
    const buscarDadosDisciplina = async () => {
      if (open && isEditMode && disciplina?._id) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/disciplina?id=${disciplina._id}`);

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
              "Não conseguimos buscar as informações atualizadas da disciplina.",
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

    buscarDadosDisciplina();
  }, [open, isEditMode, disciplina?._id, form]);

  const onSubmit = async (values: DisciplinaFormOutput) => {
    // ID único para o toast de carregamento
    const toastId = toast.loading(
      isEditMode ? "Atualizando disciplina..." : "Criando disciplina...",
    );

    try {
      setIsSubmitting(true);
      let url = "/api/disciplina";

      if (isEditMode && disciplina?._id) url += `?id=${disciplina._id}`;

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
        isEditMode ? "Disciplina atualizada!" : "Disciplina criada com sucesso!",
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
