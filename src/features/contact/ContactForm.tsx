import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '@/data/site';
import { useInquiryStore } from '@/store/useInquiryStore';
import { Button } from '@/components/ui/Button';
import { Field, FieldError } from './Field';
import { BUDGET_OPTIONS, SERVICE_OPTIONS, TIMELINE_OPTIONS } from './options';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const { values, errors, status, setField, blurField, toggleService, submit } = useInquiryStore();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const invalid = await submit();
    if (invalid) document.getElementById(invalid)?.focus();
  };

  const describe = (field: keyof typeof errors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      {status === 'error' && (
        <div className={styles.alert} role="alert">
          Sorry, we couldn’t send your inquiry. Please try again, or email us directly at{' '}
          {SITE.email}.
        </div>
      )}

      <div className={styles.row}>
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            className={styles.input}
            autoComplete="name"
            value={values.name}
            aria-invalid={!!errors.name}
            aria-describedby={describe('name')}
            onChange={(event) => setField('name', event.target.value)}
            onBlur={() => blurField('name')}
          />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            type="email"
            className={styles.input}
            autoComplete="email"
            value={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={describe('email')}
            onChange={(event) => setField('email', event.target.value)}
            onBlur={() => blurField('email')}
          />
        </Field>
      </div>

      <Field id="company" label="Company" optional>
        <input
          id="company"
          className={styles.input}
          autoComplete="organization"
          value={values.company}
          onChange={(event) => setField('company', event.target.value)}
        />
      </Field>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Services of interest</legend>
        <div className={styles.chips}>
          {SERVICE_OPTIONS.map((option) => (
            <label key={option} className={styles.chip}>
              <input
                type="checkbox"
                checked={values.services.includes(option)}
                onChange={() => toggleService(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <Field id="budget" label="Budget range" optional>
          <select
            id="budget"
            className={styles.input}
            value={values.budget}
            onChange={(event) => setField('budget', event.target.value)}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field id="timeline" label="Expected timeline" optional>
          <select
            id="timeline"
            className={styles.input}
            value={values.timeline}
            onChange={(event) => setField('timeline', event.target.value)}
          >
            <option value="">Flexible</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Project description" required error={errors.message}>
        <textarea
          id="message"
          className={styles.input}
          rows={6}
          value={values.message}
          aria-invalid={!!errors.message}
          aria-describedby={describe('message')}
          onChange={(event) => setField('message', event.target.value)}
          onBlur={() => blurField('message')}
        />
      </Field>

      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setField('website', event.target.value)}
          />
        </label>
      </div>

      <div>
        <label className={styles.consent}>
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            aria-invalid={!!errors.consent}
            aria-describedby={describe('consent')}
            onChange={(event) => setField('consent', event.target.checked)}
          />
          <span>
            I agree to Elevon using these details to respond to my inquiry, as described in the{' '}
            <Link to="/privacy">Privacy Notice</Link>.
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <div>
        <Button type="submit" arrow={status !== 'sending'} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
        </Button>
      </div>
    </form>
  );
}
