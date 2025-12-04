# Trading Dashboard Setup

This document describes how to set up the password-protected trading dashboard at `/trading`.

## Environment Variables

Add these to your Vercel project settings (or `.env.local` for local dev):

### Required

```bash
# Password for accessing the trading dashboard
TRADING_PASSWORD=your-secure-password-here

# OpenAI API key for LLM-based insights
OPENAI_API_KEY=sk-...
```

### Optional

```bash
# OpenAI model to use (default: gpt-4o-mini)
LLM_MODEL=gpt-4o-mini

# CryptoCompare API key for news data (free tier available)
CRYPTOCOMPARE_API_KEY=your-key-here
```

## Features

The trading dashboard provides:

- **Multi-asset support**: BTC, ETH, XRP, SOL
- **Trading profiles**: Intraday, Swing, Position
- **Technical analysis**: EMAs, RSI, MACD, Bollinger Bands
- **Market sentiment**: Fear & Greed Index
- **News integration**: Latest crypto headlines with sentiment
- **LLM insights**: AI-generated analysis and outlook

## API Endpoints

- `GET /api/trading/advisor?symbol=BTC&profile=swing` - Get trading advice
- `POST /api/trading/auth` - Login with password
- `GET /api/trading/auth` - Check authentication
- `DELETE /api/trading/auth` - Logout

## How It Works

1. User visits `/trading` and enters the password
2. Password is validated against `TRADING_PASSWORD` env var
3. On success, an httpOnly cookie is set for 7 days
4. Dashboard fetches data from `/api/trading/advisor`
5. Advisor API calls Binance, CryptoCompare, and OpenAI

## Data Sources

- **Price data**: Binance public API (no key required)
- **Fear & Greed**: Alternative.me (no key required)
- **News**: CryptoCompare (optional key)
- **LLM analysis**: OpenAI (required)

## Security Notes

- The `/trading` route is protected by middleware
- Password is stored in env vars, never in code
- Authentication uses httpOnly cookies (not localStorage)
- API routes check authentication server-side

## Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your API keys to `.env.local`

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000/trading`
