"use client";

import { useState } from "react";
import { Check, Store } from "lucide-react";
import { TemplateCard } from "@/app/dashboard/stores/[storeId]/settings/_components/appearance/template-card";
import { Button } from "@/components/ui/button";
import { storeTemplates, getTemplateById } from "@/components/store-templates/templates";
import { updateStore } from "@/lib/actions/store-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TemplateSelectorProps {
  store: any;
}

export function TemplateSelector({ store }: TemplateSelectorProps) {
  const router = useRouter();
  const currentTheme = store.theme || "minimal";
  const [selectedTemplate, setSelectedTemplate] = useState(currentTheme);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Only show a subset of templates in the dashboard
  const templates = storeTemplates.slice(0, 3);
  
  const handleApplyTemplate = async () => {
    if (selectedTemplate === currentTheme) {
      return;
    }
    
    try {
      setIsUpdating(true);
      
      // Update store with new template
      await updateStore(store.id, {
        theme: selectedTemplate,
        appearanceSettings: JSON.stringify({
          templateId: selectedTemplate,
          colorMode: "light",
          showHero: true,
          customizations: {}
        })
      });
      
      toast.success("Store template updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template");
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium">Store Template</h3>
        <Button 
          onClick={handleApplyTemplate} 
          disabled={selectedTemplate === currentTheme || isUpdating}
          size="sm"
        >
          {isUpdating ? "Applying..." : "Apply Template"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="relative cursor-pointer" onClick={() => setSelectedTemplate(template.id)}>
            {selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 z-10 bg-indigo-500 text-white rounded-full p-1 shadow-md">
                <Check className="h-4 w-4" />
              </div>
            )}
            <TemplateCard 
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={() => setSelectedTemplate(template.id)}
              storeType={store.type || store.businessType}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="link" onClick={() => router.push(`/dashboard/stores/${store.id}/settings/appearance`)}>
          View all templates
        </Button>
      </div>
    </div>
  );
} 