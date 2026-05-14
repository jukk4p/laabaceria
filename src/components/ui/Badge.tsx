import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'outline' | 'muted'
}

export default function Badge({ 
  children, 
  variant = 'gold', 
  className,
  ...props 
}: BadgeProps) {
  const variants = {
    gold: 'bg-gold text-bg-dark border-gold',
    outline: 'bg-transparent border-gold text-gold',
    muted: 'bg-gold-faint border-gold-faint text-text-muted',
  }

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-sm border text-[10px] font-bold uppercase tracking-widest",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
