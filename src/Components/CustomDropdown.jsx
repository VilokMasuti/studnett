import { useState } from "react"

const CustomDropdown = ({ label, field, options, placeholder = "Select", error }) => {
    const [isOpen, setIsOpen] = useState(false)

      const handleSelect = (option) => {
    field.onChange(option)
    setIsOpen(false)
  }

  return (
 <div className="relative">
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 border rounded-lg  bg-amber-50 font-sans text-left text-gray-800 font-medium flex justify-between items-center hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span>{field.value || placeholder}</span>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 font-sans  bg-amber-50  border border-gray-300 rounded-lg shadow-2xl z-[9999] overflow-y-auto max-h-64">
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-3 text-left font-medium transition-all duration-700 hover:bg-black hover:text-white ${
                field.value === option ? "bg-gray-100 text-black border-l-4 border-black" : "text-gray-800"
              } ${index !== options.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
export default CustomDropdown
