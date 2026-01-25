import mongoose from "mongoose";

const bancaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    excluido: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

export const Banca =
  mongoose.models.Bancas || mongoose.model("Bancas", bancaSchema);

type BancaCampos = mongoose.InferSchemaType<typeof bancaSchema>;

export type BancaType = BancaCampos & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
