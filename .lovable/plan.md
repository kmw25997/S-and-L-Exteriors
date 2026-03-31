

## Fix: Deploy Edge Functions for Quote Email Notifications

### Problem
The quote form submission flow is fully coded but the edge functions appear to not be deployed — no logs exist for any of the email-related functions. This means form submissions may save to the database but email notifications are never sent.

### What's Already Working (No Code Changes Needed)
- **QuoteForm** correctly calls `submit-quote` edge function with all form data
- **submit-quote** validates input, saves to DB, then calls `send-transactional-email` with template data (name, phone, email, service, message)
- **new-quote-notification** template renders all form fields and sends to `kmw25997@gmail.com`
- **send-transactional-email** handles suppression checks, unsubscribe tokens, and enqueues to the email queue
- **process-email-queue** dispatches queued emails

### Plan
1. **Deploy all email-related edge functions**: `submit-quote`, `send-transactional-email`, `process-email-queue`, `handle-email-unsubscribe`, `handle-email-suppression`
2. **Test** by submitting a quote through the form to confirm the email arrives at `kmw25997@gmail.com`

### Technical Details
- Single deployment step — no code changes required
- All 5 functions will be deployed in one batch

