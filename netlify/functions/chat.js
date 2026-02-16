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
        
        // Response sederhana dulu buat testing
        const responses = [
            "Halo! Ada yang bisa gue bantu? 😎",
            "Wah menarik! Ceritain lebih lanjut dong!",
            "Gue denger nih, lanjut!",
            "Iya nih, gue setuju banget!",
            "Hmm gitu ya? Terus gimana?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ response: randomResponse })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ response: "Maaf, lagi error. Coba lagi ya!" })
        };
    }
};