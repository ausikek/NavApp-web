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
import { userRegistrationSchema } from "@/DTOs";
import { UserRegistration } from "@/types";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const form = useForm<UserRegistration>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  const [view, setView] = useState(false);
  const [viewConfirm, setViewConfirm] = useState(false);

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
                name="email"
                render={({ field }) => (
                  <FormItem className="min-w-full">
                    <FormControl>
                      <Input placeholder="E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="min-w-full">
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