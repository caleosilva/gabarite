"use client";

import React, { useState, useMemo } from "react";
import { DisciplinaType } from "@/models/Disciplina";
import { GenericTablePage } from "@/commons/componentes/GenericTablePage/GenericTablePage";
import { useGenericTable } from "@/commons/componentes/hooks/useGenericTable/useGenericTable";

import { DisciplinaTableController } from "@/app/disciplina/DisciplinaTableController";
import ExcluirDisciplina from "@/app/disciplina/excluir/ExcluirDisciplina";
import CadastrarEditarDisciplina from "@/app/disciplina/cadastrar-editar/CadastrarEditarDisciplina";

import { useAuthClient } from "@/commons/auth/hooks/useAuthClient";
import { Recurso } from "@/commons/auth/config/recurso";

export default function DisciplinasPage() {
  const { cargo } = useAuthClient();

  const [update, setUpdate] = useState(0);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<
    DisciplinaType | undefined
  >();

  const handlers = {
    onAdd: () => {
      setDisciplinaSelecionada(undefined);
      setOpenCadastro(true);
    },
    onEdit: (item: DisciplinaType) => {
      setDisciplinaSelecionada(item);
      setOpenCadastro(true);
    },
    onView: (item: DisciplinaType) => console.log("Visualizar:", item),
    onDelete: (item: DisciplinaType) => {
      setDisciplinaSelecionada(item);
      setOpenExcluir(true);
    },
  };

  const controlador = useMemo(
    () => new DisciplinaTableController(cargo, Recurso.DISCIPLINA.value, handlers),
    [cargo]
  );
  const tableState = useGenericTable(controlador, update);

  return (
    <div className="w-full">
      <GenericTablePage
        titulo="Gestão de Disciplinas"
        controlador={controlador}
        state={tableState}
      />

      <CadastrarEditarDisciplina
        open={openCadastro}
        setOpen={setOpenCadastro}
        disciplina={disciplinaSelecionada}
        update={!!update}
        setUpdate={() => setUpdate((prev) => prev + 1)}
      />

      <ExcluirDisciplina
        open={openExcluir}
        setOpen={setOpenExcluir}
        disciplina={disciplinaSelecionada}
        onSuccess={() => setUpdate((prev) => prev + 1)}
      />
    </div>
  );
}
