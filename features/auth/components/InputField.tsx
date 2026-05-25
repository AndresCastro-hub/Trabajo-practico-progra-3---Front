"use client";
import { useState, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IInputField {
  id: string
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  autoComplete: string
  type: "text" | "email" | "password";
  placeholder?: string;
  error: string | null
  validate: (value?: string) => void;
}

export default function InputField({
  id, label, type = "text", placeholder, value,
  onChange, icon, autoComplete, error, validate
}: IInputField) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold tracking-widest text-foreground uppercase mb-2">
        {label}
      </label>

      <div className="relative flex items-center" >

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>

        <input
          onBlur={() => validate()}
          autoComplete={autoComplete}
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const value = e.target.value
            onChange(value)
            if(error){
              validate(value)
            }
          }}
          className={`w-full pl-11 pr-11 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 transition
          ${error
              ? "border-red-500 focus:ring-red-500"
              : "border-border focus:ring-primary"
            }`}
        />

        {isPassword && (
          <button
            aria-label="ver contraseña"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}

      </div>

      {error && (
        <p className="text-red-500 mt-0.5 pl-1 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}