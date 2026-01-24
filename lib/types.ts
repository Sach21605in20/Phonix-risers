// lib/types.ts

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  name: string | null;
  role: 'coordinator' | 'patient' | 'admin';
  created_at: string;
}

export interface Patient {
  id: string;
  user_id: string | null;
  coordinator_id: string | null;
  name: string;
  age: number | null;
  procedure: string;
  phone: string | null;
  discharge_date: string;
  created_at: string;
  updated_at: string;
}

export interface CheckIn {
  id: string;
  patient_id: string;
  pain_level: number;
  temperature: number;
  mobility: 'very_limited' | 'limited' | 'moderate' | 'good';
  symptoms: string[];
  notes: string | null;
  risk_level: 'normal' | 'warning' | 'high';
  created_at: string;
}

export interface Alert {
  id: string;
  patient_id: string;
  check_in_id: string;
  alert_type: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  acknowledged: boolean;
  created_at: string;
}

export interface PatientWithCheckIns extends Patient {
  check_ins: CheckIn[];
  alerts?: Alert[];
  lastCheckIn?: string;
  riskLevel?: 'normal' | 'warning' | 'high';
}

export interface RiskAnalysis {
  riskLevel: 'normal' | 'warning' | 'high';
  alerts: string[];
  score: number;
}

export interface CheckInFormData {
  patient_id: string;
  pain_level: number;
  temperature: number;
  mobility: 'very_limited' | 'limited' | 'moderate' | 'good';
  symptoms: string[];
  notes?: string;
}

export interface CreatePatientData {
  name: string;
  age: number;
  procedure: string;
  phone?: string;
  discharge_date: string;
  coordinator_id: string;
}