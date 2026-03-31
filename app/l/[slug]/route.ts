import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const { slug } = params;
    
    const { data, error } = await supabase
        .from('landings')
        .select('html')
        .eq('slug', slug)
        .single();
    
    if (error || !data) {
        return new NextResponse('Not Found', { status: 404 });
    }
    
    return new NextResponse(data.html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8'
        }
    });
}
