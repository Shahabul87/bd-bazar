"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { MainHeader } from "@/app/(homepage)/main-header";
import { useLanguage } from "@/app/context/LanguageContext";

const RegisterPage = () => {
  const { language } = useLanguage();
  
  const pageTitle = language === 'en' 
    ? "Create Your Account" 
    : "আপনার অ্যাকাউন্ট তৈরি করুন";
    
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{pageTitle}</h1>
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;