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

        // Cek API Key
        if (!apiKey) {
            console.error('API Key missing');
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: "Halo! API key belum disetting nih. Tapi lo bisa lihat project-project gue yang keren di atas! 😎" 
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
                model: 'gpt-3.5-turbo',
                messages: [{ 
                    role: 'user', 
                    content: message 
                }],
                temperature: 0.7,
                max_tokens: 300
            })
        });

        const data = await response.json();

        // Log response buat debugging
        console.log('OpenAI response status:', response.status);
        console.log('OpenAI response data:', JSON.stringify(data).substring(0, 200));

        if (!response.ok) {
            console.error('OpenAI error details:', data);
            
            // Kirim error detail ke response
            let errorMsg = "Halo! Gue lagi sibuk nih, tapi lo bisa cek project-project gue yang lain ya! 😊";
            
            if (data.error && data.error.message) {
                console.log('Specific error:', data.error.message);
                // Bisa tambahin error message kalo mau tau detail
            }
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ response: errorMsg })
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
                response: "Halo! Ada yang bisa gue bantu? (maaf lagi error)" 
            })
        };
    }
};