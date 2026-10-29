import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import { Icon } from './Icon';
import styles from './Accordion.module.css';

interface AccordionItem {
  question: string;
  answer: string;
}

/** Single-open accordion with an animated height transition. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-${index}`;
        return (
          <div key={item.question} className={cn(styles.item, open && styles.open)}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              {item.question}
              <Icon name="plus" size={20} strokeWidth={2} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  className={styles.panel}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
