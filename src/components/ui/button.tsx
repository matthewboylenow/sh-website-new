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
        default: 'bg-gradient-to-br from-sh-primary to-blue-700 text-white shadow-lg shadow-sh-primary/30 hover:shadow-xl hover:shadow-sh-primary/40 hover:-translate-y-0.5',
        secondary: 'bg-gradient-to-br from-sh-gold to-yellow-500 text-sh-text-main shadow-lg shadow-sh-gold/30 hover:shadow-xl hover:shadow-sh-gold/40 hover:-translate-y-0.5',
        outline: 'border-2 border-sh-border bg-white/80 backdrop-blur-sm text-sh-text-main shadow-sm hover:bg-white hover:border-sh-text-muted hover:shadow-md',
        brandOutline: 'border-2 border-sh-primary bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm text-sh-primary shadow-sm shadow-sh-primary/10 hover:bg-sh-primary/5 hover:shadow-md hover:shadow-sh-primary/20',
        light: 'bg-white text-sh-text-main shadow-lg hover:shadow-xl hover:-translate-y-0.5',
        ghost: 'bg-transparent text-sh-primary hover:bg-sh-primary/10 hover:shadow-sm',
        destructive: 'bg-gradient-to-br from-destructive to-red-700 text-destructive-foreground shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40',
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
