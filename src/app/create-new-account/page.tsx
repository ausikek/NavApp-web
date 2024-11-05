"use client";

import api from "@/services/api";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userRegistrationSchema } from "@/DTOs";
import { UserRegistration } from "@/types";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function CreateAccount() {
  const form = useForm<UserRegistration>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [view, setView] = useState(false);
  const [viewConfirm, setViewConfirm] = useState(false);
  const [creationError, setCreationError] = useState(false);

  const handleSubmit = (data: UserRegistration) => {
    api
      .post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(() => {
        router.push("/login");
      })
      .catch((error: AxiosError) => {
        if (error.status === 400) {
          setCreationError(true);
        } else if (error.status === 500) {
          setCreationError(true);
        } else {
          console.log(error.status);
        }
      });
  };

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex flex-row items-center gap-2 pl-2">
        <ChevronLeft
          className="w-10 h-10 cursor-pointer"
          onClick={router.back}
        />
        <h1 className="font-VT323 text-7xl">Cadastrar</h1>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow font-IBM">
        {creationError && (
          <p className="text-red-500 text-sm mb-3">
            O email já está cadastrado
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col justify-center items-center gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira seu usuário" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <IconInput
                        hover
                        type={view ? "text" : "password"}
                        icon={view ? Eye : EyeOff}
                        iconOnClick={() => setView(!view)}
                        placeholder="Insira sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <IconInput
                        hover
                        type={viewConfirm ? "text" : "password"}
                        icon={viewConfirm ? Eye : EyeOff}
                        iconOnClick={() => setViewConfirm(!viewConfirm)}
                        placeholder="Repita sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="px-6 py-3 w-full">
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}
