# Email Integration Setup

The website now supports email sending for both the contact form and demo booking form. Follow these steps to configure it:

## 1. Create Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

## 2. Configure SMTP Settings

### Option A: Using Gmail
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password for Mail
4. Add to `.env.local`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="Aurexa Website" <your-email@gmail.com>
```

### Option B: Using Other SMTP Services
Popular alternatives:
- **SendGrid**: smtp.sendgrid.net (port 587)
- **Mailgun**: smtp.mailgun.org (port 587)
- **AWS SES**: email-smtp.region.amazonaws.com (port 587)
- **Outlook**: smtp-mail.outlook.com (port 587)

## 3. Set Email Recipients

Configure where different form submissions should go:
```
SALES_EMAIL=contact@aurexatech.com
SUPPORT_EMAIL=support@aurexatech.com
CAREERS_EMAIL=careers@aurexatech.com
PARTNERSHIP_EMAIL=contact@aurexatech.com
DEMOS_EMAIL=demos@aurexatech.com
```

## 4. Test the Integration

1. Start the development server: `npm run dev`
2. Test the contact form:
   - Go to http://localhost:3000/contact
   - Fill out and submit the form
   - Check that the email arrives at the configured recipient
3. Test the demo booking:
   - Go to http://localhost:3000/book-demo
   - Complete all 3 steps and confirm booking
   - Check that:
     - Customer receives confirmation email
     - Sales team receives notification at demos@aurexatech.com

## Troubleshooting

- **"Failed to send email"**: Check SMTP credentials and host/port
- **Gmail blocks login**: Generate an App Password instead of using your main password
- **Emails go to spam**: Configure SPF/DKIM records for your domain
- **Port 587 blocked**: Try port 465 with `secure: true` in the transporter config

## Production Deployment

For production, it's recommended to use:
- A dedicated transactional email service (SendGrid, Mailgun, AWS SES)
- Environment variables configured in your hosting platform
- Rate limiting to prevent abuse
- Email validation and sanitization

## API Endpoints

### Contact Form (`/api/contact`)
Posts to `/api/contact` which:
1. Validates the request
2. Determines recipient based on query type (Sales, Support, Careers, Partnership)
3. Sends email using nodemailer
4. Returns success/error response with reference number

### Demo Booking (`/api/book-demo`)
Posts to `/api/book-demo` which:
1. Validates booking details
2. Sends confirmation email to the customer with:
   - Booking details (organization, industry, date, time)
   - Reference number
   - Next steps information
3. Sends notification email to the sales team (demos@aurexatech.com) with:
   - Customer contact information
   - Demo requirements
   - Action items for team
4. Returns success/error response
