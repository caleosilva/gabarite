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
import { Search, XCircle, AlertCircle } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { AbstractTableController } from "@/commons/interface/AbstractTableController/AbstractTableController";
import { ConfiguracaoBotao } from "@/commons/interface/AbstractTableController/ConstrutorBotao/ConstrutorBotao";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Helper para renderizar (Ícone + Texto) ou (Só Ícone) ou (Só Texto)
const RenderButtonContent = ({ config }: { config: ConfiguracaoBotao }) => (
  <>
    {config.icon}
    {config.icon && config.label && (
      <span className="ml-2">{config.label}</span>
    )}
    {!config.icon && config.label}
  </>
);

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

  const acoesExtras = useMemo(
    () => controlador.obterAcoesPersonalizadas(state.itemUnicoSelecionado),
    [controlador, state.itemUnicoSelecionado],
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
        enableResizing: false,
      },
      ...controlador.obterColunas(),
    ],
    [controlador],
  );

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{titulo}</h1>

        {/* --- BARRA DE AÇÕES (TOOLBAR) --- */}
        <div className="flex flex-wrap items-center gap-2 border-b pb-4">
          {/* 1. Botão Adicionar */}
          {botoesPadrao.add.visible && (
            <Button
              onClick={() => controlador.aoClicarAdicionar()}
              variant={botoesPadrao.add.variant || "default"}
              disabled={botoesPadrao.add.disabled}
              title={botoesPadrao.add.tooltip}
            >
              <RenderButtonContent config={botoesPadrao.add} />
            </Button>
          )}

          {/* Separador: Aparece se tiver Adicionar E (Editar OU Visualizar OU Excluir) */}
          {botoesPadrao.add.visible &&
            (botoesPadrao.edit.visible ||
              botoesPadrao.view.visible ||
              botoesPadrao.delete.visible) && (
              <div className="h-6 w-px bg-border mx-2" />
            )}

          {/* 3. Botão Visualizar */}
          {botoesPadrao.view.visible && (
            <Button
              disabled={
                !state.itemUnicoSelecionado || botoesPadrao.view.disabled
              }
              onClick={() =>
                controlador.aoClicarVisualizar(state.itemUnicoSelecionado!)
              }
              variant={botoesPadrao.view.variant || "secondary"}
              title={botoesPadrao.view.tooltip}
            >
              <RenderButtonContent config={botoesPadrao.view} />
            </Button>
          )}

          {/* 2. Botão Editar */}
          {botoesPadrao.edit.visible && (
            <Button
              disabled={
                !state.itemUnicoSelecionado || botoesPadrao.edit.disabled
              }
              onClick={() =>
                controlador.aoClicarEditar(state.itemUnicoSelecionado!)
              }
              variant={botoesPadrao.edit.variant || "outline"}
              title={botoesPadrao.edit.tooltip}
            >
              <RenderButtonContent config={botoesPadrao.edit} />
            </Button>
          )}

          {/* 4. Botão Excluir */}
          {botoesPadrao.delete.visible && (
            <Button
              disabled={!state.existeSelecao || botoesPadrao.delete.disabled}
              onClick={() =>
                controlador.aoClicarExcluir(state.itemUnicoSelecionado!)
              }
              variant={botoesPadrao.delete.variant || "destructive"}
              title={botoesPadrao.delete.tooltip}
            >
              <RenderButtonContent config={botoesPadrao.delete} />
            </Button>
          )}
        </div>

        {/* Separador: Só mostra se houver botões padrão E botões extras */}
        {(botoesPadrao.add.visible ||
          botoesPadrao.edit.visible ||
          botoesPadrao.delete.visible) &&
          acoesExtras.length > 0 && <div className="h-6 w-px bg-border mx-2" />}

        {/* Renderiza as Ações Personalizadas */}
        {acoesExtras.map((acao, index) => (
          <Button
            key={`${acao.label}-${index}`}
            onClick={acao.onClick}
            variant={acao.variant || "secondary"} // Default para secondary se não informado
            disabled={acao.disabled}
            title={acao.tooltip}
          >
            {acao.icon && (
              <span className={acao.label ? "mr-2" : ""}>{acao.icon}</span>
            )}
            {acao.label}
          </Button>
        ))}

        {/* -------------------------------- */}

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
