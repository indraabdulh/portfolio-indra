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

    try {
        const { message } = JSON.parse(event.body);
        const apiKey = process.env.OPENAI_API_KEY;

        // TEST PAKAI MODEL YANG PALING BASIC
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Kamu adalah asisten ramah' },
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();

        // Kalo error, tampilin detailnya
        if (!response.ok) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: `Error: ${data.error?.message || 'Unknown'}` 
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: data.choices[0].message.content })
        };

    } catch (error) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: `Error: ${error.message}` 
            })
        };
    }
};