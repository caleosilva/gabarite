"use client";

import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import FormFieldBasic from "@/commons/componentes/FormField/FormField";
import { BancaType } from "@/models/Banca";

interface FormBancaProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  idForm: string;
  isEditMode?: boolean;
  banca?: BancaType;
}

export function FormBanca({
  form,
  onSubmit,
  idForm,
  isEditMode = false,
}: FormBancaProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={idForm}
        className="space-y-5 flex flex-col p-6"
      >
        {/* Nome da Banca */}
        <FormFieldBasic
          form={form}
          name="nome"
          label="Nome da Banca"
          placeholder="Digite o nome da banca (ex: CESPE, FGV)"
          obrigatorio
        />

        {/* Campo oculto para o ID */}
        <input type="hidden" {...form.register("_id")} />
      </form>
    </Form>
  );
}
