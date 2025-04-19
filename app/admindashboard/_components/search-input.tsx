"use client"

import { Search, X } from "lucide-react"
import { useEffect, useState, useCallback, useRef } from "react"
import { debounce } from "lodash"

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange: (value: string) => void
  className?: string
  debounceMs?: number
  onClear?: () => void
  autoFocus?: boolean
  disabled?: boolean
  ariaLabel?: string
}

export const SearchInput = ({
  placeholder = "Search...",
  value: externalValue,
  onChange,
  className = "",
  debounceMs = 300,
  onClear,
  autoFocus = false,
  disabled = false,
  ariaLabel = "Search input"
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState(externalValue || "")
  const inputRef = useRef<HTMLInputElement>(null)

  // Update internal value when external value changes
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue)
    }
  }, [externalValue])

  // Debounced onChange handler
  const debouncedOnChange = useCallback((value: string) => {
    const handler = debounce((searchValue: string) => {
      onChange(searchValue)
    }, debounceMs)
    
    handler(value)
    
    return () => {
      handler.cancel()
    }
  }, [onChange, debounceMs])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    debouncedOnChange(newValue)
  }

  // Handle clear
  const handleClear = () => {
    setInternalValue("")
    onChange("")
    onClear?.()
    inputRef.current?.focus()
  }

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel()
    }
  }, [debouncedOnChange])

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" 
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        value={internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-label={ariaLabel}
        className="w-full pl-10 pr-9 py-2 bg-gray-700 border border-gray-600 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          text-white placeholder-gray-400
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {internalValue && (
        <button
          onClick={handleClear}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-300
            p-1 rounded-full hover:bg-gray-600
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
} 