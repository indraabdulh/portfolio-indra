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
        const apiKey = process.env.GEMINI_API_KEY;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Kamu adalah asisten AI ramah. Jawab dengan bahasa Indonesia santai: ${message}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response: aiResponse })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ response: "Maaf, lagi error. Coba lagi ya!" })
        };
    }
};