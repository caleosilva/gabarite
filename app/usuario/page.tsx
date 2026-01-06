"use client";

import React, { useState } from "react";
import { GenericTablePage } from "@/commons/GenericTablePage/GenericTablePage";
import { UsuarioController } from "./UsuarioController";
import { UsuarioType } from "@/models/Usuario";
import CadastrarEditarUsuario from "./dialogs/cadastrarEditar/CadastrarEditarUsuario";

export default function UsuariosPage() {
  const [update, setUpdate] = useState(0);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioType | undefined>();

  // Funções de ação disparadas pelo controlador
  const handlers = {
    onAdd: () => {
      setUsuarioSelecionado(undefined);
      setOpenCadastro(true);
    },
    onEdit: (item: UsuarioType) => {
      console.log("Ação Editar acionada para:", item.nome);
      setUsuarioSelecionado(item);
      setOpenCadastro(true); 
    },
    onView: (item: UsuarioType) => {
      console.log("Ação Visualizar acionada para:", item.nome);
      // Aqui você abriria um modal de 'view' no futuro
    },
    onDelete: (items: UsuarioType | UsuarioType[]) => {
      console.log("Ação Excluir acionada para:", items);
      // Aqui você abriria um AlertDialog de confirmação no futuro
    }
  };

  // Instancia o controlador (memoizado para evitar recriações desnecessárias)
  const controlador = React.useMemo(() => new UsuarioController(handlers), [update]);

  return (
    <div className="w-full">
      <GenericTablePage 
        titulo="Gestão de Usuários" 
        controlador={controlador} 
        forcarRecarga={update} 
      />

      {/* Modal de Cadastro/Edição */}
      <CadastrarEditarUsuario 
        open={openCadastro}
        setOpen={setOpenCadastro}
        usuario={usuarioSelecionado}
        update={!!update}
        setUpdate={() => setUpdate(prev => prev + 1)}
      />
    </div>
  );
}