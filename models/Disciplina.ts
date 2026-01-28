import mongoose from "mongoose";

const disciplinaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

export const Disciplina =
  mongoose.models.Disciplinas ||
  mongoose.model("Disciplinas", disciplinaSchema);

  type DisciplinaCampos = mongoose.InferSchemaType<typeof disciplinaSchema>;
  
  export type DisciplinaType = DisciplinaCampos & {
    _id: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
  };
  