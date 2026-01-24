import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { loginSchema, LoginValues } from "./loginSchema";
import { useAuthComponente } from "@/commons/auth/hooks/useAuthComponente/useAuthComponente"
import {CryptoUtils} from "@/utils/CryptoUtils"

export function useLoginForm() {
  const {isAuthenticated} = useAuthComponente();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", senha: "" },
  });

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmit = async (values: LoginValues) => {
    setIsSubmitting(true);
    setError(null);

    try {

      const senhaCriptografada = await CryptoUtils.encryptWithAES(values.senha);
      
      const valoresParaEnvio = {
        email: values.email,
        senha: senhaCriptografada,
      };

      const result = await signIn("credentials", { 
        ...valoresParaEnvio, 
        redirect: false 
      });

      if (result?.error) {
        setError("E-mail ou senha incorretos.");
        setTimeout(() => setError(null), 4000);

      } else {
        router.push("/dashboard");
        // router.refresh();
      }

      
    } catch (err) {
      setError("Ocorreu um erro inesperado ao realizar o login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, error, onSubmit };
}