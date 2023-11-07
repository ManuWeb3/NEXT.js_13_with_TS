// ONLY for demo purpose.
// Real time utility: won't be an end point for sending emails
// user places an order and receives an email notif - Amazon
// POST = create an email instance
import WelcomeTemplate from '@/emails/WelcomeTemplate'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    // input a Payload object here
    const newEmail = await resend.emails.send({
      from: '...',
      to: 'manu.web3.0@gmail.com',
      subject: '...',
      react: <WelcomeTemplate name="Manu Kapoor"></WelcomeTemplate>,
    })
    return NextResponse.json(newEmail)
  } catch (error) {
    // console.log(error)
    return NextResponse.json({ error }) // {error: error}
  }
} // first time, request is Not a parameter here
