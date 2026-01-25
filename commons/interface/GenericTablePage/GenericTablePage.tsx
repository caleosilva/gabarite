"use client";

import React, { useMemo } from "react";
import { useGenericTable } from "../useGenericTable/useGenericTable";
import { DataTable } from "@/commons/componentes/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, XCircle } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";
import { AbstractTableController } from "@/commons/interface/AbstractTableController/AbstractTableController";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createFromNextReadableStream } from "next/dist/client/components/router-reducer/fetch-server-response";

export function GenericTablePage<T>({
  controlador,
  titulo,
  state,
}: {
  controlador: AbstractTableController<T>;
  titulo: string;
  state: ReturnType<typeof useGenericTable<T>>;
}) {
  const botoesPadrao = useMemo(
    () => controlador.getFinalStandardConfigs(),
    [controlador],
  );

  // Colunas memorizadas com checkbox
  const colunasComSelecao = useMemo<ColumnDef<T>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(val) => row.toggleSelected(!!val)}
            onClick={(e) => e.stopPropagation()}
          />
        ),
        size: 40,
        minSize: 40,
        maxSize: 40,
        enableResizing: false, // Desabilita redimensionamento
      },
      ...controlador.obterColunas(),
    ],
    [controlador],
  );

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{titulo}</h1>

        {/* Barra de Ações (Toolbar) */}
        <div className="flex flex-wrap items-center gap-2 border-b pb-4">
          <Button
            onClick={() => controlador.aoClicarAdicionar()}
            variant={botoesPadrao.add.variant}
          >
            {botoesPadrao.add.icon} {botoesPadrao.add.label}
          </Button>

          <div className="h-6 w-px bg-border mx-2" />

          <Button
            disabled={!state.itemUnicoSelecionado}
            onClick={() =>
              controlador.aoClicarEditar(state.itemUnicoSelecionado!)
            }
            variant="outline"
          >
            Editar
          </Button>

          <Button
            disabled={!state.existeSelecao}
            onClick={() =>
              controlador.aoClicarExcluir(state.itemUnicoSelecionado!)
            }
            variant="destructive"
          >
            Excluir
          </Button>
        </div>

        {/* Barra de Busca */}
        <div className="flex flex-col sm:flex-row items-center gap-2 bg-muted/30 p-4 rounded-lg border">
          <Select
            value={state.campoBuscaSelecionado}
            onValueChange={state.setCampoBuscaSelecionado}
          >
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Campo" />
            </SelectTrigger>
            <SelectContent>
              {controlador.obterCamposPesquisaveis().map((f: any) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-1 items-center gap-2">
            <Input
              placeholder="Digite sua busca..."
              value={state.textoBuscaDigitado}
              onChange={(e) => state.setTextoBuscaDigitado(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && state.aplicarFiltroDeBusca()
              }
              className="bg-background"
            />
            <Button onClick={state.aplicarFiltroDeBusca}>
              <Search className="mr-2 h-4 w-4" /> Buscar
            </Button>
            {state.filtroAtivo && (
              <Button variant="ghost" size="icon" onClick={state.limparBusca}>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <DataTable
        colunas={colunasComSelecao}
        dados={state.dados}
        estaCarregando={state.estaCarregando}
        totalDePaginas={Math.ceil(
          state.totalRegistros / state.paginacao.pageSize,
        )}
        paginacao={state.paginacao}
        aoMudarPaginacao={state.setPaginacao}
        selecaoLinhas={state.selecaoLinhas}
        aoMudarSelecaoLinhas={state.setSelecaoLinhas}
        getRowId={(item) => controlador.getRowId(item)}
        permitirSelecao
        permitirSelecaoMultipla={false}
      />

      <AlertDialog
        open={!!state.erroAtivo}
        onOpenChange={() => state.setErroAtivo(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className=" flex items-center gap-2">
              <AlertCircle /> {state.erroAtivo?.titulo}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {state.erroAtivo?.msg}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => state.setErroAtivo(null)}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
