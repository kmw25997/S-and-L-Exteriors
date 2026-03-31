import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "S&L Exteriors"

interface NewQuoteNotificationProps {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
}

const serviceLabels: Record<string, string> = {
  'roofing': 'Roofing',
  'siding': 'Siding',
  'gutters': 'Gutters',
  'exterior-painting': 'Exterior Painting',
  'interior-painting': 'Interior Painting',
}

const NewQuoteNotificationEmail = ({ name, phone, email, service, message }: NewQuoteNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New quote request from {name || 'a customer'} for {service ? (serviceLabels[service] || service) : 'a service'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Quote Request</Heading>
        <Text style={subheading}>A potential customer has submitted a free estimate request on your website.</Text>
        <Hr style={hr} />
        <Section style={detailsSection}>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || 'Not provided'}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || 'Not provided'}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || 'Not provided'}</Text>
          <Text style={label}>Service</Text>
          <Text style={value}>{service ? (serviceLabels[service] || service) : 'Not specified'}</Text>
          {message ? (
            <>
              <Text style={label}>Message</Text>
              <Text style={value}>{message}</Text>
            </>
          ) : null}
        </Section>
        <Hr style={hr} />
        <Text style={footer}>This notification was sent from your {SITE_NAME} website.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewQuoteNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New Quote: ${data.name || 'Customer'} — ${data.service ? (serviceLabels[data.service] || data.service) : 'Service Request'}`,
  displayName: 'New quote notification',
  previewData: {
    name: 'John Smith',
    phone: '(630) 555-1234',
    email: 'john@example.com',
    service: 'roofing',
    message: 'Looking to replace my roof after storm damage. About 2,000 sq ft ranch.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'DM Sans', Arial, sans-serif" }
const container = { padding: '30px 25px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#1e3a5f', margin: '0 0 8px' }
const subheading = { fontSize: '14px', color: '#6b7280', margin: '0 0 24px', lineHeight: '1.5' }
const hr = { borderColor: '#e5e7eb', margin: '0 0 24px' }
const detailsSection = { margin: '0 0 24px' }
const label = { fontSize: '12px', fontWeight: '600' as const, color: '#6b7280', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '0 0 2px' }
const value = { fontSize: '16px', color: '#1f2937', margin: '0 0 16px', lineHeight: '1.4' }
const footer = { fontSize: '12px', color: '#9ca3af', margin: '0' }
