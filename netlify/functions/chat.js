const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }) 
        };
    }

    try {
        const { message } = JSON.parse(event.body);
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            console.error('OPENAI_API_KEY not set');
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: "Halo! Gue IndraBot. API key belum disetting nih, tapi lo bisa lihat project-project gue yang keren di atas! 😎" 
                })
            };
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // atau pake 'gpt-4o-mini' kalo mau lebih murah
                messages: [{ 
                    role: 'user', 
                    content: message 
                }],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenAI API error:', data);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: "Halo! Gue lagi sibuk nih, tapi lo bisa cek project-project gue yang lain ya! 😉" 
                })
            };
        }

        const aiResponse = data.choices[0].message.content;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: aiResponse })
        };
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: "Halo! Ada yang bisa gue bantu? (mode offline)" 
            })
        };
    }
};