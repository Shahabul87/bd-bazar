"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      className="w-full bg-white dark:bg-gray-800/95 rounded-2xl shadow-2xl 
        backdrop-blur-lg border-0 p-6 sm:p-8 transition-all duration-300"
    >
      <div className="flex flex-col items-center justify-center w-full space-y-6">
        {!success && !error && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-500 dark:text-indigo-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Verifying your email...
            </p>
          </div>
        )}

        {success && (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 dark:text-emerald-400" />
            </div>
            <FormSuccess message={success} />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Your email has been verified successfully.
              You can now close this window.
            </p>
          </div>
        )}

        {!success && error && (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-full">
              <XCircle className="h-12 w-12 text-rose-500 dark:text-rose-400" />
            </div>
            <FormError message={error} />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              There was an error verifying your email.
              Please try again or contact support.
            </p>
          </div>
        )}

        {/* Gradient line decoration */}
        <div className="w-full max-w-xs mx-auto">
          <div className="h-1 rounded-full 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400
            opacity-50" 
          />
        </div>
      </div>
    </CardWrapper>
  )
}