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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- TIPAGEM ---
type TipoInput = "text" | "email" | "password" | "number" | "tel" | "url" | "date" | "time" | "datetime-local";

interface PropsFormFieldBasic<TFormValues extends FieldValues> {
  // Form (tipado com react-hook-form)
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  
  // Essenciais
  label: string;
  type?: TipoInput;
  placeholder?: string;
  
  // Opcionais
  descricao?: string;
  disabled?: boolean;
  obrigatorio?: boolean;
  
  // Validações/Restrições
  maxLength?: number;
  minLength?: number;
  max?: number | string; // Para number/date
  min?: number | string; // Para number/date
  step?: number | string; // Para number
  pattern?: string; // Regex pattern
  
  // Customização
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  
  // Transformações
  transformarValor?: (valor: any) => any;
  aoMudar?: (valor: any) => void;
}

// --- COMPONENTE PRINCIPAL ---
export default function FormFieldBasic<TFormValues extends FieldValues>({
  form,
  name,
  label,
  type = "text",
  placeholder,
  descricao,
  disabled = false,
  obrigatorio = false,
  maxLength,
  minLength,
  max,
  min,
  step,
  pattern,
  className,
  classNameLabel,
  classNameInput,
  transformarValor,
  aoMudar,
}: PropsFormFieldBasic<TFormValues>) {
  
  /**
   * Formata o valor do campo baseado no tipo
   */
  const formatarValor = React.useCallback((valor: any): string => {
    // Valores nulos/undefined/vazios
    if (valor === undefined || valor === null || valor === '') {
      return '';
    }

    // Aplicar transformação customizada se existir
    if (transformarValor) {
      return transformarValor(valor);
    }

    // Formatação para datas
    if (type === 'date' || type === 'datetime-local') {
      try {
        if (typeof valor === 'string' || valor instanceof Date) {
          const data = new Date(valor);
          
          if (isNaN(data.getTime())) {
            return '';
          }
          
          // Para datetime-local: YYYY-MM-DDTHH:mm
          if (type === 'datetime-local') {
            return data.toISOString().slice(0, 16);
          }
          
          // Para date: YYYY-MM-DD
          return data.toISOString().slice(0, 10);
        }
      } catch (error) {
        console.error('Erro ao formatar data:', error);
        return '';
      }
    }

    // Para números, garantir que seja string válida
    if (type === 'number' && typeof valor === 'number') {
      return valor.toString();
    }

    return String(valor);
  }, [type, transformarValor]);

  /**
   * Renderiza o label com estilo condicional
   */
  const renderizarLabel = () => {
    return (
      <FormLabel 
        className={cn(
          disabled && "text-muted-foreground",
          classNameLabel
        )}
      >
        {label}
        {obrigatorio && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {renderizarLabel()}
          
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              value={formatarValor(field.value)}
              onChange={(e) => {
                let novoValor: any = e.target.value;
                
                if (type === 'number' && novoValor !== '') {
                  novoValor = parseFloat(novoValor);
                  if (isNaN(novoValor))
                    novoValor = '';
                }
                
                field.onChange(novoValor);
                aoMudar?.(novoValor);
              }}
              
              // Atributos HTML de validação
              maxLength={maxLength}
              minLength={minLength}
              max={max}
              min={min}
              step={step}
              pattern={pattern}
              required={obrigatorio}
              aria-invalid={!!form.formState.errors[name]}
              aria-describedby={descricao ? `${name}-description` : undefined}
              className={cn(classNameInput)}
            />
          </FormControl>
          
          {descricao && (
            <FormDescription id={`${name}-description`}>
              {descricao}
            </FormDescription>
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// --- VARIANTES PRÉ-CONFIGURADAS ---

/**
 * Campo de Email pré-configurado
 */
export function FormFieldEmail<TFormValues extends FieldValues>(
  props: Omit<PropsFormFieldBasic<TFormValues>, 'type'>
) {
  return (
    <FormFieldBasic
      {...props}
      type="email"
      placeholder={props.placeholder || "exemplo@email.com"}
    />
  );
}

/**
 * Campo de Senha pré-configurado
 */
export function FormFieldPassword<TFormValues extends FieldValues>(
  props: Omit<PropsFormFieldBasic<TFormValues>, 'type'>
) {
  return (
    <FormFieldBasic
      {...props}
      type="password"
      placeholder={props.placeholder || "••••••••"}
      minLength={props.minLength || 6}
    />
  );
}

/**
 * Campo de Data pré-configurado
 */
export function FormFieldDate<TFormValues extends FieldValues>(
  props: Omit<PropsFormFieldBasic<TFormValues>, 'type'>
) {
  return (
    <FormFieldBasic
      {...props}
      type="date"
    />
  );
}

/**
 * Campo de Número pré-configurado
 */
export function FormFieldNumber<TFormValues extends FieldValues>(
  props: Omit<PropsFormFieldBasic<TFormValues>, 'type'> & {
    casasDecimais?: number;
  }
) {
  const { casasDecimais, ...rest } = props;
  
  return (
    <FormFieldBasic
      {...rest}
      type="number"
      step={casasDecimais ? `0.${'0'.repeat(casasDecimais - 1)}1` : '1'}
    />
  );
}