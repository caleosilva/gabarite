"use client";

import * as React from "react";
import { Label } from "@/components/ui/label"; // Importe o Label puro
import { cn } from "@/lib/utils";

// --- TIPAGEM ---
type TipoInput =
  | "text"
  | "email"
  | "number"
  | "date"
  | "time"
  | "datetime-local";

interface PropsFormFieldDisplay {
  label: string;
  valor?: any;
  type?: TipoInput;
  descricao?: string;
  obrigatorio?: boolean;
  className?: string;
  classNameLabel?: string;
  classNameValor?: string;
  transformarValor?: (valor: any) => string;
  placeholder?: string;
}

// --- COMPONENTE ---
export function FormFieldDisplay({
  label,
  valor,
  type = "text",
  descricao,
  obrigatorio = false,
  className,
  classNameLabel,
  classNameValor,
  transformarValor,
  placeholder = "—",
}: PropsFormFieldDisplay) {
  const formatarValor = React.useMemo((): string => {
    if (valor === undefined || valor === null || valor === "") {
      return placeholder;
    }

    if (transformarValor) {
      return transformarValor(valor);
    }

    if (type === "date" || type === "datetime-local") {
      try {
        const data = new Date(valor);
        if (isNaN(data.getTime())) return placeholder;

        if (type === "datetime-local") {
          return data.toLocaleString("pt-BR");
        }

        return data.toLocaleDateString("pt-BR");
      } catch {
        return placeholder;
      }
    }

    return String(valor);
  }, [valor, type, transformarValor, placeholder]);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Usando Label puro do Radix/Shadcn em vez do FormLabel */}
      <Label
        className={cn(
          "text-sm font-medium leading-none text-muted-foreground",
          classNameLabel
        )}
      >
        {label}
        {obrigatorio && (
          <span className="text-destructive ml-1">*</span>
        )}
      </Label>

      <div
        className={cn(
          "min-h-[40px] w-full rounded-md border bg-muted/40 px-3 py-2 text-sm ring-offset-background",
          classNameValor
        )}
      >
        {formatarValor}
      </div>

      {/* Usando um parágrafo estilizado em vez do FormDescription */}
      {descricao && (
        <p className="text-[0.8rem] text-muted-foreground">
          {descricao}
        </p>
      )}
    </div>
  );
}