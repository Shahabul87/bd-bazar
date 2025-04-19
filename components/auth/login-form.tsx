"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, Phone, Lock, ArrowRight, Globe } from "lucide-react";

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
import { useLanguage } from "@/app/context/LanguageContext";

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
  const { language, setLanguage, t } = useLanguage();

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

  const labels = {
    welcomeBack: language === 'en' ? 'Welcome back' : 'স্বাগতম',
    createAccount: language === 'en' ? 'Create account' : 'অ্যাকাউন্ট তৈরি করুন',
    emailOrPhone: language === 'en' ? 'Email or Phone' : 'ইমেইল বা ফোন',
    password: language === 'en' ? 'Password' : 'পাসওয়ার্ড',
    forgotPassword: language === 'en' ? 'Forgot password?' : 'পাসওয়ার্ড ভুলে গেছেন?',
    twoFactorCode: language === 'en' ? 'Two Factor Code' : 'টু-ফ্যাক্টর কোড',
    signIn: language === 'en' ? 'Sign In' : 'সাইন ইন',
    confirm: language === 'en' ? 'Confirm' : 'নিশ্চিত করুন',
    currentLanguage: language === 'en' ? '🇺🇸' : '🇧🇩',
  };

  return (
    <CardWrapper
      headerLabel={labels.welcomeBack}
      backButtonLabel={labels.createAccount}
      backButtonHref="/auth/register"
      showSocial
      className="w-full backdrop-blur-lg p-6 sm:p-8 transition-all duration-300
        bg-slate-800/40 dark:bg-gray-900/40 rounded-2xl shadow-2xl
        border border-gray-700/20"
    >
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
        className="absolute top-4 right-4 p-2 h-10 rounded-full flex items-center justify-center gap-2
          bg-slate-700/30 dark:bg-gray-800/30 hover:bg-slate-700/50 dark:hover:bg-gray-800/50
          border border-gray-600/30"
      >
        <Globe className="h-4 w-4 text-gray-300" />
        <span className="text-gray-300">{labels.currentLanguage}</span>
      </Button>

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
                          className="pl-10 h-12 bg-slate-700/30 dark:bg-gray-800/30 border-0 rounded-lg
                            text-white placeholder:text-gray-500
                            focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500
                            border border-gray-600/30
                            peer pt-4"
                        />
                        <FormLabel 
                          className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400
                            transition-all duration-200 pointer-events-none
                            peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-gray-300
                            peer-[:not(:placeholder-shown)]:-translate-y-4 
                            peer-[:not(:placeholder-shown)]:scale-75"
                        >
                          {labels.twoFactorCode}
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
                        <div className="relative mt-2 group">
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
                            className="w-full pl-10 h-14 bg-slate-700/30 dark:bg-gray-800/30
                              border border-gray-600/30
                              rounded-lg text-white
                              focus:border-gray-400 dark:focus:border-gray-500
                              focus:ring-2 focus:ring-gray-400/20 dark:focus:ring-gray-500/20
                              transition-all duration-200
                              peer"
                          />
                          <FormLabel 
                            className="absolute left-10 top-4 text-gray-400
                              transition-all duration-200 pointer-events-none
                              peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-gray-300
                              peer-focus:bg-slate-700/30 dark:peer-focus:bg-gray-800/30 peer-focus:px-2
                              peer-[:not(:placeholder-shown)]:-top-2.5 
                              peer-[:not(:placeholder-shown)]:left-3
                              peer-[:not(:placeholder-shown)]:text-sm
                              peer-[:not(:placeholder-shown)]:bg-slate-700/30 
                              dark:peer-[:not(:placeholder-shown)]:bg-gray-800/30
                              peer-[:not(:placeholder-shown)]:px-2"
                          >
                            {labels.emailOrPhone}
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
                            className="w-full pl-10 h-14 bg-slate-700/30 dark:bg-gray-800/30
                              border border-gray-600/30
                              rounded-lg text-white
                              focus:border-gray-400 dark:focus:border-gray-500
                              focus:ring-2 focus:ring-gray-400/20 dark:focus:ring-gray-500/20
                              transition-all duration-200
                              peer"
                          />
                          <FormLabel 
                            className="absolute left-10 top-4 text-gray-400
                              transition-all duration-200 pointer-events-none
                              peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm peer-focus:text-gray-300
                              peer-focus:bg-slate-700/30 dark:peer-focus:bg-gray-800/30 peer-focus:px-2
                              peer-[:not(:placeholder-shown)]:-top-2.5 
                              peer-[:not(:placeholder-shown)]:left-3
                              peer-[:not(:placeholder-shown)]:text-sm
                              peer-[:not(:placeholder-shown)]:bg-slate-700/30 
                              dark:peer-[:not(:placeholder-shown)]:bg-gray-800/30
                              peer-[:not(:placeholder-shown)]:px-2"
                          >
                            {labels.password}
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
                          className="text-gray-300 hover:text-white
                            text-sm font-medium"
                        >
                          {labels.forgotPassword}
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
              bg-gradient-to-r from-slate-700 to-gray-800
              dark:from-slate-800 dark:to-gray-900
              text-white rounded-lg font-medium
              overflow-hidden transition-all duration-300
              hover:scale-[1.02] hover:shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            <span className="relative z-10 font-semibold tracking-wide">
              {showTwoFactor ? labels.confirm : labels.signIn}
            </span>
            <ArrowRight className="h-5 w-5 relative z-10 
              group-hover:translate-x-1 transition-transform" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-gray-900
              dark:from-slate-900 dark:to-black
              opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent 
              via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] 
              transition-transform duration-1000" />
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};