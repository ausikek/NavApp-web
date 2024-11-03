import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  tailwind?: string;
  hover?: boolean;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconOnClick?: () => void;
}

function IconInput({
  hover,
  icon,
  iconOnClick,
  placeholder,
  tailwind,
  ...props
}: IconInputProps) {
  const Icon = icon;
  return (
    <div className={cn("flex w-full items-center relative", tailwind)}>
      <Icon
        className={`h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 ${
          hover ? "hover:cursor-pointer" : ""
        }`}
        onClick={iconOnClick}
      />
      <Input
        type="text"
        placeholder={placeholder}
        className="pr-8"
        {...props}
      />
    </div>
  );
}

export { IconInput };
