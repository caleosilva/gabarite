// hooks/useExcluirBanca.ts
import { useState } from "react";
import { toast } from "sonner";
import { UsuarioType } from "@/models/Usuario";

interface useExcluirUsuarioProps {
  usuario: UsuarioType | undefined;
  onSuccess: () => void;
  setOpen: (open: boolean) => void;
}

export function useExcluirUsuario({
  usuario,
  onSuccess,
  setOpen,
}: useExcluirUsuarioProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExcluir = async () => {
    if (!usuario) return;

    const toastId = toast.loading("Excluindo usuário...");

    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/usuario?id=${usuario._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.titulo || "Erro ao Excluir", {
          description: data.msg || "Não foi possível excluir o usuário.",
          id: toastId,
        });
        return;
      }


      toast.success("Usuário removido", {
        description: "O registro foi excluído..",
        id: toastId,
      });

      setOpen(false);
      onSuccess();
    } catch (error) {
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
