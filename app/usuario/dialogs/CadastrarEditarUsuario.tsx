"use client";

import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormUsuario } from "../commons/FormUsuario"; 
import { UsuarioType } from "@/models/Usuario";
import { useUsuarioForm } from "../commons/useUsuarioForm";

interface CadastrarEditarUsuarioProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  usuario?: UsuarioType;
  open: boolean;
  setOpen: (open: boolean) => void;
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
}

export default function CadastrarEditarUsuario({
  setUpdate,
  usuario,
  open, 
  setOpen,
  setErroAtivo
}: CadastrarEditarUsuarioProps) {
  
  const { form, isSubmitting, isEditMode, idForm, onSubmit } = useUsuarioForm({
    usuario,
    setErroAtivo,
    onSuccess: () => {
      setOpen(false);
      setUpdate(prev => !prev);
    }
  });

  return (
    <DialogDefault
      title={isEditMode ? "Editar Usuário" : "Cadastrar Usuário"}
      open={open}
      onOpenChange={setOpen}
      variant="form"
      formId={idForm}
      isSubmitting={isSubmitting}
      onCancel={() => form.reset()}
      submitLabel={isEditMode ? "Atualizar" : "Cadastrar"}
    >
      <div className="space-y-4">
        <FormUsuario
          form={form}
          idForm={idForm}
          onSubmit={onSubmit}
          isEditMode={isEditMode}
          usuario={usuario}
        />
      </div>
    </DialogDefault>
  );
}