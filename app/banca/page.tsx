"use client";

import React, { useState, useMemo } from "react";
import { BancaType } from "@/models/Banca";
import { GenericTablePage } from "@/commons/interface/GenericTablePage/GenericTablePage";
import { useGenericTable } from "@/commons/interface/useGenericTable/useGenericTable";

import {BancaController} from "@/app/banca/BancaController";
import CadastrarEditarBanca from "./dialogs/CadastrarEditarBanca";
import ExcluirBanca from "./dialogs/ExcluirBanca";

export default function BancasPage() {
  const [update, setUpdate] = useState(0);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [bancaSelecionada, setBancaSelecionada] = useState<
    BancaType | undefined
  >();

  const handlers = {
    onAdd: () => {
      setBancaSelecionada(undefined);
      setOpenCadastro(true);
    },
    onEdit: (item: BancaType) => {
      setBancaSelecionada(item);
      setOpenCadastro(true);
    },
    onView: (item: BancaType) => console.log("Visualizar:", item),
    onDelete: (item: BancaType) => {
      setBancaSelecionada(item);
      setOpenExcluir(true);
    },
  };

  const controlador = useMemo(() => new BancaController(handlers), []);
  const tableState = useGenericTable(controlador, update);

  return (
    <div className="w-full">
      <GenericTablePage
        titulo="Gestão de Bancas"
        controlador={controlador}
        state={tableState}
      />

      <CadastrarEditarBanca
        open={openCadastro}
        setOpen={setOpenCadastro}
        banca={bancaSelecionada}
        update={!!update}
        setUpdate={() => setUpdate((prev) => prev + 1)}
        setErroAtivo={tableState.setErroAtivo}
      />

      <ExcluirBanca
        open={openExcluir}
        setOpen={setOpenExcluir}
        banca={bancaSelecionada}
        onSuccess={() => setUpdate((prev) => prev + 1)}
        setErroAtivo={tableState.setErroAtivo}
      />
    </div>
  );
}
