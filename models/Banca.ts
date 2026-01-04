import {auditSchema} from "@/models/AuditSchema";
import mongoose from 'mongoose';

const bancaSchema = new mongoose.Schema({
        nome: { type: String, required: true, unique: true, trim: true },
        
        // --- Controle de Sistema --
        ...auditSchema
    },
    { 
        timestamps: true 
    }
);

export const Banca = mongoose.models.Bancas || mongoose.model("Bancas", bancaSchema);