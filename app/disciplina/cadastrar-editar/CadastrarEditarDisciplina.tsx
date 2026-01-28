"use client";

import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormCadastrarEditarDisciplina } from "./FormCadastrarEditarDisciplina"; 
import { DisciplinaType } from "@/models/Disciplina";
import { useCadastrarEditarDisciplinaForm } from "./useCadastrarEditarDisciplinaForm";

interface CadastrarEditarDisciplinaProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  disciplina?: DisciplinaType;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CadastrarEditarDisciplina({
  setUpdate,
  disciplina,
  open, 
  setOpen,
}: CadastrarEditarDisciplinaProps) {
  
  const { form, isSubmitting, isEditMode, idForm, onSubmit } = useCadastrarEditarDisciplinaForm({
    disciplina,
    open,
    onSuccess: () => {
      setOpen(false);
      setUpdate(prev => !prev);
    }
  });

  return (
    <DialogDefault
      title={isEditMode ? "Editar Disciplina" : "Cadastrar Disciplina"}
      open={open}
      onOpenChange={setOpen}
      variant="form"
      formId={idForm}
      isSubmitting={isSubmitting}
      onCancel={() => form.reset()}
      submitLabel={isEditMode ? "Atualizar" : "Cadastrar"}
    >
      <div className="space-y-4">
        <FormCadastrarEditarDisciplina
          form={form}
          idForm={idForm}
          onSubmit={onSubmit}
          isEditMode={isEditMode}
          disciplina={disciplina}
        />
      </div>
    </DialogDefault>
  );
}
