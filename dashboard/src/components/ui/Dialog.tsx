'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Content */}
      <div className="relative z-50 w-full max-w-lg mx-4">
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-lg overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export function DialogHeader({ className, children, onClose, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-6 border-b',
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="ml-4"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <h2
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}

interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      className={cn('p-6', className)}
      {...props}
    />
  );
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 p-6 border-t bg-gray-50',
        className
      )}
      {...props}
    />
  );
}
