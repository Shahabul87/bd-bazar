"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, RocketIcon, Zap, BarChart3 } from "lucide-react"
import Link from "next/link"
import React from "react"
import { useLanguage } from "@/app/context/LanguageContext"
import { motion } from "framer-motion"

// Feature details tooltip component
const FeatureTooltip = ({ children, content }: { children: React.ReactNode, content: string }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 rounded-xl bg-gray-900 px-4 py-3 text-sm text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 z-50 min-w-[250px] max-w-xs border border-gray-700/50">
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        {content}
      </div>
    </div>
  )
}

export const HeroSection = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setIsVisible(true)
    
    // Create particle effect
    const particleContainer = document.getElementById('particle-container')
    if (particleContainer) {
      for (let i = 0; i < 40; i++) {
        createParticle(particleContainer)
      }
    }
    
    return () => {
      const particleContainer = document.getElementById('particle-container')
      if (particleContainer) {
        particleContainer.innerHTML = ''
      }
    }
  }, [])
  
  const createParticle = (container: HTMLElement) => {
    const particle = document.createElement('div')
    
    // Random size between 2 and 6px
    const size = Math.random() * 4 + 2
    
    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    
    // Random color
    const colors = [
      'rgba(56, 189, 248, 0.6)', // Blue
      'rgba(168, 85, 247, 0.6)',  // Purple
      'rgba(236, 72, 153, 0.6)',  // Pink
      'rgba(59, 130, 246, 0.6)',  // Lighter Blue
    ]
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    // Random animation duration between 15 and 45 seconds
    const duration = Math.random() * 30 + 15
    
    // Apply styles
    particle.style.position = 'absolute'
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.borderRadius = '50%'
    particle.style.backgroundColor = color
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`
    particle.style.left = `${posX}%`
    particle.style.top = `${posY}%`
    particle.style.animation = `float ${duration}s linear infinite`
    particle.style.zIndex = '1'
    
    container.appendChild(particle)
  }

  // Feature descriptions in both languages
  const featureDetails = {
    smartStore: {
      en: 'Create and customize your online store with AI-powered design tools, inventory management, and seamless checkout experiences.',
      bn: 'এআই-চালিত ডিজাইন টুল, ইনভেন্টরি ম্যানেজমেন্ট এবং সহজ চেকআউট অভিজ্ঞতা সহ আপনার অনলাইন স্টোর তৈরি ও কাস্টমাইজ করুন।'
    },
    autoInventory: {
      en: 'Automatically track, forecast, and manage inventory levels using AI prediction to prevent stockouts and optimize ordering.',
      bn: 'স্টক আউট প্রতিরোধ এবং অর্ডার অপ্টিমাইজ করতে এআই প্রেডিকশন ব্যবহার করে স্বয়ংক্রিয়ভাবে ইনভেন্টরি লেভেল ট্র্যাক, ফোরকাস্ট এবং ম্যানেজ করুন।'
    },
    aiAnalytics: {
      en: 'Gain deep insights into customer behavior, sales trends, and business performance with AI-powered analytics dashboards.',
      bn: 'এআই-চালিত অ্যানালিটিক্স ড্যাশবোর্ড দিয়ে কাস্টমার আচরণ, বিক্রয় ট্রেন্ড এবং ব্যবসা পারফরম্যান্স সম্পর্কে গভীর অন্তর্দৃষ্টি পান।'
    }
  }
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* Particle container */}
      <div id="particle-container" className="absolute inset-0 z-10"></div>
      
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/40 to-gray-950 z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>
      
      {/* Glowing orb */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500 rounded-full filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      {/* Content container */}
      <div ref={heroRef} className="container mx-auto px-4 py-20 z-20 relative">
        {/* 3D floating elements - decorative */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-20 right-[15%] hidden md:block"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-xl transform rotate-12 animate-float-slow"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-20 left-[20%] hidden md:block"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full shadow-xl transform -rotate-12 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Main content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 order-2 lg:order-1 z-10"
          >
            {/* Headline with gradient stroke text */}
            <div className="relative mb-6">
              <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  {language === 'en' ? 'Transform' : 'আপনার ব্যবসার'}
                </span>
                <br />
                <span className="inline-block font-light text-white/80">
                  {language === 'en' ? 'Your Business' : ' পরিধি বাড়ান '}
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    {language === 'en' ? 'With AI' : 'এআই দিয়ে'}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
                </span>
              </h1>
            </div>
            
            {/* Feature badges with tooltips */}
            <div className="flex flex-wrap gap-3 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FeatureTooltip content={featureDetails.smartStore[language === 'en' ? 'en' : 'bn']}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 cursor-help transition-colors duration-200">
                    <RocketIcon className="w-4 h-4 mr-1.5" />
                    {language === 'en' ? 'Smart Stores' : 'স্মার্ট স্টোর'}
                  </span>
                </FeatureTooltip>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FeatureTooltip content={featureDetails.autoInventory[language === 'en' ? 'en' : 'bn']}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 cursor-help transition-colors duration-200">
                    <Zap className="w-4 h-4 mr-1.5" />
                    {language === 'en' ? 'Auto Inventory' : 'অটো ইনভেন্টরি'}
                  </span>
                </FeatureTooltip>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <FeatureTooltip content={featureDetails.aiAnalytics[language === 'en' ? 'en' : 'bn']}>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500/20 cursor-help transition-colors duration-200">
                    <BarChart3 className="w-4 h-4 mr-1.5" />
                    {language === 'en' ? 'AI Analytics' : 'এআই অ্যানালিটিক্স'}
                  </span>
                </FeatureTooltip>
              </motion.div>
            </div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xl text-gray-300/80 mb-8 max-w-lg"
            >
              {language === 'en' 
                ? 'The all-in-one platform that helps eCommerce businesses grow exponentially with AI-powered tools and real-time insights.'
                : 'এআই-পাওয়ার্ড টুল এবং রিয়েল-টাইম ইনসাইট সহ অল-ইন-ওয়ান প্লাটফর্ম যা ই-কমার্স ব্যবসাকে দ্রুত বাড়তে সাহায্য করে।'
              }
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl px-8 py-6 text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
              >
                {language === 'en' ? 'Start Free Trial' : 'ফ্রি ট্রায়াল শুরু করুন'} 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Link href="/demo" passHref>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg bg-gray-800/50 hover:bg-gray-800 text-white border-gray-700 rounded-xl px-8 py-6"
                >
                  {language === 'en' ? 'Watch Demo' : 'ডেমো দেখুন'}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* 3D Dashboard Visualization */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 order-1 lg:order-2 z-10"
          >
            <div className="relative mx-auto w-full max-w-lg aspect-square">
              {/* Main dashboard screen */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 bg-gradient-to-b from-gray-900 to-gray-950"
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                
                {/* Mockup header */}
                <div className="h-12 bg-gray-900 border-b border-gray-800/50 flex items-center justify-between px-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-5 w-32 bg-gray-800 rounded-md"></div>
                </div>
                
                {/* Dashboard content */}
                <div className="p-4 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-md bg-blue-500/20 mb-2 flex items-center justify-center">
                        <div className="w-4 h-4 bg-blue-500/60 rounded-sm"></div>
                      </div>
                      <div className="h-3 w-12 bg-blue-500/30 rounded mb-1"></div>
                      <div className="h-6 w-16 bg-blue-500/50 rounded"></div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-md bg-purple-500/20 mb-2 flex items-center justify-center">
                        <div className="w-4 h-4 bg-purple-500/60 rounded-sm"></div>
                      </div>
                      <div className="h-3 w-12 bg-purple-500/30 rounded mb-1"></div>
                      <div className="h-6 w-16 bg-purple-500/50 rounded"></div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/20 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-md bg-pink-500/20 mb-2 flex items-center justify-center">
                        <div className="w-4 h-4 bg-pink-500/60 rounded-sm"></div>
                      </div>
                      <div className="h-3 w-12 bg-pink-500/30 rounded mb-1"></div>
                      <div className="h-6 w-16 bg-pink-500/50 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Chart area */}
                  <div className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4 h-36">
                    <div className="h-4 w-24 bg-gray-700/50 rounded mb-3"></div>
                    <div className="h-16 flex items-end gap-1">
                      {[...Array(24)].map((_, i) => (
                        <div 
                          key={i}
                          className="flex-1 flex flex-col justify-end"
                        >
                          <div 
                            className={`rounded-sm ${i % 3 === 0 ? 'bg-blue-500/70' : i % 3 === 1 ? 'bg-purple-500/70' : 'bg-pink-500/70'}`}
                            style={{ height: `${Math.sin(i / 2) * 30 + 50}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Data table */}
                  <div className="bg-gray-800/30 border border-gray-700/30 rounded-lg p-4">
                    <div className="h-4 w-24 bg-gray-700/50 rounded mb-3"></div>
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-700/50"></div>
                          <div className="h-3 w-16 bg-gray-700/50 rounded"></div>
                          <div className="h-3 w-24 bg-gray-700/30 rounded"></div>
                          <div className="ml-auto h-6 w-16 bg-gray-700/50 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Small floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 0.8 },
                  scale: { duration: 0.5, delay: 0.8 },
                  y: { duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.2 }
                }}
                className="absolute -top-5 -right-5 w-28 h-28 bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-pink-500/20 rounded-lg shadow-lg p-2 transform rotate-6"
              >
                <div className="h-3 w-12 bg-pink-500/30 rounded mb-2"></div>
                <div className="h-10 flex items-end gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i}
                      className="flex-1 flex flex-col justify-end"
                    >
                      <div 
                        className="bg-pink-500/60 rounded-sm"
                        style={{ height: `${(i + 1) * 15}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 1 },
                  scale: { duration: 0.5, delay: 1 },
                  y: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
                }}
                className="absolute -bottom-3 -left-3 w-28 h-28 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg shadow-lg p-2 transform -rotate-6"
              >
                <div className="h-3 w-12 bg-blue-500/30 rounded mb-2"></div>
                <div className="flex items-center justify-center h-12 w-12 mx-auto bg-blue-500/10 rounded-full">
                  <div className="h-6 w-6 bg-blue-500/40 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Floating notification */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: [0, -5, 0] }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 1.2 },
                  scale: { duration: 0.5, delay: 1.2 },
                  x: { duration: 0.5, delay: 1.2 },
                  y: { duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 1 }
                }}
                className="absolute top-1/3 -right-8 w-48 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-lg p-3"
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="h-3 w-24 bg-gray-600 rounded mb-1"></div>
                    <div className="h-2 w-32 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
} 