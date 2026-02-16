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
        const apiKey = process.env.OPENAI_API_KEY;

        console.log('Using API Key:', apiKey ? 'Exists' : 'Missing'); // buat debug

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
            console.error('OpenAI error:', data);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: "Halo! Gue lagi sibuk nih, tapi lo bisa cek project-project gue yang lain ya! 😊" 
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: data.choices[0].message.content })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: "Halo! Ada yang bisa gue bantu?" 
            })
        };
    }
};