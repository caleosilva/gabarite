"use client";

import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormFieldDisplay } from "@/commons/componentes/FormFieldDisplay/FormFieldDisplay";
import { OrgaoType } from "@/models/Orgao";
import { AlertTriangle } from "lucide-react";
import { useExcluirOrgao } from "./useExcluirOrgao";

interface ExcluirOrgaoProps {
  orgao: OrgaoType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export default function ExcluirOrgao({
  orgao,
  open,
  setOpen,
  onSuccess,
}: ExcluirOrgaoProps) {
  const { isSubmitting, handleExcluir } = useExcluirOrgao({
    orgao,
    onSuccess,
    setOpen,
  });

  if (!orgao) return null;

  return (
    <DialogDefault
      title="Excluir Órgão"
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
            <p>Você tem certeza que deseja remover este órgão do sistema?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormFieldDisplay label="Nome do Órgão" valor={orgao.nome} />
        </div>
      </div>
    </DialogDefault>
  );
}
