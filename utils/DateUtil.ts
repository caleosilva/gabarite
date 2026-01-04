export class DateUtils {
  /**
   * Formata uma data para o padrão DD/MM/YYYY.
   * Corrige o fuso horário para exibir a data correta independentemente do local do usuário.
   * @param date A data a ser formatada (string, número de timestamp ou objeto Date).
   * @returns A data formatada como string ou uma string vazia se a data for nula.
   */
  public static formatDate(date: string | number | Date | null | undefined): string {
    if (!date) {
      return "";
    }

    try {
      const dataObj = new Date(date);
      // Corrige a data para UTC, evitando problemas de fuso horário
      dataObj.setMinutes(dataObj.getMinutes() + dataObj.getTimezoneOffset());

      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
      const ano = dataObj.getFullYear();

      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return ""; // Retorna vazio em caso de data inválida
    }
  }

  /**
   * Formata uma data e hora para o padrão DD/MM/YYYY, HH:mm.
   * Corrige o fuso horário para exibir a data e hora corretas.
   * @param date A data a ser formatada.
   * @returns A data e hora formatadas ou uma string vazia.
   */
  public static formatDateTime(date: string | number | Date | null | undefined): string {
    if (!date) {
      return "";
    }
    
    try {
      const dataObj = new Date(date);
      // Corrige a data para UTC
      dataObj.setMinutes(dataObj.getMinutes() + dataObj.getTimezoneOffset());

      const dia = String(dataObj.getDate()).padStart(2, '0');
      const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
      const ano = dataObj.getFullYear();
      const horas = String(dataObj.getHours()).padStart(2, '0');
      const minutos = String(dataObj.getMinutes()).padStart(2, '0');

      return `${dia}/${mes}/${ano}, ${horas}:${minutos}`;
    } catch (error) {
      console.error("Erro ao formatar data e hora:", error);
      return "";
    }
  }

  /**
   * Verifica se uma data é anterior ao dia de hoje (sem considerar o horário).
   * @param date A data para comparação.
   * @returns `true` se a data for anterior a hoje, caso contrário `false`.
   */
  public static isDateBeforeToday(date: string | number | Date): boolean {
    try {
      const currentDate = new Date();
      const inputDate = new Date(date);

      // Zera o horário de ambas as datas para comparar apenas os dias
      currentDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      return inputDate < currentDate;
    } catch (error) {
      console.error("Erro ao comparar datas:", error);
      return false;
    }
  }
}