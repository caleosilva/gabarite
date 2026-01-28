"use client";

import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import {FormCadastrarEditarOrgao} from "@/app/orgao/cadastrar-editar/FormCadastrarEditarOrgao";
import { OrgaoType } from "@/models/Orgao";
import { useCadastrarEditarOrgaoForm } from "./useCadastrarEditarOrgaoForm";

interface CadastrarEditarOrgaoProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  orgao?: OrgaoType;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CadastrarEditarOrgao({
  setUpdate,
  orgao,
  open, 
  setOpen,
}: CadastrarEditarOrgaoProps) {
  
  const { form, isSubmitting, isEditMode, idForm, onSubmit } = useCadastrarEditarOrgaoForm({
    orgao,
    open,
    onSuccess: () => {
      setOpen(false);
      setUpdate(prev => !prev);
    }
  });

  return (
    <DialogDefault
      title={isEditMode ? "Editar Órgão" : "Cadastrar Órgão"}
      open={open}
      onOpenChange={setOpen}
      variant="form"
      formId={idForm}
      isSubmitting={isSubmitting}
      onCancel={() => form.reset()}
      submitLabel={isEditMode ? "Atualizar" : "Cadastrar"}
    >
      <div className="space-y-4">
        <FormCadastrarEditarOrgao
          form={form}
          idForm={idForm}
          onSubmit={onSubmit}
          isEditMode={isEditMode}
          orgao={orgao}
        />
      </div>
    </DialogDefault>
  );
}
