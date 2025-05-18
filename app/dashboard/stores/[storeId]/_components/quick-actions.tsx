"use client";

interface QuickAction {
  name: string;
  description: string;
  icon: React.ElementType;
}

interface QuickActionsProps {
  t: {
    quickActions: string;
    actions: QuickAction[];
  };
}

export function QuickActions({ t }: QuickActionsProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl sticky top-6">
      <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-blue-600/30 to-indigo-600/30">
        <h3 className="text-lg font-medium text-white">{t.quickActions}</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {t.actions.map((action, index) => (
            <button
              key={index}
              className="w-full flex items-center p-3 rounded-lg text-left
                        bg-white/5 hover:bg-white/10 backdrop-blur-sm
                        border border-white/5 hover:border-white/20
                        transition-all duration-200 group"
            >
              <div className="mr-3 p-2 rounded-md bg-gradient-to-br from-indigo-500/20 to-purple-600/20 group-hover:from-indigo-500/30 group-hover:to-purple-600/30 transition-colors">
                <action.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-white font-medium">{action.name}</h4>
                <p className="text-white/60 text-sm">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 