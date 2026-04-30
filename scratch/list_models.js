const https = require('https');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const keyMatch = envFile.match(/NEXT_PUBLIC_GEMINI_API_KEY=([^\r\n]+)/);
const key = keyMatch ? keyMatch[1] : null;

if (!key) {
    console.log("No API key found in .env.local");
    process.exit(1);
}

https.get('https://generativelanguage.googleapis.com/v1beta/models?key=' + key, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
        try {
            const data = JSON.parse(d);
            if (data.models) {
                console.log("Available models:");
                console.log(data.models.map(m => m.name).join('\n'));
            } else {
                console.log("Error or no models:", data);
            }
        } catch (e) {
            console.log("Failed to parse response:", d);
        }
    });
}).on('error', e => {
    console.error("Request failed:", e);
});
