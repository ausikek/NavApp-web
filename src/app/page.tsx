"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { userLoginSchema } from "@/DTOs";
import { UserLogin } from "@/types";
import { Logo } from "@/assets";

export default function Login() {
  const form = useForm<UserLogin>({ resolver: zodResolver(userLoginSchema) });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <div className="bg-background flex items-center justify-center min-h-screen">
      <main className="flex">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex flex-col ${
              form.formState.errors.username || form.formState.errors.password
                ? "gap-2"
                : "gap-9"
            } justify-center items-center`}
          >
            <div className="flex flex-col justify-center items-center gap-1">
              <Image
                className=""
                src={Logo}
                alt="Company Logo"
                width={180}
                height={38}
              />
              {(form.formState.errors.username ||
                form.formState.errors.password) && (
                <span>Usuário ou Senha inválidos</span>
              )}
            </div>
            <div className="flex flex-col justify-center items-center gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormControl>
                      <Input placeholder="Usuário" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex min-w-full justify-between">
                <a href="/forgot-password">
                  <Button type="button" className="px-6 py-3">
                    Esqueci a senha
                  </Button>
                </a>
                <Button type="submit" className="px-6 py-3">
                  Entrar
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <hr />
                <a href="/create-new-account">
                  Ainda não possui conta? Clique aqui!
                </a>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
