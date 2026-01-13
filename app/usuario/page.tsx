"use client";

import React, { useState, useMemo } from "react";
import { GenericTablePage } from "@/commons/interface/GenericTablePage/GenericTablePage";
import { useGenericTable } from "@/commons/interface/useGenericTable/useGenericTable";
import { UsuarioController } from "./UsuarioController";
import { UsuarioType } from "@/models/Usuario";
import CadastrarEditarUsuario from "./dialogs/CadastrarEditarUsuario";

export default function UsuariosPage() {
  const [update, setUpdate] = useState(0);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioType | undefined>();

  const handlers = {
    onAdd: () => {
      setUsuarioSelecionado(undefined);
      setOpenCadastro(true);
    },
    onEdit: (item: UsuarioType) => {
      setUsuarioSelecionado(item);
      setOpenCadastro(true); 
    },
    onView: (item: UsuarioType) => console.log("Visualizar:", item),
    onDelete: (item: UsuarioType) => console.log("Excluir:", item)
  };

  const controlador = useMemo(() => new UsuarioController(handlers), []);
  const tableState = useGenericTable(controlador, update);

  return (
    <div className="w-full">
      {/* Passamos o state explicitamente para a GenericTablePage */}
      <GenericTablePage 
        titulo="Gestão de Usuários" 
        controlador={controlador} 
        state={tableState} 
      />

      {/* Agora o Modal tem acesso ao setErroAtivo do estado global da página */}
      <CadastrarEditarUsuario 
        open={openCadastro}
        setOpen={setOpenCadastro}
        usuario={usuarioSelecionado}
        update={!!update}
        setUpdate={() => setUpdate(prev => prev + 1)}
        setErroAtivo={tableState.setErroAtivo} 
      />
    </div>
  );
}