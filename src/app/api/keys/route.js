import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateApiKey } from '@/lib/utils'

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('api_keys')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json(
                { error: 'Failed to fetch API keys' },
                { status: 500 }
            );
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching API keys:', error);
        return NextResponse.json(
            { error: 'Failed to fetch API keys' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { name } = await request.json();
        
        const apiKeyValue = generateApiKey();

        const { data, error } = await supabase
            .from('api_keys')
            .insert([{ 
                name,
                value: apiKeyValue
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error creating API key:', error);
        return NextResponse.json(
            { error: 'Failed to create API key' },
            { status: 500 }
        );
    }
}
