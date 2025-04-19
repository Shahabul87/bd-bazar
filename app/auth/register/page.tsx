"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { Header } from "@/app/(homepage)/header";
import { useLanguage } from "@/app/context/LanguageContext";

const RegisterPage = () => {
  const { language } = useLanguage();
  
  const pageTitle = language === 'en' 
    ? "Create Your Account" 
    : "আপনার অ্যাকাউন্ট তৈরি করুন";
    
  return <>
      <div className="mt-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{pageTitle}</h1>
        <RegisterForm />
      </div>
    </>;
}
 
export default RegisterPage;