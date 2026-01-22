"use client";

import * as React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// --- TIPAGEM ---

// Definimos a estrutura padrão para as opções do select
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean; // Opção para desabilitar um item específico da lista
}

interface PropsFormFieldSelect<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  
  // Dados principais
  options: SelectOption[];

  // Opcionais
  placeholder?: string;
  descricao?: string;
  disabled?: boolean;
  obrigatorio?: boolean;

  // Customização
  className?: string;
  // classNameLabel?: string; // Opcional: se quiser customizar o label individualmente
  // classNameTrigger?: string; // Opcional: se quiser customizar o botão do select

  // Callbacks
  onChangeCallBack?: (valor: string) => void;
}

// --- COMPONENTE PRINCIPAL ---
export default function FormFieldSelect<TFormValues extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Selecione...",
  descricao,
  disabled = false,
  obrigatorio = false,
  className,
  onChangeCallBack,
}: PropsFormFieldSelect<TFormValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn(disabled && "text-muted-foreground")}>
            {label}
            {obrigatorio && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          
          {/* O componente Select do Radix/Shadcn envolve o FormControl */}
          <Select
            disabled={disabled}
            onValueChange={(value) => {
                // Atualiza o estado do react-hook-form
                field.onChange(value);
                // Chama o callback customizado se existir
                onChangeCallBack?.(value);
            }}
            value={field.value} // Componente controlado
            defaultValue={field.value} 
          >
            <FormControl>
              <SelectTrigger>
                {/* O SelectValue exibe o label da opção selecionada ou o placeholder */}
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {/* Mapeamento das opções */}
              {options.length > 0 ? (
                options.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                // Caso não haja opções, mostra um item desabilitado
                 <SelectItem value="_empty" disabled>
                    Nenhuma opção disponível
                 </SelectItem>
              )}
            </SelectContent>
          </Select>

          {descricao && <FormDescription>{descricao}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}