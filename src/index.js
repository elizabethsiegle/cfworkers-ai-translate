import html from '../static/webpage.html';

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === 'GET' && url.pathname === '/') {
            return new Response(html, {
                headers: { 'Content-Type': 'text/html' },
            });
        } else if (request.method === 'POST' && url.pathname === '/translate') {
            const { text, targetLang } = await request.json();
            const input = {
                "text": text,
                "source_lang": "english",
                "target_lang": targetLang
            };
            const response = await env.AI.run(
                "@cf/meta/m2m100-1.2b",
                input
              );
            console.log(JSON.stringify(response));
            return new Response(JSON.stringify(response["translated_text"]), {
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response('Not found', { status: 404 });
    }
}

