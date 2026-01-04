import {auditSchema} from "@/models/AuditSchema";
import mongoose from 'mongoose';

const orgaoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true, trim: true },
        
    // --- Controle de Sistema --
    ...auditSchema
},
    { 
        timestamps: true 
    }
);

export const Orgao = mongoose.models.Orgaos || mongoose.model("Orgaos", orgaoSchema);