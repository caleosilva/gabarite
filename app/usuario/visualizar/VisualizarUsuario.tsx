"use client";

import { useEffect, useState } from "react";
import DialogDefault from "@/commons/componentes/DialogDefault/DialogDefault";
import { FormFieldDisplay } from "@/commons/componentes/FormFieldDisplay/FormFieldDisplay";
import { UsuarioType } from "@/models/Usuario";
import { DateUtil } from "@/utils/DateUtil";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";

interface VisualizarUsuarioProps {
  usuario: UsuarioType | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function VisualizarUsuario({
  usuario,
  open,
  setOpen,
}: VisualizarUsuarioProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [usuarioCompleto, setUsuarioCompleto] = useState<
    UsuarioType | undefined
  >(usuario);

  // Efeito para buscar dados atualizados ao abrir o modal
  useEffect(() => {
    const buscarDadosUsuario = async () => {
      if (!open || !usuario?._id) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/usuario?id=${usuario._id}`);
        const data = await response.json();

        if (!response.ok) {
          toast.error(data.titulo || "Erro ao Buscar", {
            description: data.msg || "Não foi possível buscar o usuário.",
          });
          return;
        }

        if (data) {
          setUsuarioCompleto(data);
        }
      } catch (error) {
        toast.error("Erro de Conexão", {
          description: "Falha ao comunicar com o servidor.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    buscarDadosUsuario();
  }, [open, usuario?._id, usuario]);

  return (
    <DialogDefault
      title={
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span>Detalhes do Usuário</span>
        </div>
      }
      open={open}
      onOpenChange={setOpen}
      variant="view"
    >
      {isLoading ? (
        <div className="flex h-40 w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldDisplay label="Nome" valor={usuarioCompleto?.nome} />
            
            <FormFieldDisplay label="E-mail" valor={usuarioCompleto?.email} />

            <FormFieldDisplay label="Cargo" valor={usuarioCompleto?.cargo} />

            <FormFieldDisplay
              label="Data de Cadastro"
              valor={DateUtil.formatDateTime(usuarioCompleto?.createdAt)}
            />
          </div>
      )}
    </DialogDefault>
  );
}
