import { ReactNode } from "react";

export interface ConfiguracaoBotao {
  label?: string | null;     // Se null, mostra apenas ícone
  icon?: ReactNode | null;   // Se null, mostra apenas texto
  visible: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
  tooltip?: string;
}

export class ConstrutorBotao {
  private config: ConfiguracaoBotao;

  constructor(
    rotuloPadrao: string, 
    iconePadrao: ReactNode | null, 
    variantePadrao: ConfiguracaoBotao['variant'] = "secondary"
  ) {
    this.config = {
      label: rotuloPadrao,
      icon: iconePadrao,
      visible: true,
      variant: variantePadrao,
      disabled: false,
      tooltip: rotuloPadrao 
    };
  }

  definirRotulo(rotulo: string): this {
    this.config.label = rotulo;
    this.config.tooltip = rotulo; 
    return this;
  }

  removerRotulo(): this {
    this.config.label = null; 
    return this;
  }

  definirIcone(icone: ReactNode): this {
    this.config.icon = icone;
    return this;
  }

  removerIcone(): this {
    this.config.icon = null;
    return this;
  }

  definirVariante(variante: ConfiguracaoBotao['variant']): this {
    this.config.variant = variante;
    return this;
  }

  definirTooltip(texto: string): this {
    this.config.tooltip = texto;
    return this;
  }

  ocultar(): this {
    this.config.visible = false;
    return this;
  }
  
  exibir(): this {
    this.config.visible = true;
    return this;
  }

  desabilitar(estaDesabilitado = true): this {
    this.config.disabled = estaDesabilitado;
    return this;
  }

  obterConfiguracao(): ConfiguracaoBotao {
    return this.config;
  }
}