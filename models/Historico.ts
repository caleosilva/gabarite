import {auditSchema} from "@/models/AuditSchema";
import mongoose from 'mongoose';

const historicoSchema = new mongoose.Schema({
    tipoSimulado: { type: String, enum: ['Prova Completa', 'Mix'], required: true },
    dataRealizacao: { type: Date, default: Date.now },
    tempoTotalSegundos: { type: Number },
    
    // Detalhes das respostas dadas
    respostas: [{
        questaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questoes' },
        alternativaSelecionada: { type: String }, // letra marcada
        correta: { type: Boolean } // Salvo aqui para facilitar estatísticas rápidas
    }],
    
    scoreFinal: {
        totalQuestoes: { type: Number },
        acertos: { type: Number },
        erros: { type: Number }
    },

    // --- Controle de Sistema --
    ...auditSchema
    },
    { 
        timestamps: true 
    }
);

const Historico = mongoose.models.Historico || mongoose.model("Historico", historicoSchema);