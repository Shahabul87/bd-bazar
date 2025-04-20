"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import { Send, Bot, Sparkles } from "lucide-react";

interface AIAssistantProps {
  user: User | undefined;
}

export function AIAssistant({ user }: AIAssistantProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock conversation history - in a real app, this would come from a database or API
  const [conversation, setConversation] = useState([
    { 
      role: 'assistant', 
      content: `Hello ${user?.name || 'there'}! How can I help you with your store today?` 
    }
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    const newConversation = [
      ...conversation,
      { role: 'user', content: message }
    ];
    
    setConversation(newConversation);
    setMessage("");
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      // Mock AI response based on user message
      let response = "I'm analyzing your request...";
      
      if (message.toLowerCase().includes("sales")) {
        response = "Your sales are up 12% compared to last month. The best performing product is the Wireless Headphones.";
      } else if (message.toLowerCase().includes("inventory")) {
        response = "You have 3 products with low inventory: Smartphone Cases (5), Wireless Earbuds (8), and Smart Watches (4).";
      } else if (message.toLowerCase().includes("customer")) {
        response = "You've had 28 new customers this month, with a retention rate of 65%.";
      } else {
        response = "I can help you with sales analytics, inventory management, customer insights, or marketing suggestions. What would you like to know?";
      }
      
      setConversation([
        ...newConversation,
        { role: 'assistant', content: response }
      ]);
      
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
      <div className="border-b border-slate-700/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-medium text-white">AI Assistant</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-700/50 text-xs text-purple-300">
          <Sparkles className="h-3 w-3" />
          <span>Powered by AI</span>
        </div>
      </div>
      
      {/* Conversation area */}
      <div className="p-4 h-64 overflow-y-auto flex flex-col gap-4">
        {conversation.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[80%] rounded-lg p-3 
                ${msg.role === 'user' 
                  ? 'bg-blue-600/20 border border-blue-600/40 text-white' 
                  : 'bg-slate-700/50 border border-slate-600/50 text-gray-200'}
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700/50 border border-slate-600/50 text-gray-200 max-w-[80%] rounded-lg p-3">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask something about your store..."
            className="flex-1 bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 