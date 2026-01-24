import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBancaFormSchema, BancaFormInput, BancaFormOutput } from "./formSchema";
import { BancaType } from "@/models/Banca";

interface UseBancaFormProps {
  banca?: BancaType;
  onSuccess: () => void;
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
  open?: boolean;
}

export function useBancaForm({ banca, onSuccess, setErroAtivo, open }: UseBancaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const isEditMode = !!banca;
  const idForm = isEditMode ? "formEditarBanca" : "formCadastrarBanca";

  const form = useForm<BancaFormInput>({
    resolver: zodResolver(createBancaFormSchema(banca)),
    defaultValues: {
      nome: banca?.nome ?? "",
      _id: banca?._id?.toString() ?? "",
    },
  });
  
  // Carrega dados frescos se estiver editando
  useEffect(() => {
    const buscarDadosBanca = async () => {
      if (open && isEditMode && banca?._id) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/banca?id=${banca._id}`);
          const data = await response.json();

          if (response.ok && data) {
            form.reset({
              nome: data.nome,
              _id: data._id,
            });
          }
        } catch (error) {
          console.error("Erro ao carregar dados da banca:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (open && !isEditMode) {
        // Limpa o formulário ao abrir para cadastro
        form.reset({
          nome: "",
          _id: "",
        });
      }
    };

    buscarDadosBanca();
  }, [open, isEditMode, banca?._id, form]);

  const onSubmit = async (values: BancaFormOutput) => {
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
