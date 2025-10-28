import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Generate random 8-character password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Store the password in database with expiration (5 minutes)
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Delete any existing OTP
    await supabase
      .from('admin_otp')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')

    // Insert new OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes from now
    await supabase
      .from('admin_otp')
      .insert({
        password: password,
        expires_at: expiresAt,
        used: false
      })

    // Send email using Resend API (you'll need to set up Resend)
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'admin@moshimoshinippon.com',
        to: ['methullakvindu5@gmail.com'],
        subject: 'Admin Access - One Time Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Moshi Moshi Nippon - Admin Access</h2>
            <p>Your one-time password for admin access:</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #dc2626; font-size: 32px; margin: 0; letter-spacing: 2px;">${password}</h1>
            </div>
            <p><strong>Important:</strong></p>
            <ul>
              <li>This password expires in 5 minutes</li>
              <li>It can only be used once</li>
              <li>Do not share this password with anyone</li>
            </ul>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `
      })
    })

    if (!emailResponse.ok) {
      throw new Error('Failed to send email')
    }

    return new Response(
      JSON.stringify({ success: true, message: 'OTP sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})