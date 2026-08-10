import { z } from 'zod'

export const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message is too long')
})

export const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  productCategory: z.string().min(1, 'Please select a product category'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message is too long')
})