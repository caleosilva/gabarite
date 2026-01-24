"use client";

import { toast } from "sonner";
import * as React from "react";
import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormFieldDisplay } from "@/commons/componentes/FormFieldDisplay/FormFieldDisplay";
import { BancaType } from "@/models/Banca";
import { AlertTriangle } from "lucide-react";

interface ExcluirBancaProps {
  banca: BancaType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
}

export default function ExcluirBanca({
  banca,
  open,
  setOpen,
  onSuccess,
  setErroAtivo,
}: ExcluirBancaProps) {
  if (!banca) return null;
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleExcluir = async () => {
  // 1. Iniciamos o toast de carregamento
  const toastId = toast.loading("Excluindo banca...");

  try {
    setIsSubmitting(true);

    const response = await fetch(`/api/banca?id=${banca._id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      // 2. Erro vindo da API
      toast.error(data.titulo || "Erro ao Excluir", {
        description: data.msg || "Não foi possível excluir a banca.",
        id: toastId,
      });
      return;
    }

    // 3. Sucesso
    toast.success("Banca removida", {
      description: "O registro foi excluído permanentemente.",
      id: toastId,
    });

    setOpen(false);
    onSuccess();
  } catch (error) {
    // 4. Erro de rede
    toast.error("Erro de Conexão", {
      description: "Falha ao comunicar com o servidor.",
      id: toastId,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <DialogDefault
      title="Excluir Banca"
      open={open}
      onOpenChange={setOpen}
      variant="danger"
      isSubmitting={isSubmitting}
      submitLabel="Excluir"
      onSubmit={handleExcluir}
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Cuidado</p>
            <p>Você tem certeza que deseja remover esta banca do sistema?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormFieldDisplay label="Nome da Banca" valor={banca.nome} />
        </div>
      </div>
    </DialogDefault>
  );
}
