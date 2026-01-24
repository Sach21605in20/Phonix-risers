// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Real-time subscription helpers
export function subscribeToPatientUpdates(
  patientId: string,
  callback: (payload: any) => void
) {
  const supabase = createClient();
  
  return supabase
    .channel(`patient-${patientId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'check_ins',
        filter: `patient_id=eq.${patientId}`
      },
      callback
    )
    .subscribe();
}

export function subscribeToAllCheckIns(callback: (payload: any) => void) {
  const supabase = createClient();
  
  return supabase
    .channel('all-check-ins')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'check_ins'
      },
      callback
    )
    .subscribe();
}