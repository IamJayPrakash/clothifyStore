import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../lib/utils';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: 'left' | 'right';
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ open, onOpenChange, side = 'left', title, children }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className={cn(
          'fixed top-0 z-50 h-full w-80 max-w-full bg-white shadow-lg transition-transform',
          side === 'left' ? 'left-0 -translate-x-full data-[state=open]:translate-x-0' : 'right-0 translate-x-full data-[state=open]:translate-x-0'
        )}>
          {title && <Dialog.Title className="text-lg font-bold p-4 border-b">{title}</Dialog.Title>}
          <div className="p-4">{children}</div>
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl">&times;</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 