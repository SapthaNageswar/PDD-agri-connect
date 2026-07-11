import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
// Button
export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-agri-700 text-white hover:bg-agri-800 shadow-sm',
      secondary: 'bg-harvest-500 text-white hover:bg-harvest-600 shadow-sm',
      outline: 'border-2 border-agri-700 text-agri-700 hover:bg-agri-50',
      ghost: 'text-earth-600 hover:bg-earth-100 hover:text-earth-900',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
    };
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 text-base'
    };
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agri-500 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props} />);


  }
);
Button.displayName = 'Button';
// Card
export const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) =>
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-earth-200 bg-white text-earth-900 shadow-sm',
      className
    )}
    {...props} />

);
Card.displayName = 'Card';
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) =>
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props} />

);
CardHeader.displayName = 'CardHeader';
export const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) =>
  <h3
    ref={ref}
    className={cn(
      'font-heading text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props} />

);
CardTitle.displayName = 'CardTitle';
export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) =>
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';
// Input
export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-earth-300 bg-white px-3 py-2 text-sm placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-agri-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props} />);


  });
Input.displayName = 'Input';
// Badge
export const Badge = ({
  className,
  variant = 'default',
  ...props


}: React.HTMLAttributes<HTMLDivElement> & {variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';}) => {
  const variants = {
    default: 'bg-earth-100 text-earth-800',
    success: 'bg-agri-100 text-agri-800',
    warning: 'bg-harvest-100 text-harvest-800',
    danger: 'bg-red-100 text-red-800',
    outline: 'text-earth-800 border border-earth-200'
  };
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props} />);


};
// Tabs
export const Tabs = ({
  tabs,
  activeTab,
  onChange







}: {tabs: {id: string;label: string;}[];activeTab: string;onChange: (id: string) => void;}) => {
  return (
    <div className="flex space-x-1 rounded-xl bg-earth-100 p-1">
      {tabs.map((tab) =>
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={cn(
          'relative w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors',
          activeTab === tab.id ?
          'text-agri-900' :
          'text-earth-600 hover:bg-white/50 hover:text-earth-900'
        )}>
        
          {activeTab === tab.id &&
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-lg bg-white shadow-sm"
          initial={false}
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6
          }} />

        }
          <span className="relative z-10">{tab.label}</span>
        </button>
      )}
    </div>);

};