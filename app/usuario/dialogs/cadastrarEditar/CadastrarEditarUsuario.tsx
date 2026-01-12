"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

// import { useToast } from "@/components/ui/use-toast";
// import AlertDestructive from "@/components/elements/AlertDestructive/AlertDestructive";
// import AlertAttention from "@/components/elements/AlertAttention/AlertDestructive";
import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";

import { FormUsuario } from "./FormUsuario"; 
import { createUsuarioFormSchema, UsuarioFormInput, UsuarioFormOutput } from "./formSchema";
import { UsuarioType } from "@/models/Usuario";

interface CadastrarEditarUsuarioProps {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  usuario?: UsuarioType;

  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CadastrarEditarUsuario({
  update,
  setUpdate,
  usuario,
  open, 
  setOpen, 
}: CadastrarEditarUsuarioProps) {
  const { data: session } = useSession();
//   const { toast } = useToast();

  // Estados de Controle
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const [erroServer, setErroServer] = useState(false);
  const [erroUsuarioExiste, setErroUsuarioExiste] = useState(false);

  //  Determina o modo de operação
  const isEditMode = !!usuario;
  const dialogTitle = isEditMode ? "Editar Usuário" : "Cadastrar Usuário";
  const successMessage = isEditMode 
    ? "As informações do usuário foram atualizadas." 
    : "O usuário foi cadastrado com sucesso.";
  const idForm = isEditMode ? "formEditarUsuario" : "formCadastrarUsuario";
  const httpMethod = isEditMode ? "PUT" : "POST";

  // Configuração do Formulário
  const formSchema = createUsuarioFormSchema(usuario);
  const getInitialValues = (): UsuarioFormInput => {
    if (isEditMode && usuario) {
      return {
      // Campos obrigatórios
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin,

      // Se for null ou undefined no banco, vira "" para o formulário
      fotoUrl: usuario.fotoUrl ?? "", 
      
      senha: "", 
      _id: usuario._id?.toString() || "",
    };
    }

    // Modo Cadastro: Dados padrão e sessão
    return {
      nome: "",
      email: "",
      senha: "",
      fotoUrl: "",
      isAdmin: false,
      _id: "",
    };
  };

  // Constrói o formulário
  const form = useForm<UsuarioFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialValues(),
  });

  const limparCampos = () => {
    form.reset();
    setErroServer(false);
    setErroUsuarioExiste(false);
  };

  // Submissão
  const onSubmit = async (values: UsuarioFormOutput) => {
    console.log("values: ", values)
  };

  function renderBody() {
    return (
      <div className="space-y-4">
        <FormUsuario
          form={form}
          idForm={idForm}
          onSubmit={onSubmit}
          isEditMode={isEditMode}
          usuario={usuario}
        />

        {/* {erroServer && (
          <AlertDestructive
            titulo="Erro no Servidor"
            descricao="Não foi possível processar a solicitação. Tente novamente mais tarde."
          />
        )}

        {erroUsuarioExiste && (
          <AlertAttention
            titulo="E-mail Duplicado"
            descricao="Já existe um usuário cadastrado com este e-mail."
          />
        )} */}
      </div>
    );
  }

  return (
  <DialogDefault
    // Essenciais
    title={dialogTitle}
    open={open}
    onOpenChange={setOpen}
    
    // Configuração de Formulário
    variant="form"
    formId={idForm}
    isSubmitting={isFormSubmitting}
    onCancel={limparCampos}
    submitLabel={isEditMode ? "Atualizar" : "Cadastrar"}
  >
    
    {renderBody()}
  </DialogDefault>
);
}