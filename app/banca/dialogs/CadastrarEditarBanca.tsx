"use client";

import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormBanca } from "../commons/FormBanca"; 
import { BancaType } from "@/models/Banca";
import { useBancaForm } from "../commons/useBancaForm";

interface CadastrarEditarBancaProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  banca?: BancaType;
  open: boolean;
  setOpen: (open: boolean) => void;
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
}

export default function CadastrarEditarBanca({
  setUpdate,
  banca,
  open, 
  setOpen,
  setErroAtivo
}: CadastrarEditarBancaProps) {
  
  const { form, isSubmitting, isEditMode, idForm, onSubmit } = useBancaForm({
    banca,
    setErroAtivo,
    open,
    onSuccess: () => {
      setOpen(false);
      setUpdate(prev => !prev);
    }
  });

  return (
    <DialogDefault
      title={isEditMode ? "Editar Banca" : "Cadastrar Banca"}
      open={open}
      onOpenChange={setOpen}
      variant="form"
      formId={idForm}
      isSubmitting={isSubmitting}
      onCancel={() => form.reset()}
      submitLabel={isEditMode ? "Atualizar" : "Cadastrar"}
    >
      <div className="space-y-4">
        <FormBanca
          form={form}
          idForm={idForm}
          onSubmit={onSubmit}
          isEditMode={isEditMode}
          banca={banca}
        />
      </div>
    </DialogDefault>
  );
}
