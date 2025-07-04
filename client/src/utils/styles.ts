export const buttonStyles = {
  base: `
    relative overflow-hidden font-medium rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  `,

  variants: {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-transparent",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 bg-transparent",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg",
  },

  sizes: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  },

  ripple: "absolute bg-white rounded-full pointer-events-none",
};

export const cardStyles = {
  base: "border border-gray-200",

  padding: {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  },

  shadow: {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  },

  rounded: {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  },

  background: {
    white: "bg-white",
    gray: "bg-gray-50",
    transparent: "bg-transparent",
  },

  hover: "cursor-pointer transition-shadow duration-300 hover:shadow-lg",
};

export const inputStyles = {
  base: "w-full transition-all duration-200 focus:outline-none",

  variants: {
    default:
      "border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
    filled:
      "bg-gray-100 rounded-lg border-0 focus:bg-white focus:ring-2 focus:ring-blue-500",
    underlined:
      "bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500",
  },

  sizes: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  },

  states: {
    error: "border-red-500 focus:border-red-500 focus:ring-red-200",
    success: "border-green-500 focus:border-green-500 focus:ring-green-200",
  },

  label: {
    base: "absolute left-0 transition-all duration-200 pointer-events-none origin-left",
    floating: "text-xs text-blue-600",
    normal: "text-gray-500",
    underlined: {
      floating: "text-sm text-blue-600 -top-5",
      normal: "top-3",
    },
    default: {
      floating: "top-1",
      normal: "top-3",
    },
  },

  icon: "absolute z-10 text-gray-400",
  iconLeft: "left-3",
  iconRight: "right-3",

  message: {
    error: "mt-1 text-sm text-red-600",
    success: "mt-1 text-sm text-green-600",
  },
};

export const modalStyles = {
  overlay:
    "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50",

  container:
    "relative w-full max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-xl",

  sizes: {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-screen-xl mx-4",
  },

  header: "flex items-center justify-between p-6 border-b border-gray-200",
  title: "text-xl font-semibold text-gray-900",
  closeButton:
    "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors",

  content: "overflow-y-auto max-h-[calc(90vh-80px)]",
};

export const layoutStyles = {
  container: "min-h-screen bg-gray-50",
  header: "sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200",
  content: "flex",

  sidebar: {
    base: "bg-white shadow-lg border-r border-gray-200 min-h-screen sticky top-0 overflow-y-auto",
    widths: {
      sm: "w-64",
      md: "w-72",
      lg: "w-80",
    },
  },

  main: "flex-1 p-6",
  footer: "bg-white border-t border-gray-200 mt-auto",
};

export const dropdownStyles = {
  container: "relative",
  label: "block text-sm font-medium text-gray-700 mb-1",

  trigger: `
    relative w-full pl-4 pr-10 py-3 text-left bg-white border-2 border-gray-300 
    rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
    focus:border-blue-500 transition-all duration-200
  `,

  triggerDisabled: "opacity-50 cursor-not-allowed",
  triggerActive: "cursor-pointer hover:border-gray-400",
  triggerError: "border-red-500 focus:border-red-500 focus:ring-red-200",

  selectedText: "text-gray-900",
  placeholderText: "text-gray-500",

  chevron:
    "absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none",
  chevronIcon: "w-5 h-5 text-gray-400 transition-transform duration-200",
  chevronOpen: "transform rotate-180",

  menu: "absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg",
  search: "p-2 border-b border-gray-200",
  searchInput:
    "w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500",

  options: "max-h-60 overflow-auto",
  option: "w-full px-4 py-2 text-left text-sm transition-colors duration-150",
  optionActive:
    "text-gray-900 hover:bg-blue-50 hover:text-blue-700 cursor-pointer",
  optionDisabled: "text-gray-400 cursor-not-allowed",
  optionSelected: "bg-blue-100 text-blue-700",

  noOptions: "px-4 py-2 text-sm text-gray-500",
  errorMessage: "mt-1 text-sm text-red-600",
};

export const toastStyles = {
  container:
    "fixed z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden border",

  positions: {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  },

  types: {
    success: {
      bg: "bg-green-50 border-green-200",
      icon: "text-green-600",
      title: "text-green-800",
      message: "text-green-700",
      progress: "bg-green-500",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      icon: "text-red-600",
      title: "text-red-800",
      message: "text-red-700",
      progress: "bg-red-500",
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      icon: "text-yellow-600",
      title: "text-yellow-800",
      message: "text-yellow-700",
      progress: "bg-yellow-500",
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-800",
      message: "text-blue-700",
      progress: "bg-blue-500",
    },
  },

  content: "p-4",
  header: "flex items-start",
  icon: "flex-shrink-0",
  text: "ml-3 w-0 flex-1",
  title: "text-sm font-medium",
  message: "text-sm",
  closeButton: "ml-4 flex-shrink-0 flex",
  closeButtonInner:
    "inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition ease-in-out duration-150",

  progressContainer: "h-1 bg-gray-200",
  progressBar: "h-full transition-all ease-linear",
};

export const loaderStyles = {
  container: "flex flex-col items-center justify-center space-y-3",
  fullscreen:
    "fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm",

  sizes: {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  },

  colors: {
    blue: "text-blue-600 border-blue-600",
    gray: "text-gray-600 border-gray-600",
    green: "text-green-600 border-green-600",
    red: "text-red-600 border-red-600",
    purple: "text-purple-600 border-purple-600",
  },

  variants: {
    pulse: "rounded-full bg-current",
  },

  text: "text-sm font-medium",
};

export const cn = (
  ...classes: (string | number | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
