"use client";

import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormFieldDisplay } from "@/commons/componentes/FormFieldDisplay/FormFieldDisplay";
import { DisciplinaType } from "@/models/Disciplina";
import { AlertTriangle } from "lucide-react";
import { useExcluirDisciplina } from "./useExcluirDisciplina";

interface ExcluirDisciplinaProps {
  disciplina: DisciplinaType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export default function ExcluirDisciplina({
  disciplina,
  open,
  setOpen,
  onSuccess,
}: ExcluirDisciplinaProps) {
  const { isSubmitting, handleExcluir } = useExcluirDisciplina({
    disciplina,
    onSuccess,
    setOpen,
  });

  if (!disciplina) return null;

  return (
    <DialogDefault
      title="Excluir Disciplina"
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
            <p>Você tem certeza que deseja remover esta disciplina do sistema?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormFieldDisplay label="Nome da Disciplina" valor={disciplina.nome} />
        </div>
      </div>
    </DialogDefault>
  );
}
