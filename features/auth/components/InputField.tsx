  "use client";
  import { useState, ReactNode } from "react";
  import { Eye, EyeOff } from "lucide-react";

  interface Props {
    id: string
    label: string;
    value: string;
    onChange: (value: string) => void;
    icon: ReactNode;
    autoComplete: string
    type?: "text" | "email" | "password";
    placeholder?: string;
    required?: boolean;
  }

  export default function InputField({
    id,label, type = "text", placeholder, value,
    onChange, icon, required, autoComplete
  }: Props) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div>
        <label htmlFor={id} className="block text-xs font-semibold tracking-widest text-foreground uppercase mb-2">
          {label}
        </label>

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>

          <input
            autoComplete={autoComplete}
            id={id}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-11 pr-11 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required={required}
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
      </div>
    );
  }