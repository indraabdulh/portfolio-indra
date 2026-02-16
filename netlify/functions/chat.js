const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method not allowed' };
    }

    try {
        const { message } = JSON.parse(event.body);
        const apiKey = process.env.SID_API_KEY;

        const response = await fetch('https://api.s.id/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ 
                    role: 'user', 
                    content: message 
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('S.ID API error:', data);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: "Halo! Ada yang bisa gue bantu? (mode santai 😎)" 
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: data.choices[0].message.content })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: "Halo! Ada yang bisa gue bantu? (maap lagi sibuk bentar)" 
            })
        };
    }
};