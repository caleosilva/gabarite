export class PasswordUtil {
  /**
   * Gera uma senha aleatória contendo letras (maiúsculas e minúsculas) e números.
   * @param length O comprimento da senha a ser gerada (padrão é 6).
   * @returns Uma string contendo a senha gerada ou string vazia em caso de erro.
   */
  public static generatePassword(length: number = 6): string {
    try {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
      }

      return password;
    } catch (error) {
      console.error("Erro ao gerar senha:", error);
      return "";
    }
  }

  /**
   * Verifica a força de uma senha simples.
   * @param password A senha a ser validada.
   * @returns Verdadeiro se a senha tiver pelo menos 6 caracteres.
   */
  public static isPasswordValid(password: string | null | undefined): boolean {
    if (!password) return false;
    return password.length >= 6;
  }
}