'use client'

import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { 
  FormFieldEmail, 
  FormFieldPassword 
} from "@/commons/componentes/FormField/FormField";

interface FormLoginProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  idForm: string;
  isSubmitting?: boolean;
}

export function FormLogin({
  form,
  onSubmit,
  idForm,
  isSubmitting = false,
}: FormLoginProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={idForm}
        className="space-y-4 flex flex-col"
      >
        {/* E-mail de Acesso */}
        <FormFieldEmail
          form={form}
          name="email"
          label="E-mail"
          placeholder="seu@email.com"
          disabled={isSubmitting}
          obrigatorio
        />

        {/* Senha de Acesso */}
        <FormFieldPassword
          form={form}
          name="senha"
          label="Senha"
          placeholder="••••••••"
          disabled={isSubmitting}
          obrigatorio
        />
      </form>
    </Form>
  );
}