"use client";

import { useState } from "react";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import CadastrarEditarUsuario from "@/app/usuario/dialogs/CadastrarEditarUsuario";
import { FormLogin } from "./commons/FormLogin";
import { useLoginForm } from "./commons/useLoginForm";

export default function LoginPage() {
  const { form, isSubmitting, error, onSubmit } = useLoginForm();
  const [openCadastro, setOpenCadastro] = useState(false);
  const [update, setUpdate] = useState(false);

  const idForm = "formLoginPrincipal";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      
      {/* Marca d'água decorativa */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <BookOpen className="absolute top-10 left-10 h-32 w-32 rotate-12" />
        <BookOpen className="absolute bottom-20 right-20 h-40 w-40 -rotate-12" />
      </div>

      <div className="flex w-full flex-col justify-center space-y-6 sm:w-[420px] relative z-10 px-4">
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1 text-center pb-4">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            
            <CardTitle className="text-2xl font-bold tracking-tight">
              Bem-vindo ao Gabarite
            </CardTitle>
            
            <CardDescription className="text-sm">
              Acesse sua conta para continuar estudando
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            
            {/* Exibição de erros de autenticação */}
            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Componente de Formulário Refatorado */}
            <FormLogin 
              form={form} 
              onSubmit={onSubmit} 
              idForm={idForm} 
              isSubmitting={isSubmitting} 
            />

            {/* Botão de Submit vinculado ao ID do formulário */}
            <Button 
              type="submit" 
              form={idForm} // Link com o formulário interno
              className="w-full" 
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Autenticando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>

            {/* Divider decorativo */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou
                </span>
              </div>
            </div>

            {/* Opção de Registro */}
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setOpenCadastro(true)}
              disabled={isSubmitting}
            >
              Criar nova conta
            </Button>

            {/* Modal de Cadastro Reutilizado */}
            <CadastrarEditarUsuario 
              open={openCadastro} 
              setOpen={setOpenCadastro}
              update={update}
              setUpdate={setUpdate}
            />
          </CardContent>
        </Card>

        {/* Footer da Página */}
        <p className="text-center text-xs text-muted-foreground">
          Gabarite &copy; {new Date().getFullYear()} - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}