"use client";

import * as React from "react";
import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormFieldDisplay } from "@/commons/componentes/FormFieldDisplay/FormFieldDisplay";
import { UsuarioType } from "@/models/Usuario";
import { AlertTriangle } from "lucide-react";

interface ExcluirUsuarioProps {
  usuario: UsuarioType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  setErroAtivo?: (erro: { titulo: string; msg: string } | null) => void;
}

export default function ExcluirUsuario({
  usuario,
  open,
  setOpen,
  onSuccess,
  setErroAtivo,
}: ExcluirUsuarioProps) {
  if (!usuario) return null;
  

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleExcluir = async () => {
    try {
      setIsSubmitting(true);

      const response = await fetch(`/api/usuario?id=${usuario._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = {
          titulo: data.titulo || "Erro ao Excluir",
          msg: data.msg || "Não foi possível excluir o usuário.",
        };
        setErroAtivo ? setErroAtivo(errorData) : alert(errorData.msg);
        return;
      }

      setOpen(false);
      onSuccess();
    } catch (error) {
      const connError = {
        titulo: "Erro de Conexão",
        msg: "Falha ao comunicar com o servidor.",
      };
      setErroAtivo ? setErroAtivo(connError) : alert(connError.msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogDefault
      title="Excluir Usuário"
      open={open}
      onOpenChange={setOpen}
      variant="danger"
      isSubmitting={isSubmitting}
      submitLabel="Excluir"
      onSubmit={handleExcluir}
    >
      <div className="space-y-6">
        {/* Alerta de Atenção */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Cuidado</p>
            <p>Você tem certeza que deseja remover este usuário do sistema?</p>
          </div>
        </div>

        {/* Exibição dos dados usando seu FormFieldDisplay */}
        <div className="grid grid-cols-1 gap-4">
          <FormFieldDisplay label="Nome do Usuário" valor={usuario.nome} />

          <FormFieldDisplay label="E-mail" valor={usuario.email} />
        </div>
      </div>
    </DialogDefault>
  );
}
