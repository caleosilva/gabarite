import mongoose from "mongoose";
import { Cargo } from "@/commons/auth/config/cargo";

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
      select: false, // Evita que a senha seja retornada em consultas comuns por segurança
    },
    cargo: {
      type: String,
      enum: Object.values(Cargo).map(c => c.value),
      default: Cargo.ESTUDANTE.value,
      required: true,
    },
    excluido: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true, // Cria automaticamente createdAt e updatedAt
  }
);

// Criando o modelo de usuário
const Usuario =
  mongoose.models.Usuarios ||
  mongoose.model("Usuarios", usuarioSchema, "usuarios");

export default Usuario;

// 1. Extrai os campos definidos
type UsuarioCampos = mongoose.InferSchemaType<typeof usuarioSchema>;

// 2. Cria o tipo final incluindo o _id e os timestamps
export type UsuarioType = UsuarioCampos & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
