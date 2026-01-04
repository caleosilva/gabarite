import mongoose from 'mongoose';

export const auditSchema = {
  cadastradoPorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuarios', 
    required: true,
    immutable: true
  },
  atualizadoPorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuarios' 
  },
  excluidoPorId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Usuarios' 
  },
  excluido: { type: Boolean, default: false, index: true },
  excluidoEm: { type: Date, default: null },
};