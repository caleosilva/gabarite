"use client";

import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import FormFieldBasic from "@/commons/componentes/FormField/FormField";
import { DisciplinaType } from "@/models/Disciplina";

interface FormCadastrarEditarDisciplinaProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  idForm: string;
  isEditMode?: boolean;
  disciplina?: DisciplinaType;
}

export function FormCadastrarEditarDisciplina({
  form,
  onSubmit,
  idForm,
  isEditMode = false,
}: FormCadastrarEditarDisciplinaProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id={idForm}
        className="space-y-5 flex flex-col p-6"
      >
        {/* Nome da Disciplina */}
        <FormFieldBasic
          form={form}
          name="nome"
          label="Nome da Disciplina"
          placeholder="Digite o nome da disciplina (ex: Direito Constitucional)"
          obrigatorio
        />

        {/* Campo oculto para o ID */}
        <input type="hidden" {...form.register("_id")} />
      </form>
    </Form>
  );
}
