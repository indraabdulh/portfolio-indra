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
            console.error('❌ OPENAI_API_KEY not set');
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    response: "🔑 API key belum disetting. Hubungi admin!" 
                })
            };
        }

        console.log('✅ API Key exists, calling OpenAI...');

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
        console.log('📡 OpenAI response status:', response.status);

        if (!response.ok) {
            console.error('❌ OpenAI error:', data);
            
            let errorDetail = "Gue lagi error nih. Coba lagi nanti ya!";
            if (data.error) {
                errorDetail = `Error: ${data.error.message || 'Unknown'}`;
            }
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ response: errorDetail })
            };
        }

        const aiResponse = data.choices[0].message.content;
        console.log('✅ Response received');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: aiResponse })
        };

    } catch (error) {
        console.error('💥 Function error:', error);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                response: "⚠️ Error teknis. Coba lagi ya!" 
            })
        };
    }
};