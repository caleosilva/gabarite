import { auditSchema } from "@/models/AuditSchema";
import mongoose from "mongoose";

const bancaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, unique: true, trim: true },

    // --- Controle de Sistema --
    excluido: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

export const Banca =
  mongoose.models.Bancas || mongoose.model("Bancas", bancaSchema);

type BancaCampos = mongoose.InferSchemaType<typeof bancaSchema>;

// 2. Cria o tipo final incluindo o _id e os timestamps
export type BancaType = BancaCampos & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
