import {auditSchema} from "@/models/AuditSchema";
import mongoose from 'mongoose';

const questaoSchema = new mongoose.Schema({
    concursoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Concursos', required: true },
    titulo: { type: String, required: true },
    enunciado: { type: String, required: true },
    disciplinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplinas', required: true },
    midiaUrl: { type: String }, // URL da imagem (se houver)
    
    // Array de objetos para as alternativas
    alternativas: [{
        texto: { type: String, required: true },
        letra: { type: String, required: true }, // a, b, c, d, e
        isCorreta: { type: Boolean, default: false }
    }],
    
    explicacao: { type: String }, // Comentário do gabarito
    dificuldade: { type: String, enum: ['Fácil', 'Média', 'Difícil'], default: 'Média' },

    // --- Controle de Sistema --
    ...auditSchema
    },
    { 
        timestamps: true 
    }
);

// Índice para buscas rápidas em simulados
questaoSchema.index({ disciplina: 1, assunto: 1 });

const Questao = mongoose.models.Questoes || mongoose.model("Questoes", questaoSchema);