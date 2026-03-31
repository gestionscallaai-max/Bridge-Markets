import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const DB_PATH = path.join(process.cwd(), 'lib', 'db', 'landings.json');
    if (!fs.existsSync(DB_PATH)) {
        return new NextResponse('Not Found', { status: 404 });
    }
    
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const entry = db[params.slug];
    
    if (!entry) {
        return new NextResponse('Not Found', { status: 404 });
    }
    
    return new NextResponse(entry.html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    });
}
