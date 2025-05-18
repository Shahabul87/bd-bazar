"use client"

interface Tab {
  label: string
  value: string
  count?: number
  icon?: React.ComponentType<{ className?: string }>
}

interface StatusTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (value: string) => void
  className?: string
  ariaLabel?: string
}

export const StatusTabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = "",
  ariaLabel = "Status filter tabs"
}: StatusTabsProps) => {
  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div 
      className={`bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700 ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value
          const Icon = tab.icon

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.value}`}
              className={`
                px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200
                flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                ${isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                }
              `}
            >
              {Icon && (
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
              )}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`
                  text-sm px-2 py-0.5 rounded-full transition-colors duration-200
                  ${isActive
                    ? "bg-blue-700 text-blue-100"
                    : "bg-gray-800 text-gray-400"
                  }
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
} 