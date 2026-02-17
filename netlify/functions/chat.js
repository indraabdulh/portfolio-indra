const fetch = require('node-fetch');

exports.handler = async function(event, context) {
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
        const apiKey = process.env.GEMINI_API_KEY;

        // PAKAI GEMINI PRO (YANG PASTI SUPPORT)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: `Halo! Ada yang bisa gue bantu? (mode santai 😎)` 
                })
            };
        }

        const aiResponse = data.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: aiResponse })
        };

    } catch (error) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: "Halo! Ada yang bisa gue bantu?" 
            })
        };
    }
};