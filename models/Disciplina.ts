import {auditSchema} from "@/models/AuditSchema";
import mongoose from 'mongoose';

const disciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true, trim: true },
        
    // --- Controle de Sistema --
    ...auditSchema
    },
    { 
        timestamps: true 
    }
);

export const Disciplina = mongoose.models.Disciplinas || mongoose.model("Disciplinas", disciplinaSchema);