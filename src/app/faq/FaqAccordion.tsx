'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FaqItem } from '@/types/database';

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      {items.map(item => (
        <div
          key={item.id}
          className="border-t border-white/8 last:border-b last:border-white/8"
        >
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-display font-medium text-white text-base leading-snug">{item.question}</span>
            <ChevronDown
              className="w-4 h-4 shrink-0 text-white/40 transition-transform duration-300"
              style={{ transform: open === item.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-5 text-white/55 text-[0.9375rem] leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
