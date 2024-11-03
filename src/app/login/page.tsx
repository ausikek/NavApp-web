"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconInput } from "@/components/IconInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { userLoginSchema } from "@/DTOs";
import { UserLogin } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const form = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  const [view, setView] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <h1 className="font-VT323 pl-2 text-7xl">Entrar</h1>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex flex-col ${
              form.formState.errors.username || form.formState.errors.password
                ? "gap-2"
                : "gap-9"
            } justify-center items-center`}
          >
            <div className="flex flex-col justify-center items-center gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormControl>
                      <Input placeholder="Usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormControl>
                      <IconInput
                        hover
                        type={view ? "text" : "password"}
                        icon={view ? Eye : EyeOff}
                        iconOnClick={() => setView(!view)}
                        placeholder="Senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                  Ainda não possui conta? <b>Clique aqui!</b>
                </a>
              </div>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
