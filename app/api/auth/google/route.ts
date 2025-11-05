// api/auth/google/route.ts
// This initiates the OAuth flow
import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/lib/google-calendar-oauth';

export async function GET() {

    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json(
            { error: 'This endpoint is disabled in production.' },
            { status: 403 }
        );
    }
    try {
        const authUrl = getAuthUrl();

        // Redirect user to Google's OAuth consent screen
        return NextResponse.redirect(authUrl);
    } catch (error) {
        console.error('Error generating auth URL:', error);
        return NextResponse.json(
            { error: 'Failed to generate authorization URL' },
            { status: 500 }
        );
    }
}
