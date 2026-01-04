"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { Loader2, AlertCircle, BookOpen, CheckCircle2 } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import FormFieldBasic from "@/commons/FormField/FormField";
import { loginSchema, LoginValues } from "./loginSchema";
// import { CryptoUtils } from "@/utils/CryptoUtils"; // Usando sua classe utilitária
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Redireciona se já estiver autenticado
  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    // setIsSubmitting(true);
    // setError(null);

    // try {
    //   // Criptografia antes do envio (conforme seu padrão)
    //   const senhaCriptografada = CryptoUtils.encryptWithAES(values.senha);

    //   const result = await signIn("credentials", {
    //     email: values.email,
    //     senha: senhaCriptografada,
    //     redirect: false,
    //   });

    //   if (result?.error) {
    //     setError("E-mail ou senha incorretos.");
    //   } else {
    //     router.push("/");
    //   }
    // } catch (err) {
    //   setError("Ocorreu um erro inesperado ao realizar o login.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

 return (
    <div className="container relative min-h-screen flex items-center justify-center lg:px-0 bg-gradient-to-br from-background to-muted/20">
      
      {/* Marca d'água decorativa */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <BookOpen className="absolute top-10 left-10 h-32 w-32 rotate-12" />
        <BookOpen className="absolute bottom-20 right-20 h-40 w-40 -rotate-12" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px] relative z-10">
        
        <Card className="border-2">
          <CardHeader className="space-y-1 text-center pb-4">
            {/* Logo/Ícone */}
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

            {/* Formulário */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                <FormFieldBasic
                  form={form}
                  name="email"
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
                  disabled={isSubmitting}
                  obrigatorio
                />

                <FormFieldBasic
                  form={form}
                  name="senha"
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  obrigatorio
                />

                <Button 
                  type="submit" 
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
              </form>
            </Form>

            {/* Divider com "ou" */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou
                </span>
              </div>
            </div>

            {/* Botão de Registro */}
            <Button 
              variant="outline" 
              className="w-full" 
              asChild
              disabled={isSubmitting}
            >
              <Link href="/cadastro">
                Criar nova conta
              </Link>
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {/* Termos */}
            <p className="text-center text-xs text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <Link href="/termos" className="underline hover:text-primary transition-colors">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="/privacidade" className="underline hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Gabarite &copy; {new Date().getFullYear()} - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}