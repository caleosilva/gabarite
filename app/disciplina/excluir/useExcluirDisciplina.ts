import { useState } from "react";
import { toast } from "sonner";
import { DisciplinaType } from "@/models/Disciplina";

interface UseExcluirDisciplinaProps {
  disciplina: DisciplinaType | undefined;
  onSuccess: () => void;
  setOpen: (open: boolean) => void;
}

export function useExcluirDisciplina({
  disciplina,
  onSuccess,
  setOpen,
}: UseExcluirDisciplinaProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExcluir = async () => {
    if (!disciplina) return;

    const toastId = toast.loading("Excluindo disciplina...");

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/disciplina?id=${disciplina._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.titulo || "Erro ao Excluir", {
          description: data.msg || "Não foi possível excluir a disciplina.",
          id: toastId,
        });
        return;
      }

      toast.success("Disciplina removida", {
        description: "O registro foi excluído.",
        id: toastId,
      });

      setOpen(false);
      onSuccess();
    } catch (error: any) {
      toast.error("Erro de Conexão", {
        description: "Falha ao comunicar com o servidor.",
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleExcluir,
  };
}
