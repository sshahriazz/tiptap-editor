import {
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { icons } from "lucide-react";
import { Surface } from "./Surface";
import { cn } from "@nextui-org/react";

export type MenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  customTrigger?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  withPortal?: boolean;
  tooltip?: string;
  isActive?: boolean;
};

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-start"
      offset={8}
    >
      <PopoverTrigger>
        {customTrigger ? (
          trigger
        ) : (
          <Button
            className={triggerClassName}
            //  tooltip={!isOpen ? tooltip : ""}
          >
            {trigger}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="min-w-[15rem] p-2 flex flex-col gap-0.5 max-h-80 overflow-auto z-[9999]">
        <Surface>{children}</Surface>
      </PopoverContent>
    </Popover>
  );
};

export const Item = ({
  label,
  close = true,
  icon,
  iconComponent,
  disabled,
  onClick,
  isActive,
}: {
  label: string | React.ReactNode;
  icon?: keyof typeof icons;
  iconComponent?: React.ReactNode;
  close?: boolean;
  disabled?: boolean;
  onClick: () => void;
  isActive?: boolean;
}) => {
  const className = cn(
    "flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 text-left bg-transparent w-full rounded",
    !isActive && !disabled,
    "hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200",
    isActive &&
      !disabled &&
      "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
    disabled && "text-neutral-400 cursor-not-allowed dark:text-neutral-600"
  );

  const IconComponent = icon ? icons[icon] : null;
  const IconCustomComponent = iconComponent || null;

  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
      variant="flat"
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      {IconCustomComponent}
      {label}
    </Button>
  );
};
