"use client";

import React, { useState, useMemo } from "react";
import { GenericTablePage } from "@/commons/interface/GenericTablePage/GenericTablePage";
import { useGenericTable } from "@/commons/interface/useGenericTable/useGenericTable";
import { UsuarioController } from "./UsuarioController";
import { UsuarioType } from "@/models/Usuario";
import CadastrarEditarUsuario from "./dialogs/CadastrarEditarUsuario";
import ExcluirUsuario from "./dialogs/ExcluirUsuario";

export default function UsuariosPage() {
  const [update, setUpdate] = useState(0);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<
    UsuarioType | undefined
  >();

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
    onDelete: (item: UsuarioType) => {
      setUsuarioSelecionado(item);
      setOpenExcluir(true);
    },
  };

  const controlador = useMemo(() => new UsuarioController(handlers), []);
  const tableState = useGenericTable(controlador, update);

  return (
    <div className="w-full">
      <GenericTablePage
        titulo="Gestão de Usuários"
        controlador={controlador}
        state={tableState}
      />

      <CadastrarEditarUsuario
        open={openCadastro}
        setOpen={setOpenCadastro}
        usuario={usuarioSelecionado}
        update={!!update}
        setUpdate={() => setUpdate((prev) => prev + 1)}
        setErroAtivo={tableState.setErroAtivo}
      />

      <ExcluirUsuario
        open={openExcluir}
        setOpen={setOpenExcluir}
        usuario={usuarioSelecionado}
        onSuccess={() => setUpdate((prev) => prev + 1)}
        setErroAtivo={tableState.setErroAtivo}
      />
    </div>
  );
}
