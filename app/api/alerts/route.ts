// app/api/check-ins/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/server';
import { analyzeRisk } from '@/lib/risk-analyzer';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();
    const body = await request.json();

    const {
      patient_id,
      pain_level,
      temperature,
      mobility,
      symptoms = [],
      notes = ''
    } = body;

    // Validate required fields
    if (!patient_id || pain_level === undefined || !temperature || !mobility) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get previous check-ins for trend analysis
    const { data: previousCheckIns } = await supabase
      .from('check_ins')
      .select('*')
      .eq('patient_id', patient_id)
      .order('created_at', { ascending: true });

    // Analyze risk using AI
    const riskAnalysis = analyzeRisk(
      {
        pain_level: parseInt(pain_level),
        temperature: parseFloat(temperature),
        mobility,
        symptoms
      },
      previousCheckIns || []
    );

    // Insert check-in with risk analysis
    const { data: checkIn, error: checkInError } = await supabase
      .from('check_ins')
      .insert({
        patient_id,
        pain_level: parseInt(pain_level),
        temperature: parseFloat(temperature),
        mobility,
        symptoms,
        notes,
        risk_level: riskAnalysis.riskLevel
      })
      .select()
      .single();

    if (checkInError) {
      return NextResponse.json(
        { error: checkInError.message },
        { status: 500 }
      );
    }

    // Create alerts if risk detected
    if (riskAnalysis.alerts.length > 0) {
      const alertsToInsert = riskAnalysis.alerts.map(message => ({
        patient_id,
        check_in_id: checkIn.id,
        alert_type: 'risk_detected',
        message,
        severity: riskAnalysis.riskLevel === 'high' ? 'critical' : 'warning'
      }));

      const { error: alertsError } = await supabase
        .from('alerts')
        .insert(alertsToInsert);

      if (alertsError) {
        console.error('Error creating alerts:', alertsError);
      }
    }

    return NextResponse.json({
      checkIn,
      riskAnalysis: {
        level: riskAnalysis.riskLevel,
        score: riskAnalysis.score,
        alerts: riskAnalysis.alerts
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating check-in:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patient_id');

    if (!patientId) {
      return NextResponse.json(
        { error: 'patient_id is required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data: checkIns, error } = await supabase
      .from('check_ins')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ checkIns });
  } catch (error) {
    console.error('Error fetching check-ins:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}