import {auditSchema} from "@/models/AuditSchema";
import mongoose from 'mongoose';


const concursoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    ano: { type: Number, required: true },
    
    bancaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bancas', required: true },
    orgaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Orgaos', required: true },
    
    // --- Controle de Sistema --
    ...auditSchema
    },
    { 
        timestamps: true 
    }
);

const Concurso = mongoose.models.Concursos || mongoose.model("Concursos", concursoSchema);