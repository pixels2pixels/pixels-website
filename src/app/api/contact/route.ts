import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string
  email: string
  company?: string
  budget?: string
  message: string
  locale: string
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validatePayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return (
    typeof d.name === 'string' && d.name.trim().length > 0 &&
    typeof d.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.message === 'string' && d.message.trim().length >= 20
  )
}

// ─── Rate limiting (simple in-memory, use Redis in production) ────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }) // 1 minute window
    return true
  }

  if (entry.count >= 3) return false // max 3 requests per minute

  entry.count++
  return true
}

// ─── AWS SES Integration (stub) ───────────────────────────────────────────────
// To enable: npm install @aws-sdk/client-ses
// Set env vars: AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SES_FROM_EMAIL, SES_TO_EMAIL

async function sendEmailViaSES(payload: ContactPayload): Promise<void> {
  // Uncomment and configure when AWS SES is set up:
  /*
  const { SESClient, SendEmailCommand } = await import('@aws-sdk/client-ses')
  
  const client = new SESClient({
    region: process.env.AWS_REGION || 'eu-central-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  })

  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL || 'noreply@pixels2pixels.com',
    Destination: {
      ToAddresses: [process.env.SES_TO_EMAIL || 'hello@pixels2pixels.com'],
    },
    Message: {
      Subject: {
        Data: `New Contact Form Submission from ${payload.name}`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `
Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company || 'N/A'}
Budget: ${payload.budget || 'Not specified'}
Language: ${payload.locale}

Message:
${payload.message}
          `.trim(),
          Charset: 'UTF-8',
        },
        Html: {
          Data: `
<h2>New Contact Form Submission</h2>
<table>
  <tr><td><strong>Name:</strong></td><td>${payload.name}</td></tr>
  <tr><td><strong>Email:</strong></td><td><a href="mailto:${payload.email}">${payload.email}</a></td></tr>
  <tr><td><strong>Company:</strong></td><td>${payload.company || 'N/A'}</td></tr>
  <tr><td><strong>Budget:</strong></td><td>${payload.budget || 'Not specified'}</td></tr>
  <tr><td><strong>Language:</strong></td><td>${payload.locale}</td></tr>
</table>
<h3>Message:</h3>
<p>${payload.message.replace(/\n/g, '<br>')}</p>
          `.trim(),
          Charset: 'UTF-8',
        },
      },
    },
  })

  await client.send(command)
  */

  // For now, log to console (replace with actual email sending)
  console.log('[Contact Form Submission]', {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    budget: payload.budget,
    locale: payload.locale,
    messageLength: payload.message.length,
    timestamp: new Date().toISOString(),
  })
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                request.headers.get('x-real-ip') || 
                'unknown'

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    // Validate
    if (!validatePayload(body)) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check all required fields.' },
        { status: 400 }
      )
    }

    // Send email
    await sendEmailViaSES(body)

    return NextResponse.json(
      { success: true, message: 'Message received. We will be in touch shortly.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Contact API Error]', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Contact API is running' })
}
