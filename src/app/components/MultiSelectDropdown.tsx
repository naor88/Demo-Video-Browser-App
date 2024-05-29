import React, { useEffect, useRef, useState } from "react";

interface MultiSelectDropdownProps {
  options: string[];
  updateSelectedOptions?: (options: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  updateSelectedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (updateSelectedOptions) {
      updateSelectedOptions(selectedOptions);
    }
  }, [selectedOptions, updateSelectedOptions]);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border px-4 py-2 flex items-center justify-between w-max"
      >
        Search by Genre
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-4 h-6 w-6"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-1 bg-white border mt-2 rounded-md shadow-lg">
          {options.map((option) => (
            <label key={option} className="block px-4 py-2">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
