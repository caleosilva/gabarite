import { useState } from "react";
import { toast } from "sonner";
import { OrgaoType } from "@/models/Orgao";

interface UseExcluirOrgaoProps {
  orgao: OrgaoType | undefined;
  onSuccess: () => void;
  setOpen: (open: boolean) => void;
}

export function useExcluirOrgao({
  orgao,
  onSuccess,
  setOpen,
}: UseExcluirOrgaoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExcluir = async () => {
    if (!orgao) return;

    const toastId = toast.loading("Excluindo órgão...");

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/orgao?id=${orgao._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.titulo || "Erro ao Excluir", {
          description: data.msg || "Não foi possível excluir o órgão.",
          id: toastId,
        });
        return;
      }

      toast.success("Órgão removido", {
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
