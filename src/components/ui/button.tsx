import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-5 py-2',
        icon: 'h-10 w-10',
        lg: 'h-12 rounded-xl px-8 text-base',
        sm: 'h-9 rounded-md px-4 text-xs',
      },
      variant: {
        default: 'bg-sh-primary text-white shadow-sm hover:shadow-md hover:bg-sh-primary/90',
        secondary: 'bg-sh-gold text-sh-text-main shadow-sm hover:shadow-md hover:bg-sh-gold/90',
        outline: 'border-2 border-sh-border bg-white text-sh-text-main shadow-sm hover:bg-sh-surface hover:border-sh-text-muted',
        brandOutline: 'border-2 border-sh-primary bg-white text-sh-primary shadow-sm hover:bg-sh-primary/5',
        light: 'bg-white text-sh-text-main shadow-sm hover:shadow-md hover:bg-sh-bg-light',
        ghost: 'bg-transparent text-sh-primary hover:bg-sh-primary/10',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:shadow-md hover:bg-destructive/90',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
