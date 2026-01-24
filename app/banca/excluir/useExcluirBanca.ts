// hooks/useExcluirBanca.ts
import { useState } from "react";
import { toast } from "sonner";
import { BancaType } from "@/models/Banca";

interface UseExcluirBancaProps {
  banca: BancaType | undefined;
  onSuccess: () => void;
  setOpen: (open: boolean) => void;
}

export function useExcluirBanca({
  banca,
  onSuccess,
  setOpen,
}: UseExcluirBancaProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExcluir = async () => {
    if (!banca) return;

    const toastId = toast.loading("Excluindo banca...");

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/banca?id=${banca._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.titulo || "Erro ao Excluir", {
          description: data.msg || "Não foi possível excluir a banca.",
          id: toastId,
        });
        return;
      }

      toast.success("Banca removida", {
        description: "O registro foi excluído permanentemente.",
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
