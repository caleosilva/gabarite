'use client'

import * as React from "react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import FormFieldBasic, { 
  FormFieldEmail, 
  FormFieldPassword 
} from "@/commons/componentes/FormField/FormField";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UsuarioType } from "@/models/Usuario";

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
          descricao={isEditMode ? "O e-mail não pode ser alterado." : "E-mail principal para acesso."}
          obrigatorio
        />

        {/* Senha */}
        <FormFieldPassword
          form={form}
          name="senha"
          label={isEditMode ? "Nova Senha" : "Senha"}
          placeholder={isEditMode ? "Deixe em branco para manter a atual" : "••••••••"}
          descricao={isEditMode ? "Preencha apenas se desejar alterar a senha." : "Mínimo de 6 caracteres."}
          obrigatorio={!isEditMode} // Obrigatória apenas na criação
        />

        {/* URL da Foto */}
        <FormFieldBasic
          form={form}
          name="fotoUrl"
          label="URL da Foto de Perfil"
          type="url"
          placeholder="https://exemplo.com/foto.jpg"
        />

        {/* Switch para Admin */}
        <FormField
          control={form.control}
          name="isAdmin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Acesso de Administrador</FormLabel>
                <FormDescription>
                  Permite gerenciar outros usuários e configurações do sistema.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Campo oculto para o ID (usado no update) */}
        <input type="hidden" {...form.register("_id")} />
      </form>
    </Form>
  );
}