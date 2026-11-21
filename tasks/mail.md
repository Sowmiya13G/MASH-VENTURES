# TASK: Implement Email Enquiry Service — MASH VENTURES

Implement a complete working email enquiry system in my existing Next.js project.

## Technology
- Next.js App Router
- TypeScript
- Resend email API
- Server-side API route

## Required workflow

When a customer fills out the enquiry form and clicks SEND ENQUIRY:

1. Validate all required fields.
2. Send form data to `/api/contact`.
3. The backend validates the submitted information.
4. Use Resend to send an email to the MASH VENTURES company email address.
5. Return a success response only when the email provider accepts the request.
6. Show a premium success notification on the website.
7. Show a clear error message if delivery submission fails.
8. Prevent duplicate submissions while processing.

## Email fields

- Customer full name
- Company name
- Phone number
- Email address
- Event location
- Event date
- Experience type
- Preferred character
- Event duration
- Additional requirements

## Email design

Subject: New MASH VENTURES Website Enquiry

Create a professional HTML email with:
- MASH VENTURES branding
- Customer contact details
- Event information
- Additional requirements
- Submission timestamp
- Reply-to set to the customer's email address

## Security requirements

- Never expose the Resend API key in frontend code.
- Store API keys in environment variables.
- Use a verified sender domain.
- Validate and sanitize user input on the server.
- Add spam protection and rate limiting.
- Do not allow users to specify the recipient email.
- Never expose internal API errors to customers.

## Environment variables

RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

## User experience

- Loading state while sending.
- Disable submit button during submission.
- Success message: "Thank you! Your enquiry has been sent successfully. Our team will contact you soon."
- Failure message: "We couldn't send your enquiry. Please try again."
- Preserve entered details if submission fails.
- Reset form only after successful submission.

## Testing

- Test successful email submission.
- Test invalid email.
- Test missing required fields.
- Test email provider errors.
- Test duplicate submissions.
- Verify that the email actually arrives in the company inbox.

Inspect my existing project first and integrate this into its current form and design. Do not create a disconnected demo form.

Do not mark the task complete until a real email has been successfully received and verified.