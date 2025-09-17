import { z } from 'zod';

// Email configuration validation schema
export const emailConfigSchema = z.object({
  senderName: z.string()
    .min(1, 'Sender name is required')
    .max(100, 'Sender name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s._-]+$/, 'Sender name contains invalid characters'),
  businessAddress: z.string()
    .min(1, 'Business address is required')
    .max(500, 'Business address must be less than 500 characters')
    .refine((val) => !/<script|javascript:|data:|vbscript:/i.test(val), 'Invalid characters detected'),
});

// SMS configuration validation schema
export const smsConfigSchema = z.object({
  fromBrand: z.string()
    .min(1, 'From brand is required')
    .max(50, 'From brand must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s._-]+$/, 'From brand contains invalid characters'),
});

// Input sanitization function
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/data:/gi, '') // Remove data: protocols
    .replace(/vbscript:/gi, '') // Remove vbscript: protocols
    .trim();
};

export type EmailConfig = z.infer<typeof emailConfigSchema>;
export type SmsConfig = z.infer<typeof smsConfigSchema>;