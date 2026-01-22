"use client"

export default function NotAllowed() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center justify-center max-w-md px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Acesso Negado
                </h1>
                
                <p className="text-base text-gray-600 text-center">
                    Sem permissão para acessar esse recurso.
                </p>
            </div>
        </div>
    )
}