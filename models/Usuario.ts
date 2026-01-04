import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true, trim: true },
        email: { 
            type: String, 
            required: true, 
            unique: true, // Garante que não existam emails duplicados
            lowercase: true, 
            trim: true 
        },
        senha: { 
            type: String, 
            required: true, 
            select: false // Evita que a senha seja retornada em consultas comuns por segurança
        },
        isAdmin: { type: Boolean, default: false },
        
        // --- Informações de Perfil de Estudo ---
        fotoUrl: { type: String }, // Para o avatar do usuário
        cargoAlvo: { type: String }, // Ex: "Analista Judiciário"
        interesses: [{ type: String }], // Ex: ["Direito Administrativo", "TI"]
        
        // --- Estatísticas Acumuladas (Redundância para performance) ---
        estatisticasGerais: {
            totalQuestoesRespondidas: { type: Number, default: 0 },
            totalAcertos: { type: Number, default: 0 },
            totalErros: { type: Number, default: 0 },
            pontosExperiencia: { type: Number, default: 0 } // Para sistema de níveis/rankings
        },

        // --- Controle de Sistema --
        excluido: { type: Boolean, default: false, required: true }
    },
    { 
        timestamps: true // Cria automaticamente createdAt e updatedAt
    }
);

// Índice para busca rápida por email
usuarioSchema.index({ email: 1 });

// Criando o modelo de usuário
const Usuario = mongoose.models.Usuarios || mongoose.model("Usuarios", usuarioSchema, 'usuarios');

export default Usuario;