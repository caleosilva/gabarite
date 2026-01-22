import { RecursoType, Recurso } from "@/commons/auth/enum/recurso";

export class ProxyUtil {

    /**
     * Extrai o recurso a partir de um path de URL.
     * Exemplo: "/usuario/novo" -> "usuario"
     */
    public static obterRecursoPorPath(path: string): RecursoType['value'] | undefined {

        const segmentos = path.split('/');
        
        const primeiroSegmento = segmentos[0] === '' ? segmentos[1] : segmentos[0];

        const recursoEncontrado = Object.values(Recurso).find(
            (r) => r.value === primeiroSegmento
        );

        return recursoEncontrado?.value;
    };
}
