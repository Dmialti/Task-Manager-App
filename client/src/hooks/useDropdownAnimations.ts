import { useState, useEffect, useRef } from "react";
import { dropdownAnimations } from "../utils/animations";

export const useDropdownAnimations = (searchable: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      dropdownAnimations.show(menu);
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    } else {
      dropdownAnimations.hide(menu);
      setSearchTerm("");
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    dropdownRef,
    menuRef,
    searchInputRef,
  };
};
