"use client";

interface StatItem {
  name: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

interface StoreStatsProps {
  t: {
    quickStats: string;
    stats: StatItem[];
  };
}

export function StoreStats({ t }: StoreStatsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white/90 mb-4">{t.quickStats}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl
                      transform hover:scale-[1.02] transition-all duration-300 hover:bg-white/10
                      relative overflow-hidden group"
          >
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full
                         group-hover:scale-110 transition-transform duration-300"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/60 text-sm font-medium">{stat.name}</p>
                <p className="text-white font-bold text-2xl mt-1">{stat.value}</p>
                <span className={`text-sm font-medium mt-1 inline-block px-2 py-0.5 rounded-full ${
                  stat.change.startsWith('+') ? 'text-green-300 bg-green-900/20' : 'text-red-300 bg-red-900/20'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/5">
                <stat.icon className="h-5 w-5 text-white/80" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 