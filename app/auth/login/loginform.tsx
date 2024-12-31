"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export const LoginFormNew: React.FC = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    'Email or Phone': '',
    'Password': ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    'Email or Phone': null,
    'Password': null
  });

  const handleFocus = (label: string) => {
    setFocusedInput(label);
  };

  const handleBlur = (label: string) => {
    setFocusedInput(null);
    if (label === 'Email or Phone' && inputValues['Email or Phone']) {
      validateEmailOrPhone();
    }
  };

  const handleChange = (label: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [label]: value
    }));
    setErrors(prev => ({
      ...prev,
      [label]: null
    }));
  };

  const validateEmailOrPhone = () => {
    const value = inputValues['Email or Phone'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (loginMethod === 'email' && !emailRegex.test(value)) {
      setErrors(prev => ({
        ...prev,
        'Email or Phone': "Please enter a valid email address"
      }));
    } else if (loginMethod === 'phone' && !phoneRegex.test(value)) {
      setErrors(prev => ({
        ...prev,
        'Email or Phone': "Please enter a valid phone number"
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        'Email or Phone': null
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl 
        overflow-hidden transition-all duration-300">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 
            bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 
            bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 
                font-medium transition-colors">
              Sign Up
            </Link>
          </p>

          {/* Login Method Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${loginMethod === 'email' 
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${loginMethod === 'phone' 
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Phone className="h-4 w-4" />
              <span>Phone</span>
            </button>
          </div>

          <form className="space-y-6">
            {/* Email/Phone Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {loginMethod === 'email' ? (
                  <Mail className="h-5 w-5 text-gray-400" />
                ) : (
                  <Phone className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <input
                type={loginMethod === 'email' ? 'email' : 'tel'}
                placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                value={inputValues['Email or Phone']}
                onChange={(e) => handleChange('Email or Phone', e.target.value)}
                onFocus={() => handleFocus('Email or Phone')}
                onBlur={() => handleBlur('Email or Phone')}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg 
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                  transition-all duration-300"
              />
              {errors['Email or Phone'] && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                  {errors['Email or Phone']}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={inputValues['Password']}
                onChange={(e) => handleChange('Password', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg 
                  text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                  transition-all duration-300"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link href="/auth/forgot-password" 
                className="text-sm text-indigo-600 dark:text-indigo-400 
                  hover:text-indigo-500 font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                hover:from-indigo-500 hover:to-purple-500
                text-white rounded-lg font-medium shadow-lg 
                hover:shadow-xl transform hover:-translate-y-0.5 
                transition-all duration-300"
            >
              Sign In
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2 
                bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                rounded-lg border border-gray-200 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 
                bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                rounded-lg border border-gray-200 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
