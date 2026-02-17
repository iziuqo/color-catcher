import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers to allow requests from Figma (null origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { message, email } = req.body;
    const formspreeId = process.env.FORMSPREE_ID;

    if (!formspreeId) {
        res.status(500).json({ error: 'Server misconfiguration: Missing Formspree ID' });
        return;
    }

    if (!message) {
        res.status(400).json({ error: 'Message is required' });
        return;
    }

    try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ message, email })
        });

        if (response.ok) {
            res.status(200).json({ success: true });
        } else {
            const errorData = await response.json();
            res.status(response.status).json({ error: 'Failed to send feedback', details: errorData });
        }
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
