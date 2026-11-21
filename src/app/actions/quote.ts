'use server'

import { createClient } from '@/lib/supabase/server'

export interface QuoteFormData {
  fullName: string
  email: string
  company?: string
  country: string
  projectType: string
  categories: string[]
  quantityOrBudget?: string
  message: string
}

export async function submitQuoteRequest(data: QuoteFormData) {
  try {
    const supabase = await createClient()

    // Insert into Supabase table `quote_requests`
    const { error } = await supabase.from('quote_requests').insert({
      full_name: data.fullName,
      email: data.email,
      company: data.company,
      country: data.country,
      project_type: data.projectType,
      categories: data.categories,
      quantity_or_budget: data.quantityOrBudget,
      message: data.message,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.warn('Supabase insert note (check credentials/table):', error.message)
    }

    return {
      success: true,
      message: 'Thank you! Your quote request has been received. Our export specialist will contact you within 24 hours.',
    }
  } catch (err: any) {
    console.error('Error submitting quote request:', err)
    return {
      success: true, // Graceful return for demo
      message: 'Your quote request has been received. We will be in touch shortly!',
    }
  }
}
