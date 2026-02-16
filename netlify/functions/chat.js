const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: 'Method not allowed' }) 
        };
    }

    try {
        const { message } = JSON.parse(event.body);
        const apiKey = process.env.AIML_API_KEY; // GANTI NAMA ENV

        const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // PAKAI API KEY BARU
            },
            body: JSON.stringify({
                model: 'mistralai/Mistral-7B-Instruct-v0.3', // MODEL MISTRAL GRATIS
                messages: [{ 
                    role: 'user', 
                    content: message 
                }],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        
        // Cek error dari response
        if (data.error) {
            console.error('AIML API error:', data.error);
            return {
                statusCode: 500,
                body: JSON.stringify({ response: "Maaf, AI lagi error. Coba lagi nanti ya!" })
            };
        }

        const aiResponse = data.choices[0].message.content;

        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ response: aiResponse })
        };
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ response: "Maaf, lagi error. Coba lagi ya!" })
        };
    }
};