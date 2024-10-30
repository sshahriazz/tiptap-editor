import * as React from "react";
// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { DotSquareIcon, DownloadIcon } from "lucide-react";

interface ImageActionsProps {
  shouldMerge?: boolean;
  isLink?: boolean;
  onView?: () => void;
  onDownload?: () => void;
  onCopy?: () => void;
  onCopyLink?: () => void;
}

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltip: string;
}

export const ActionWrapper = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "absolute right-3 top-3 flex flex-row rounded px-0.5 opacity-0 group-hover/node-image:opacity-100",
          "border-[0.5px] bg-[var(--mt-bg-secondary)] [backdrop-filter:saturate(1.8)_blur(20px)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  )
);

ActionWrapper.displayName = "ActionWrapper";

export const ActionButton = React.memo(
  React.forwardRef<HTMLButtonElement, ActionButtonProps>(
    ({ icon, tooltip, className, ...props }, ref) => (
      <div>
        <Tooltip content={tooltip}>
          <button
            ref={ref}
            // variant="ghost"
            className={cn(
              "relative flex size-8 flex-row p-1 text-muted-foreground hover:text-foreground",
              " bg-white",
              className
            )}
            {...props}
          >
            <span className="m-auto"> {icon}</span>
          </button>
        </Tooltip>
      </div>
    )
  )
);

ActionButton.displayName = "ActionButton";

type ActionKey = "onView" | "onDownload" | "onCopy";

const ActionItems: Array<{
  key: ActionKey;
  icon: React.ReactNode;
  tooltip: string;
  isLink?: boolean;
}> = [
  {
    key: "onDownload",
    icon: <DownloadIcon className="size-5" />,
    tooltip: "Download image",
  },
  // {
  //   key: "onCopy",
  //   icon: <ClipboardCopyIcon className="size-5" />,
  //   tooltip: "Copy to clipboard",
  // },
  // {
  //   key: "onCopyLink",
  //   icon: <Link2Icon className="size-5" />,
  //   tooltip: "Copy image link",
  //   isLink: true,
  // },
];

export const ImageActions: React.FC<ImageActionsProps> = React.memo(
  ({ shouldMerge = false, isLink = false, ...actions }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleAction = React.useCallback(
      (e: React.MouseEvent, action: (() => void) | undefined) => {
        e.preventDefault();
        e.stopPropagation();
        action?.();
      },
      []
    );

    const filteredActions = React.useMemo(
      () => ActionItems.filter((item) => isLink || !item.isLink),
      [isLink]
    );

    return (
      <ActionWrapper className="bg-white">
        {shouldMerge ? (
          <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <DropdownTrigger>
              <ActionButton
                icon={<DotSquareIcon className="size-4" />}
                tooltip="Open menu"
                onClick={(e) => e.preventDefault()}
              />
            </DropdownTrigger>
            <DropdownMenu className="w-full">
              {filteredActions.map(({ key, icon, tooltip }) => (
                <DropdownItem
                  key={key}
                  onClick={(e) => handleAction(e, actions[key])}
                >
                  <div className="flex flex-row items-center gap-2">
                    <Tooltip content={tooltip}>
                      <span className="p-3"> {icon}</span>
                    </Tooltip>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ) : (
          filteredActions.map(({ key, icon, tooltip }) => (
            <ActionButton
              key={key}
              icon={icon}
              tooltip={tooltip}
              onClick={(e) => handleAction(e, actions[key])}
            />
          ))
        )}
      </ActionWrapper>
    );
  }
);

ImageActions.displayName = "ImageActions";
