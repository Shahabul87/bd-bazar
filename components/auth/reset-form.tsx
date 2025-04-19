"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight, Globe } from "lucide-react";

import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";
import { useLanguage } from "@/app/context/LanguageContext";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { language, setLanguage } = useLanguage();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  // Language-specific labels
  const labels = {
    forgotPassword: language === 'en' ? 'Forgot your password?' : 'পাসওয়ার্ড ভুলে গেছেন?',
    subHeader: language === 'en' ? 'Please enter your email to continue' : 'অনুগ্রহ করে আপনার ইমেইল দিন',
    backToLogin: language === 'en' ? 'Back to login' : 'লগইনে ফিরে যান',
    emailAddress: language === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা',
    sendResetLink: language === 'en' ? 'Send Reset Link' : 'রিসেট লিঙ্ক পাঠান',
    checkEmail: language === 'en' 
      ? 'Check your email for the password reset link. If you don\'t see it, check your spam folder.'
      : 'পাসওয়ার্ড রিসেট লিঙ্কের জন্য আপনার ইমেইল চেক করুন। যদি আপনি এটি না দেখেন, আপনার স্প্যাম ফোল্ডার চেক করুন।',
    currentLanguage: language === 'en' ? '🇺🇸' : '🇧🇩',
  };

  return (
    <div className="flex justify-center items-center w-full max-w-xl mx-auto mt-16">
      <CardWrapper
        headerLabel={labels.forgotPassword}
        backButtonLabel={labels.backToLogin}
        backButtonHref="/auth/login"
        className="w-full bg-slate-800/40 dark:bg-gray-900/40 rounded-2xl shadow-2xl 
          backdrop-blur-lg p-6 sm:p-8 transition-all duration-300
          border border-gray-700/20"
        hideVerticalDivider={true}
        headerClassName="text-3xl md:text-4xl font-bold tracking-tight pt-4 whitespace-nowrap overflow-visible"
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-[18px] h-5 w-5 text-gray-400 z-10" />
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder=" "
                          type="email"
                          id="email"
                          className="w-full pl-10 h-14 bg-slate-700/30 dark:bg-gray-800/30
                            border border-gray-600/30
                            rounded-lg text-white
                            focus:border-gray-400 dark:focus:border-gray-500
                            focus:ring-2 focus:ring-gray-400/20 dark:focus:ring-gray-500/20
                            transition-all duration-200
                            peer pt-5"
                        />
                        <FormLabel 
                          className="absolute left-10 top-[18px] text-gray-400
                            transition-all duration-200 pointer-events-none
                            peer-focus:-top-0.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-300
                            peer-focus:bg-transparent peer-focus:px-1
                            peer-[:not(:placeholder-shown)]:-top-0.5
                            peer-[:not(:placeholder-shown)]:left-3
                            peer-[:not(:placeholder-shown)]:text-xs
                            peer-[:not(:placeholder-shown)]:bg-transparent
                            peer-[:not(:placeholder-shown)]:px-1"
                        >
                          {labels.emailAddress}
                        </FormLabel>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
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
                {labels.sendResetLink}
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

            {/* Additional help text */}
            {success && (
              <p className="text-sm text-center text-gray-400 dark:text-gray-400">
                {labels.checkEmail}
              </p>
            )}
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};