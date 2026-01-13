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
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
}

export default function CadastrarEditarUsuario({
  update,
  setUpdate,
  usuario,
  open, 
  setOpen,
  setErroAtivo
}: CadastrarEditarUsuarioProps) {
  const { data: session } = useSession();
//   const { toast } = useToast();

  // Estados de Controle
  const [isFormSubmitting, setFormSubmitting] = useState(false);

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
  };

  const onSubmit = async (values: UsuarioFormOutput) => {
    try {
      setFormSubmitting(true);

      const isPublicRegister = !session;
      let url = isPublicRegister ? "/api/registrarUsuarioLogin" : "/api/usuario";

      if (isEditMode && usuario?._id)
        url += `?id=${usuario._id}`;

      const response = await fetch(url, {
        method: httpMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se existir a prop (veio da UsuariosPage), usa o modal global
        if (setErroAtivo) {
          setErroAtivo({
            titulo: data.titulo || "Atenção",
            msg: data.msg || "Erro ao salvar."
          });
        } else {
          // Se NÃO existir (veio da LoginPage), usa um fallback (toast ou alert)
          alert(`${data.titulo || 'Erro'}: ${data.msg}`);
          // Ou se tiver o toast: toast({ title: data.titulo, description: data.msg, variant: "destructive" });
        }
        return;
      }

      setOpen(false);
      if (setUpdate) setUpdate(prev => !prev);
      form.reset();
    } catch (error: any) {
      setFormSubmitting(false);

      if (setErroAtivo) {
          setErroAtivo({
            titulo: "Erro de Conexão",
            msg: "Não foi possível comunicar com o servidor. Verifique sua internet."
          });
        } else {
          alert(`Erro: ${error}`);
        }


      
    } finally {
      setFormSubmitting(false);
    }
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