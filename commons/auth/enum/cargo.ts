import { SelectOption } from "@/commons/componentes/FormFieldSelect/FormFieldSelect";

export const Cargo = {
  ESTUDANTE:      { label: 'Estudante',  value: 'estudante',     variant: 'secondary' },
  ADMINISTRADOR:  { label: 'Admin',      value: 'administrador', variant: 'default' },
} as const;

export type CargoType = (typeof Cargo)[keyof typeof Cargo];

export const getCargoByValue = (value: string): CargoType | undefined => {
  return obterTodosCargos().find((c) => c.value === value);
};

// =============== Funções Utilitárias ===============
export const obterTodosCargos = (): CargoType[] => {
  return Object.values(Cargo);
};

export const getOpcoesCargo = (): SelectOption[] => {
  return obterTodosCargos().map((item) => ({
    label: item.label,
    value: item.value,
  }));
};
