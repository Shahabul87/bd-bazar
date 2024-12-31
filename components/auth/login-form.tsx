"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, Phone, Lock, ArrowRight } from "lucide-react";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Create account"
      backButtonHref="/auth/register"
      showSocial
      className="w-full bg-white dark:bg-gray-800/95 rounded-2xl shadow-2xl 
        backdrop-blur-lg border-0 p-6 sm:p-8 transition-all duration-300"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder=""
                          id="code"
                          className="pl-10 h-12 bg-gray-50 dark:bg-gray-700/50 border-0 rounded-lg
                            text-gray-900 dark:text-gray-100 placeholder:text-gray-500
                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                            peer pt-4"
                        />
                        <FormLabel 
                          className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 
                            transition-all duration-200 pointer-events-none
                            peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-500
                            peer-[:not(:placeholder-shown)]:-translate-y-4 
                            peer-[:not(:placeholder-shown)]:scale-75"
                        >
                          Two Factor Code
                        </FormLabel>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative mt-2">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10">
                            <Mail className="absolute transition-opacity duration-200 
                              opacity-100 group-focus-within:opacity-0" />
                            <Phone className="absolute transition-opacity duration-200 
                              opacity-0 group-focus-within:opacity-100" />
                          </div>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder=" "
                            id="email"
                            className="w-full pl-10 h-14 bg-gray-50 dark:bg-gray-700/50 
                              border border-gray-200 dark:border-gray-600
                              rounded-lg text-gray-900 dark:text-gray-100
                              focus:border-blue-500 dark:focus:border-blue-400
                              focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
                              transition-all duration-200
                              peer"
                          />
                          <FormLabel 
                            className="absolute left-10 top-4 text-gray-500 
                              transition-all duration-200 pointer-events-none
                              peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
                              peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-2
                              peer-[:not(:placeholder-shown)]:-top-2.5 
                              peer-[:not(:placeholder-shown)]:left-3
                              peer-[:not(:placeholder-shown)]:text-sm
                              peer-[:not(:placeholder-shown)]:bg-white 
                              dark:peer-[:not(:placeholder-shown)]:bg-gray-800
                              peer-[:not(:placeholder-shown)]:px-2"
                          >
                            Email or Phone Number
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder=" "
                            type="password"
                            id="password"
                            className="w-full pl-10 h-14 bg-gray-50 dark:bg-gray-700/50 
                              border border-gray-200 dark:border-gray-600
                              rounded-lg text-gray-900 dark:text-gray-100
                              focus:border-blue-500 dark:focus:border-blue-400
                              focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
                              transition-all duration-200
                              peer"
                          />
                          <FormLabel 
                            className="absolute left-10 top-4 text-gray-500 
                              transition-all duration-200 pointer-events-none
                              peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
                              peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-2
                              peer-[:not(:placeholder-shown)]:-top-2.5 
                              peer-[:not(:placeholder-shown)]:left-3
                              peer-[:not(:placeholder-shown)]:text-sm
                              peer-[:not(:placeholder-shown)]:bg-white 
                              dark:peer-[:not(:placeholder-shown)]:bg-gray-800
                              peer-[:not(:placeholder-shown)]:px-2"
                          >
                            Password
                          </FormLabel>
                        </div>
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link 
                          href="/auth/reset"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-500
                            text-sm font-medium"
                        >
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full h-12 relative group
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400
              text-white rounded-lg font-medium
              overflow-hidden transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            <span className="relative z-10 font-semibold tracking-wide">
              {showTwoFactor ? "Confirm" : "Sign In"}
            </span>
            <ArrowRight className="h-5 w-5 relative z-10 
              group-hover:translate-x-1 transition-transform" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
              dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500
              opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent 
              via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] 
              transition-transform duration-1000" />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};