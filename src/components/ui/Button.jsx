const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon = null,
  iconPosition = "left",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    outline:
      "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500",
    link: "text-blue-600 hover:text-blue-800 underline bg-transparent",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {Icon && iconPosition === "left" && (
        <Icon
          size={size === "sm" ? 14 : size === "md" ? 16 : 18}
          className="mr-2 flex-shrink-0"
        />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon
          size={size === "sm" ? 14 : size === "md" ? 16 : 18}
          className="ml-2 flex-shrink-0"
        />
      )}
    </button>
  );
};

export default Button;
