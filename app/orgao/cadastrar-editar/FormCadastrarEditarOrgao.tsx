"use client";

import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import FormFieldBasic from "@/commons/componentes/FormField/FormField";
import { OrgaoType } from "@/models/Orgao";

interface FormCadastrarEditarOrgaoProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  idForm: string;
  isEditMode?: boolean;
  orgao?: OrgaoType;
}

export function FormCadastrarEditarOrgao({
  form,
  onSubmit,
  idForm,
  isEditMode = false,
}: FormCadastrarEditarOrgaoProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={idForm}
        className="space-y-5 flex flex-col p-6"
      >
        {/* Nome do Órgão */}
        <FormFieldBasic
          form={form}
          name="nome"
          label="Nome do Órgão"
          placeholder="Digite o nome do órgão (ex: TCU, CGU)"
          obrigatorio
        />

        {/* Campo oculto para o ID */}
        <input type="hidden" {...form.register("_id")} />
      </form>
    </Form>
  );
}
