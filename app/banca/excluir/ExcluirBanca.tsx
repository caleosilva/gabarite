"use client";

import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormFieldDisplay } from "@/commons/componentes/FormFieldDisplay/FormFieldDisplay";
import { BancaType } from "@/models/Banca";
import { AlertTriangle } from "lucide-react";
import {useExcluirBanca} from "./useExcluirBanca";


interface ExcluirBancaProps {
  banca: BancaType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export default function ExcluirBanca({
  banca,
  open,
  setOpen,
  onSuccess,
}: ExcluirBancaProps) {
  const { isSubmitting, handleExcluir } = useExcluirBanca({
    banca,
    onSuccess,
    setOpen,
  });

  if (!banca) return null;

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
