// app/api/patients/[id]/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !user || user.role !== 'coordinator') {
      return NextResponse.json(
        { error: 'Only coordinators can delete patients' },
        { status: 403 }
      );
    }

    // Delete patient (cascade will delete check-ins and alerts)
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', params.id)
      .eq('coordinator_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    const { data: patient, error } = await supabase
      .from('patients')
      .select(`
        *,
        check_ins (
          id,
          pain_level,
          temperature,
          mobility,
          symptoms,
          notes,
          risk_level,
          created_at
        ),
        alerts (
          id,
          message,
          severity,
          acknowledged,
          created_at
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ patient });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}