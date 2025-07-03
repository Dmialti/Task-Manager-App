import React, { useState, useEffect } from "react";
import { useDropdownAnimations } from "../../hooks/useDropdownAnimations";
import { dropdownStyles, cn } from "../../utils/styles";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled = false,
  searchable = false,
  className = "",
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);

  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    menuRef,
    searchInputRef,
  } = useDropdownAnimations(searchable);

  useEffect(() => {
    if (searchable) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options, searchable]);

  const selectedOption = options.find((option) => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn(dropdownStyles.container, className)} ref={dropdownRef}>
      {label && <label className={dropdownStyles.label}>{label}</label>}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          dropdownStyles.trigger,
          disabled
            ? dropdownStyles.triggerDisabled
            : dropdownStyles.triggerActive,
          error && dropdownStyles.triggerError
        )}
      >
        <span
          className={
            selectedOption
              ? dropdownStyles.selectedText
              : dropdownStyles.placeholderText
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className={dropdownStyles.chevron}>
          <svg
            className={cn(
              dropdownStyles.chevronIcon,
              isOpen && dropdownStyles.chevronOpen
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <div
        ref={menuRef}
        className={dropdownStyles.menu}
        style={{ display: "none" }}
      >
        {searchable && (
          <div className={dropdownStyles.search}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={dropdownStyles.searchInput}
            />
          </div>
        )}

        <div className={dropdownStyles.options}>
          {filteredOptions.length === 0 ? (
            <div className={dropdownStyles.noOptions}>No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  !option.disabled && handleOptionClick(option.value)
                }
                disabled={option.disabled}
                className={cn(
                  dropdownStyles.option,
                  option.disabled
                    ? dropdownStyles.optionDisabled
                    : dropdownStyles.optionActive,
                  value === option.value && dropdownStyles.optionSelected
                )}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      </div>

      {error && <p className={dropdownStyles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Dropdown;
