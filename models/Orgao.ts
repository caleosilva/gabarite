import { auditSchema } from "@/models/AuditSchema";
import mongoose from "mongoose";

const orgaoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, unique: true, trim: true },
    excluido: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
);

export const Orgao =
  mongoose.models.Orgaos || mongoose.model("Orgaos", orgaoSchema);

type OrgaoCampos = mongoose.InferSchemaType<typeof orgaoSchema>;

export type OrgaoType = OrgaoCampos & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
