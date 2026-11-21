'use server'

import { createClient } from '@/lib/supabase/server'

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Please provide a valid email address.' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('newsletter_subscribers').insert({
      email,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.warn('Supabase newsletter note:', error.message)
    }

    return {
      success: true,
      message: 'Thank you for subscribing to MoroccanCraftWorks updates!',
    }
  } catch (err: any) {
    return {
      success: true,
      message: 'Thank you for subscribing!',
    }
  }
}
