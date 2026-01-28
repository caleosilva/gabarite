"use client";

import React, { useState, useMemo } from "react";
import { OrgaoType } from "@/models/Orgao";
import { GenericTablePage } from "@/commons/componentes/GenericTablePage/GenericTablePage";
import { useGenericTable } from "@/commons/componentes/hooks/useGenericTable/useGenericTable";

import { OrgaoTableController } from "@/app/orgao/OrgaoTableController";
import ExcluirOrgao from "@/app/orgao/excluir/ExcluirOrgao";
import CadastrarEditarOrgao from "@/app/orgao/cadastrar-editar/CadastrarEditarOrgao";

import {useAuthClient} from "@/commons/auth/hooks/useAuthClient"
import { Recurso } from "@/commons/auth/config/recurso";


export default function OrgaosPage() {
  const { cargo } = useAuthClient();

  const [update, setUpdate] = useState(0);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openExcluir, setOpenExcluir] = useState(false);
  const [orgaoSelecionado, setOrgaoSelecionado] = useState<
    OrgaoType | undefined
  >();

  const handlers = {
    onAdd: () => {
      setOrgaoSelecionado(undefined);
      setOpenCadastro(true);
    },
    onEdit: (item: OrgaoType) => {
      setOrgaoSelecionado(item);
      setOpenCadastro(true);
    },
    onView: (item: OrgaoType) => console.log("Visualizar:", item),
    onDelete: (item: OrgaoType) => {
      setOrgaoSelecionado(item);
      setOpenExcluir(true);
    },
  };

  const controlador = useMemo(() => new OrgaoTableController(cargo, Recurso.ORGAO.value, handlers), []);
  const tableState = useGenericTable(controlador, update);

  return (
    <div className="w-full">
      <GenericTablePage
        titulo="Gestão de Órgãos"
        controlador={controlador}
        state={tableState}
      />

      <CadastrarEditarOrgao
        open={openCadastro}
        setOpen={setOpenCadastro}
        orgao={orgaoSelecionado}
        update={!!update}
        setUpdate={() => setUpdate((prev) => prev + 1)}
      />

      <ExcluirOrgao
        open={openExcluir}
        setOpen={setOpenExcluir}
        orgao={orgaoSelecionado}
        onSuccess={() => setUpdate((prev) => prev + 1)}
      />
    </div>
  );
}
