import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface Props {
  label: string;
  placeholder?: string;
  icon: any;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange: (value: any) => void;
  isRequired?: boolean;
  className?: string
}
const InputField = ({
  icon,
  label,
  onChange,
  placeholder = "",
  type = "text",
  value,
  isRequired = false,
  className = "pl-10 h-11"
}: Props) => {
  const Icon = icon;
  return (
    <div className="space-y-2">
      <Label htmlFor="name" className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Icon className="icon-style" />
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={isRequired}
          className={className}
          accept={type === "file" ? "application/pdf" : undefined}
        />
      </div>
    </div>
  );
};

export default InputField;
