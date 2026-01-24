import { useState, useEffect, useCallback, useMemo } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import {
  AbstractTableController,
  FiltroBusca,
} from "@/commons/interface/AbstractTableController/AbstractTableController";

export function useGenericTable<T>(
  controlador: AbstractTableController<T>,
  forcarRecarga?: boolean | number
) {
  const [dados, setDados] = useState<T[]>([]);
  const [estaCarregando, setEstaCarregando] = useState(true);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [paginacao, setPaginacao] = useState({ pageIndex: 0, pageSize: 12 });
  const [selecaoLinhas, setSelecaoLinhas] = useState<RowSelectionState>({});
  const [textoBuscaDigitado, setTextoBuscaDigitado] = useState("");
  const [campoBuscaSelecionado, setCampoBuscaSelecionado] = useState<string>(
    controlador.obterCamposPesquisaveis()[0]?.value || ""
  );
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroBusca | undefined>(
    undefined
  );
  const [erroAtivo, setErroAtivo] = useState<{
    titulo: string;
    msg: string;
  } | null>(null);

  const buscarDados = useCallback(async () => {
    setEstaCarregando(true);
    try {
      const resultado = await controlador.fetchData(
        paginacao.pageIndex,
        paginacao.pageSize,
        filtroAtivo
      );
      setDados(resultado.data);
      setTotalRegistros(resultado.total);
    } catch (erro: any) {
      console.log("erro", erro)
      setErroAtivo({
        titulo: "Erro de Carregamento",
        msg: erro.message || "Não foi possível sincronizar os dados.",
      });
      console.error("Erro ao buscar dados:", erro);
    } finally {
      setEstaCarregando(false);
    }
  }, [controlador, paginacao.pageIndex, paginacao.pageSize, filtroAtivo]);

  useEffect(() => {
    buscarDados();
  }, [buscarDados, forcarRecarga]);

  const aplicarFiltroDeBusca = () => {
    setPaginacao((prev) => ({ ...prev, pageIndex: 0 }));
    setSelecaoLinhas({});
    if (textoBuscaDigitado.trim()) {
      setFiltroAtivo({
        field: campoBuscaSelecionado,
        value: textoBuscaDigitado,
      });
    } else {
      setFiltroAtivo(undefined);
    }
  };

  const limparBusca = () => {
    setTextoBuscaDigitado("");
    setFiltroAtivo(undefined);
    setPaginacao((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const itensSelecionados = useMemo(() => {
    const idsSelecionados = Object.keys(selecaoLinhas).filter(
      (id) => selecaoLinhas[id]
    );

    return dados.filter((item) =>
      idsSelecionados.includes(controlador.getRowId(item))
    );
  }, [selecaoLinhas, dados, controlador]);

  useEffect(() => {
    setSelecaoLinhas({});
  }, [paginacao.pageIndex]);

  useEffect(() => {
  }, [selecaoLinhas, itensSelecionados]);

  return {
    dados,
    estaCarregando,
    totalRegistros,
    paginacao,
    setPaginacao,
    selecaoLinhas,
    setSelecaoLinhas,
    textoBuscaDigitado,
    setTextoBuscaDigitado,
    campoBuscaSelecionado,
    setCampoBuscaSelecionado,
    filtroAtivo,
    aplicarFiltroDeBusca,
    limparBusca,
    itensSelecionados,
    itemUnicoSelecionado: (itensSelecionados.length === 1
      ? itensSelecionados[0]
      : null) as T | null,
    existeSelecao: itensSelecionados.length > 0,
    erroAtivo,
    setErroAtivo,
  };
}
