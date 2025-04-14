
# Security Best Practices for Allora AI

## API Keys and Secrets Management

### Supabase Edge Functions
For Supabase Edge Functions, secrets should be configured in the Supabase Dashboard:

1. Go to the Supabase Dashboard
2. Navigate to Settings > API > Edge Functions
3. Add your secrets in the "Environment Variables" section

Required secrets for Allora AI:
- `POSTMARK_API_TOKEN` - For sending emails
- `POSTMARK_FROM_EMAIL` - Default sender email address
- `STRIPE_SECRET_KEY` - For payment processing
- `TWILIO_ACCOUNT_SID` - For SMS and WhatsApp
- `TWILIO_AUTH_TOKEN` - For SMS and WhatsApp authentication
- `OPENAI_API_KEY` - For AI capabilities

### Frontend Environment Variables
For frontend code, configure the following in your hosting environment:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key (this is safe to expose)
- `VITE_STRIPE_PUBLIC_KEY` - Your Stripe publishable key
- `VITE_META_APP_ID` - Your Meta App ID for integration
- `VITE_TIKTOK_APP_ID` - Your TikTok App ID

## Security Checklist

- [x] Remove hardcoded secrets from codebase
- [x] Use environment variables for all sensitive information
- [x] Implement proper masking for displayed API keys in UI
- [x] Ensure Edge Functions use Deno.env.get() for secrets
- [ ] Rotate any potentially compromised API keys
- [ ] Enable Row Level Security in Supabase for all tables
- [ ] Set up proper authentication workflows

## Important Notes

1. **NEVER** commit sensitive information to the repository.
2. The `.env` files should be added to `.gitignore` if used locally.
3. Supabase Edge Functions have a separate environment variable system than your frontend.
4. API keys with `VITE_` prefix in frontend code will be included in the bundle, so only use public keys there.

