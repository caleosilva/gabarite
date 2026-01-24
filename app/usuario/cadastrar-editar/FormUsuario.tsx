"use client";

import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import FormFieldBasic, {
  FormFieldEmail,
  FormFieldPassword,
} from "@/commons/componentes/FormField/FormField";

import FormFieldSelect from "@/commons/componentes/FormFieldSelect/FormFieldSelect"
import {getOpcoesCargo} from "@/commons/auth/enum/cargo";
import { UsuarioType } from "@/models/Usuario";
import { useAuthComponente } from "@/commons/auth/hooks/useAuthComponente/useAuthComponente";

interface FormUsuarioProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  idForm: string;
  isEditMode?: boolean;
  usuario?: UsuarioType;
}

export function FormUsuario({
  form,
  onSubmit,
  idForm,
  isEditMode = false,
}: FormUsuarioProps) {
  const { isAuthenticated } = useAuthComponente();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={idForm}
        className="space-y-5 flex flex-col p-6"
      >
        {/* Nome Completo */}
        <FormFieldBasic
          form={form}
          name="nome"
          label="Nome Completo"
          placeholder="Digite o nome do usuário"
          obrigatorio
        />

        {/* E-mail */}
        <FormFieldEmail
          form={form}
          name="email"
          label="E-mail"
          disabled={isEditMode} // Geralmente não permitimos trocar e-mail em edição por segurança
          descricao={
            isEditMode
              ? "O e-mail não pode ser alterado."
              : "E-mail principal para acesso."
          }
          obrigatorio
        />

        {/* Apenas exibe o select de cargo se estiver autenticado */}
        {isAuthenticated && (
          <FormFieldSelect
            form={form}
            name="cargo"
            label="Perfil de Acesso"
            placeholder="Selecione o cargo..."
            options={getOpcoesCargo()}
            obrigatorio
            descricao="Define as permissões do usuário no sistema."
            className="w-full"
          />
        )}

        {!isEditMode && (
          <>
            <FormFieldPassword
              form={form}
              name="senha"
              label={"Senha"}
              placeholder={"••••••••"}
              descricao={"Mínimo de 6 caracteres." }
              obrigatorio={!isEditMode} // Obrigatória apenas na criação
            />
          </>
        )}

        {/* Campo oculto para o ID (usado no update) */}
        <input type="hidden" {...form.register("_id")} />
      </form>
    </Form>
  );
}
