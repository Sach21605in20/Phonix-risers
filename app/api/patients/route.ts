// app/api/patients/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Get user from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get patients based on user role
    let query = supabase
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
        )
      `)
      .order('created_at', { ascending: false });

    if (user.role === 'coordinator') {
      query = query.eq('coordinator_id', user.id);
    } else if (user.role === 'patient') {
      query = query.eq('user_id', user.id);
    }

    const { data: patients, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Sort check-ins by date
    const patientsWithSortedCheckIns = patients?.map(patient => ({
      ...patient,
      check_ins: patient.check_ins?.sort((a: any, b: any) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ) || []
    }));

    return NextResponse.json({ patients: patientsWithSortedCheckIns });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Get coordinator user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (userError || !user || user.role !== 'coordinator') {
      return NextResponse.json(
        { error: 'Only coordinators can add patients' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, age, procedure, phone, discharge_date } = body;

    // Validate required fields
    if (!name || !procedure || !discharge_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert patient
    const { data: patient, error } = await supabase
      .from('patients')
      .insert({
        name,
        age: age ? parseInt(age) : null,
        procedure,
        phone,
        discharge_date,
        coordinator_id: user.id
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ patient }, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}