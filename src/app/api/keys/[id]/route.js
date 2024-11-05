import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(request, { params }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json(
                { error: 'Invalid API key ID' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('api_keys')
            .update({ name })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to update API key' },
                { status: 500 }
            );
        }

        if (!data) {
            return NextResponse.json(
                { error: 'API key not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error in PATCH handler:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json(
                { error: 'Invalid API key ID' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('api_keys')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json(
                { error: 'Failed to delete API key' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE handler:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
