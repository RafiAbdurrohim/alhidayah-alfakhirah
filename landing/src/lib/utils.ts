import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in SAR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as: +966 XX XXX XXXX
  if (cleaned.startsWith('966')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Get app store download links
 */
export const APP_STORES = {
  googlePlay: 'https://play.google.com/store/apps/details?id=com.alhidayah.customer',
  appStore: 'https://apps.apple.com/app/alhidayah-alfakhirah/id123456789',
} as const;

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/alhidayah',
  facebook: 'https://facebook.com/alhidayah',
  whatsapp: 'https://wa.me/966XXXXXXXXX',
  twitter: 'https://twitter.com/alhidayah',
} as const;

/**
 * Contact information
 */
export const CONTACT_INFO = {
  phone: '+966 XX XXX XXXX',
  email: 'info@alhidayahalfakhirah.com',
  address: 'Makkah, Saudi Arabia',
  hours: {
    en: 'Daily: 10:00 AM - 11:00 PM',
    ar: 'يومياً: 10:00 صباحاً - 11:00 مساءً',
  },
} as const;
