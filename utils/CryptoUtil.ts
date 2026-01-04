const bcrypt = require('bcryptjs');
const CryptoJS = require("crypto-js");

export class CryptoUtils {
  private static readonly AES_KEY = "123456";
  private static readonly SALT_ROUNDS = 10;

  /**
   * Gera um hash seguro para senhas utilizando Bcrypt.
   * @param password A senha em texto plano.
   * @returns Uma Promise com o hash da senha ou string vazia em caso de erro.
   */
  public static async hashPassword(password: string): Promise<string> {
    try {
      if (!password) return "";
      return await bcrypt.hash(password, this.SALT_ROUNDS);
    } catch (error) {
      console.error("Erro ao gerar hash da senha:", error);
      return "";
    }
  }

  /**
   * Compara uma senha em texto plano com um hash Bcrypt.
   * @param password A senha fornecida pelo usuário.
   * @param hash O hash armazenado no banco.
   * @returns Promise com boolean indicando se coincidem.
   */
  public static async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      if (!password || !hash) return false;
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error("Erro ao comparar senhas:", error);
      return false;
    }
  }

  /**
   * Criptografa um texto utilizando o algoritmo AES.
   * @param text Texto a ser criptografado.
   * @returns Texto criptografado em formato string.
   */
  public static encryptWithAES(text: string | null | undefined): string {
    if (!text) return "";
    try {
      return CryptoJS.AES.encrypt(text, this.AES_KEY).toString();
    } catch (error) {
      console.error("Erro na criptografia AES:", error);
      return "";
    }
  }

  /**
   * Descriptografa um texto criptografado via AES.
   * @param ciphertext O texto criptografado.
   * @returns O texto original descriptografado.
   */
  public static decryptWithAES(ciphertext: string | null | undefined): string {
    if (!ciphertext) return "";
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.AES_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Erro na descriptografia AES:", error);
      return "";
    }
  }
}