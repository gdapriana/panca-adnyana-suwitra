import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export default function InputText({
	name,
	title,
	placeholder,
	value,
	disabled,
	type,
	className,
}: {
	name: string;
	title: string;
	className?: string;
	placeholder: string;
	disabled?: boolean;
	type?: "email" | "password" | "text" | "tel";
	value: {
		value: string | undefined;
		setValue: Dispatch<SetStateAction<string | undefined>>;
	};
}) {
	return (
		<Label htmlFor={name} className={cn("flex justify-start items-stretch flex-col", className)}>
			<span>{title}</span>
			<Input
				type={type || "text"}
				placeholder={placeholder}
				defaultValue={value.value}
				onChange={(e) => value.setValue(e.target.value)}
				disabled={disabled}
			/>
		</Label>
	);
}
