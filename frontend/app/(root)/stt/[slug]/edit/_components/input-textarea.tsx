import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export default function InputTextArea({
  name,
  title,
  placeholder,
  value,
  disabled,
  className,
}: {
  name: string;
  title: string;
  className?: string;
  placeholder: string;
  disabled?: boolean;
  value: {
    value: string | undefined;
    setValue: Dispatch<SetStateAction<string | undefined>>;
  };
}) {
  return (
    <Label
      htmlFor={name}
      className={cn("flex justify-start items-stretch flex-col", className)}
    >
      <span>{title}</span>
      <Textarea
        placeholder={placeholder}
        className="flex-1"
        defaultValue={value.value}
        onChange={(e) => value.setValue(e.target.value)}
        disabled={disabled}
      />
    </Label>
  );
}
