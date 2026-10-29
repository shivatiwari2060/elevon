import { motion } from 'framer-motion';
import { SITE } from '@/data/site';
import { useInquiryStore } from '@/store/useInquiryStore';
import { Button } from '@/components/ui/Button';
import styles from './SuccessNotice.module.css';

export function SuccessNotice() {
  const { status, reset } = useInquiryStore();
  const message =
    status === 'mailto'
      ? `Your email app should have opened with your inquiry ready to go. Please press send to complete it. If nothing opened, write to us at ${SITE.email}.`
      : 'We’ve received your inquiry and will reply by email with next steps.';

  return (
    <motion.div
      className={styles.notice}
      role="status"
      tabIndex={-1}
      ref={(element) => element?.focus()}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Thank you.</h2>
      <p>{message}</p>
      <Button variant="secondary" size="sm" onClick={reset}>
        Send another inquiry
      </Button>
    </motion.div>
  );
}
