import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition duration-normal",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:brightness-110",
        secondary: "bg-surface-alt text-foreground hover:bg-surface",
        danger: "bg-danger text-white hover:brightness-110",
        ghost: "bg-transparent text-foreground hover:bg-surface-alt",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
        icon: "h-11 w-11 p-0 rounded-full text-2xl",
        ctaIcon: "h-10 w-10 p-0 rounded-full text-[1.4rem] leading-none",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        size: "lg",
        className: "shadow-card",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ asChild, className, variant, size, disabled, ...props }: Props) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
}
