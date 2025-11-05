// This handles the callback from Google after user authorizes
import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode } from '@/lib/google-calendar-oauth';

export async function GET(request: NextRequest) {

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: 'This endpoint is disabled in production.' },
            { status: 403 }
        );
    }

    try {
        const searchParams = request.nextUrl.searchParams;
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
            return NextResponse.json(
                { error: 'Authorization denied', details: error },
                { status: 400 }
            );
        }

        if (!code) {
            return NextResponse.json(
                { error: 'No authorization code received' },
                { status: 400 }
            );
        }

        // Exchange code for tokens
        const tokens = await getTokensFromCode(code);

        // Display the refresh token (you'll save this to .env)
        return NextResponse.json({
            success: true,
            message: 'Authorization successful!',
            instructions: [
                '✅ Copy the refresh_token below',
                '✅ Add it to your .env.local as PORTFOLIO_GOOGLE_REFRESH_TOKEN',
                '✅ Restart your server',
                '⚠️ Keep this token secure - it gives access to your calendar',
            ],
            tokens: {
                refresh_token: tokens.refresh_token,
                access_token: tokens.access_token?.substring(0, 20) + '...', // Show partial for verification
            },
            nextSteps: [
                '1. Copy the refresh_token value',
                '2. Open your .env.local file',
                '3. Add: PORTFOLIO_GOOGLE_REFRESH_TOKEN=your_refresh_token_here',
                '4. Restart your development server',
                '5. Test with /api/test-calendar',
            ],
        });
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        return NextResponse.json(
            { error: 'Failed to exchange authorization code', details: error },
            { status: 500 }
        );
    }
}