export class StringUtil {
  /**
   * Transforma a primeira letra de uma string em maiúscula.
   * @param text O texto a ser formatado.
   * @returns O texto com a primeira letra em maiúscula ou string vazia.
   */
  public static capitalizeFirstLetter(text: string | null | undefined): string {
    if (!text) return "";
    try {
      return text.charAt(0).toUpperCase() + text.slice(1);
    } catch (error) {
      console.error("Erro ao capitalizar primeira letra:", error);
      return text || "";
    }
  }

  /**
   * Transforma a primeira letra de cada palavra em maiúscula.
   * @param sentence A frase ou nome a ser formatado.
   * @returns A frase com cada palavra capitalizada.
   */
  public static capitalizeEachWord(sentence: string | null | undefined): string {
    if (!sentence) return "";
    try {
      return sentence
        .split(/\s+/)
        .map(word => this.capitalizeFirstLetter(word))
        .join(" ");
    } catch (error) {
      console.error("Erro ao capitalizar palavras:", error);
      return sentence || "";
    }
  }

  /**
   * Formata um nome para exibição em perfil. 
   * Se houver mais de 3 nomes, abrevia os nomes do meio.
   * Ex: "João Silva Sauro Oliveira" -> "João S. S. Oliveira"
   * @param name O nome completo.
   * @returns O nome formatado ou capitalizado.
   */
  public static capitalizeNameToProfile(name: string | null | undefined): string {
    if (!name) return "";
    try {
      const words = name.trim().split(/\s+/);
      if (words.length > 3) {
        let capitalizedString = this.capitalizeFirstLetter(words[0]) + " ";
        
        for (let i = 1; i < words.length - 1; i++) {
          capitalizedString += words[i].charAt(0).toUpperCase() + ". ";
        }
        
        capitalizedString += this.capitalizeFirstLetter(words[words.length - 1]);
        return capitalizedString;
      }
      return this.capitalizeEachWord(name);
    } catch (error) {
      console.error("Erro ao formatar nome para perfil:", error);
      return name || "";
    }
  }

  /**
   * Obtém as iniciais de um nome.
   * Se houver dois ou mais nomes, retorna as duas primeiras iniciais.
   * Se houver apenas um, retorna as duas primeiras letras do nome.
   * @param fullName O nome completo.
   * @returns As iniciais em maiúsculo (padrão "EU" para falhas).
   */
  public static getInitials(fullName: string | null | undefined): string {
    if (!fullName || typeof fullName !== 'string') return "EU";
    
    try {
      const names = fullName.trim().split(/\s+/);

      if (names.length >= 2) {
        return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
      } else if (names.length === 1 && names[0] !== "") {
        return names[0].slice(0, 2).toUpperCase();
      }
      return "EU";
    } catch (error) {
      console.error("Erro ao obter iniciais:", error);
      return "EU";
    }
  }

  /**
   * Abrevia os nomes do meio de um nome completo.
   * Ex: "Carlos Alberto Nobrega" -> "Carlos A. Nobrega"
   * @param fullName O nome completo.
   * @returns O nome com os termos do meio abreviados.
   */
  public static abbreviateFullName(fullName: string | null | undefined): string {
    if (!fullName) return "";
    
    try {
      const parts = fullName.trim().split(/\s+/);
      if (parts.length <= 1) return fullName;

      const firstName = parts[0];
      const lastName = parts[parts.length - 1];
      const middleNames = parts.slice(1, -1);

      const initials = middleNames.map(name => name.charAt(0).toUpperCase() + ".");

      return [firstName, ...initials, lastName].join(" ");
    } catch (error) {
      console.error("Erro ao abreviar nome completo:", error);
      return fullName || "";
    }
  }
}