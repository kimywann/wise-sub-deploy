import { forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "bordered";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = "default", className, ...props }, ref) => {
    const baseClasses = "w-full rounded-lg p-4 transition-colors";
    const variantClasses = {
      default:
        "border border-slate-300 focus:border-indigo-500 focus:outline-none",
      bordered:
        "border border-slate-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500",
    }[variant];

    return (
      <div className="mb-6">
        {label && (
          <label className="mb-1 block font-bold text-slate-900">{label}</label>
        )}
        <input
          ref={ref}
          className={clsx(baseClasses, variantClasses, className, {
            "border-red-500": error,
          })}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
