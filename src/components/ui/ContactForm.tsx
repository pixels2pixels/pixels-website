'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  dict: Dictionary
  locale: Locale
}

interface FormData {
  name: string
  email: string
  company: string
  budget: string
  message: string
  // Honeypot field
  website: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm({ dict, locale }: ContactFormProps) {
  const f = dict.contact.form

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
    website: '', // honeypot
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = locale === 'sr' ? 'Ime je obavezno' : 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = locale === 'sr' ? 'Email je obavezan' : 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'sr' ? 'Unesite validan email' : 'Please enter a valid email'
    }

    if (!formData.message.trim()) {
      newErrors.message = locale === 'sr' ? 'Poruka je obavezna' : 'Message is required'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = locale === 'sr' ? 'Poruka mora imati najmanje 20 karaktera' : 'Message must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (formData.website) return

    if (!validate()) return

    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message,
          locale,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', company: '', budget: '', message: '', website: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (status === 'success') {
    return (
      <div className="glow-border rounded-2xl p-12 bg-brand-dark-3/50 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-blue/20 border-2 border-brand-blue flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl mb-3">
          {locale === 'sr' ? 'Poruka Poslata!' : 'Message Sent!'}
        </h3>
        <p className="text-brand-gray">{f.success}</p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary mt-6"
        >
          {locale === 'sr' ? 'Pošalji Novu Poruku' : 'Send Another Message'}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glow-border rounded-2xl p-8 bg-brand-dark-3/50 space-y-6">
      {/* Honeypot field - hidden from real users */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-brand-gray text-xs font-medium uppercase tracking-wider mb-2">
            {f.name} <span className="text-brand-blue">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder={f.namePlaceholder}
            className={cn(
              'w-full bg-brand-dark-4 border rounded-xl px-4 py-3 text-white placeholder-brand-gray/40 text-sm transition-all duration-200 outline-none',
              errors.name
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-brand-blue/20 focus:border-brand-blue/60 focus:bg-brand-dark-3'
            )}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-brand-gray text-xs font-medium uppercase tracking-wider mb-2">
            {f.email} <span className="text-brand-blue">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={f.emailPlaceholder}
            className={cn(
              'w-full bg-brand-dark-4 border rounded-xl px-4 py-3 text-white placeholder-brand-gray/40 text-sm transition-all duration-200 outline-none',
              errors.email
                ? 'border-red-500/50 focus:border-red-500'
                : 'border-brand-blue/20 focus:border-brand-blue/60 focus:bg-brand-dark-3'
            )}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Company + Budget row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-brand-gray text-xs font-medium uppercase tracking-wider mb-2">
            {f.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder={f.companyPlaceholder}
            className="w-full bg-brand-dark-4 border border-brand-blue/20 rounded-xl px-4 py-3 text-white placeholder-brand-gray/40 text-sm transition-all duration-200 outline-none focus:border-brand-blue/60 focus:bg-brand-dark-3"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-brand-gray text-xs font-medium uppercase tracking-wider mb-2">
            {f.budget}
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-brand-dark-4 border border-brand-blue/20 rounded-xl px-4 py-3 text-white text-sm transition-all duration-200 outline-none focus:border-brand-blue/60 focus:bg-brand-dark-3 appearance-none cursor-pointer"
          >
            {f.budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-brand-dark-3">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-brand-gray text-xs font-medium uppercase tracking-wider mb-2">
          {f.message} <span className="text-brand-blue">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={f.messagePlaceholder}
          rows={6}
          className={cn(
            'w-full bg-brand-dark-4 border rounded-xl px-4 py-3 text-white placeholder-brand-gray/40 text-sm transition-all duration-200 outline-none resize-none',
            errors.message
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-brand-blue/20 focus:border-brand-blue/60 focus:bg-brand-dark-3'
          )}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message}</p>
        )}
        <p className="text-brand-gray/40 text-xs mt-1 text-right">
          {formData.message.length} / 2000
        </p>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {f.error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {f.sending}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {f.submit}
          </>
        )}
      </button>

      <p className="text-brand-gray/40 text-xs text-center">
        {locale === 'sr'
          ? 'Vaši podaci su bezbedni i nikada neće biti deljeni sa trećim stranama.'
          : 'Your data is secure and will never be shared with third parties.'}
      </p>
    </form>
  )
}
