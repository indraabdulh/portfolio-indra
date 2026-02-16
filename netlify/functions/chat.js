const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Logging untuk debugging
    console.log('Function triggered');
    console.log('Method:', event.httpMethod);
    
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: 'Method not allowed' }) 
        };
    }

    try {
        const { message } = JSON.parse(event.body);
        console.log('Message received:', message);
        
        // Cek API Key
        const apiKey = process.env.AIML_API_KEY;
        console.log('API Key exists:', !!apiKey);
        
        if (!apiKey) {
            console.error('AIML_API_KEY not set');
            return {
                statusCode: 500,
                body: JSON.stringify({ response: "API Key tidak ditemukan" })
            };
        }

        console.log('Calling AIML API...');
        const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'mistralai/Mistral-7B-Instruct-v0.3',
                messages: [{ 
                    role: 'user', 
                    content: message 
                }],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        console.log('AIML API response status:', response.status);
        const data = await response.json();
        console.log('AIML API response data:', data);
        
        if (data.error) {
            console.error('AIML API error:', data.error);
            return {
                statusCode: 500,
                body: JSON.stringify({ response: `AIML Error: ${data.error.message || 'Unknown'}` })
            };
        }

        const aiResponse = data.choices[0].message.content;
        console.log('AI Response:', aiResponse);

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
            body: JSON.stringify({ response: `Error: ${error.message}` })
        };
    }
};