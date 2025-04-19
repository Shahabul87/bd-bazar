"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import clsx from 'clsx';
import { Github, Facebook, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: React.ReactNode;
  backButtonLabel: React.ReactNode;
  backButtonHref: string;
  showSocial?: boolean;
  className?: string;
  headerClassName?: string;
  hideVerticalDivider?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  className,
  headerClassName,
  hideVerticalDivider = false
}: CardWrapperProps) => {
  return (
    <Card className={clsx("shadow-sm w-full max-w-3xl", className)}>
      <CardHeader className="pb-8">
        <Header 
          label={headerLabel} 
          className={clsx("text-4xl md:text-5xl font-bold tracking-tight", headerClassName)}
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Left side - Login Form */}
          <div className="flex-1">
            {children}
          </div>

          {/* Vertical Gradient Divider - Only visible on md and up */}
          {!hideVerticalDivider && (
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px">
              <div className="h-full w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            </div>
          )}

          {/* Right side - Social Login */}
          {showSocial && (
            <div className="flex-1 flex flex-col justify-center md:pl-8">
              <div className="relative mb-8">
                {/* Mobile divider - Only visible below md */}
                <div className="md:hidden">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                {/* Desktop heading - Only visible on md and up */}
                <div className="hidden md:block text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white dark:bg-gray-800 px-6 py-2 text-sm font-medium
                        text-transparent bg-clip-text bg-gradient-to-r 
                        from-indigo-500 via-purple-500 to-pink-500
                        dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400
                        uppercase tracking-wider">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div className="h-1 w-12 rounded-full 
                      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                      dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-4">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => signIn("google")}
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700 
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    flex items-center justify-center gap-3
                    h-12 relative overflow-hidden group
                    transition-all duration-300 hover:scale-[1.02]"
                >
                  <Chrome className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Google</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                    via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] 
                    transition-transform duration-700" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => signIn("github")}
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700 
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    flex items-center justify-center gap-3
                    h-12 relative overflow-hidden group
                    transition-all duration-300 hover:scale-[1.02]"
                >
                  <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Github</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                    via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] 
                    transition-transform duration-700" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => signIn("facebook")}
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700 
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    flex items-center justify-center gap-3
                    h-12 relative overflow-hidden group
                    transition-all duration-300 hover:scale-[1.02]"
                >
                  <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-500 
                    group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Facebook</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                    via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] 
                    transition-transform duration-700" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          className="text-lg hover:opacity-80"
        />
      </CardFooter>
    </Card>
  );
};

