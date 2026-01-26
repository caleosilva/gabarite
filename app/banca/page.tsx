"use client";

import React, { useState, useMemo } from "react";
import { BancaType } from "@/models/Banca";
import { GenericTablePage } from "@/commons/componentes/GenericTablePage/GenericTablePage";
import { useGenericTable } from "@/commons/componentes/hooks/useGenericTable/useGenericTable";

import {BancaTableController} from "@/app/banca/BancaTableController";
import CadastrarEditarBanca from "./cadastrar-editar/CadastrarEditarBanca";
import ExcluirBanca from "./excluir/ExcluirBanca";

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

  const controlador = useMemo(() => new BancaTableController(handlers), []);
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
      />

      <ExcluirBanca
        open={openExcluir}
        setOpen={setOpenExcluir}
        banca={bancaSelecionada}
        onSuccess={() => setUpdate((prev) => prev + 1)}
      />
    </div>
  );
}
