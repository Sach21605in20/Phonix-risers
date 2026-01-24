// lib/risk-analyzer.ts
import { CheckIn, RiskAnalysis } from './types';

export function analyzeRisk(checkIn: {
  pain_level: number;
  temperature: number;
  symptoms: string[];
  mobility: string;
}, previousCheckIns?: CheckIn[]): RiskAnalysis {
  const alerts: string[] = [];
  let score = 0;
  let riskLevel: 'normal' | 'warning' | 'high' = 'normal';

  // Critical symptoms (immediate high risk)
  const criticalSymptoms = ['Chest pain', 'Shortness of breath'];
  const hasCriticalSymptom = checkIn.symptoms.some(s => criticalSymptoms.includes(s));
  
  if (hasCriticalSymptom) {
    score += 50;
    alerts.push('⚠️ CRITICAL: Life-threatening symptoms reported');
  }

  // Temperature analysis
  if (checkIn.temperature > 103) {
    score += 40;
    alerts.push('Dangerously high fever (>103°F)');
  } else if (checkIn.temperature > 100.4) {
    score += 30;
    alerts.push('High fever detected (>100.4°F)');
  } else if (checkIn.temperature > 99.5) {
    score += 15;
    alerts.push('Elevated temperature (>99.5°F)');
  } else if (checkIn.temperature < 96) {
    score += 25;
    alerts.push('Abnormally low temperature (<96°F)');
  }

  // Pain analysis
  if (checkIn.pain_level >= 9) {
    score += 35;
    alerts.push('Severe pain reported (9-10/10)');
  } else if (checkIn.pain_level >= 7) {
    score += 25;
    alerts.push('High pain level (7-8/10)');
  } else if (checkIn.pain_level >= 5) {
    score += 15;
    alerts.push('Moderate pain (5-6/10)');
  }

  // Mobility analysis
  if (checkIn.mobility === 'very_limited') {
    score += 20;
    alerts.push('Severely limited mobility');
  } else if (checkIn.mobility === 'limited') {
    score += 10;
    alerts.push('Reduced mobility');
  }

  // Other concerning symptoms
  const concerningSymptoms = ['Swelling', 'Redness', 'Dizziness', 'Nausea'];
  const concerningCount = checkIn.symptoms.filter(s => concerningSymptoms.includes(s)).length;
  
  if (concerningCount >= 3) {
    score += 20;
    alerts.push(`Multiple symptoms present (${concerningCount})`);
  } else if (concerningCount >= 1) {
    score += 10;
    alerts.push(`${concerningCount} additional symptom${concerningCount > 1 ? 's' : ''} reported`);
  }

  // Trend analysis (if previous check-ins available)
  if (previousCheckIns && previousCheckIns.length > 0) {
    const latest = previousCheckIns[previousCheckIns.length - 1];
    
    // Worsening pain
    if (checkIn.pain_level > latest.pain_level + 2) {
      score += 15;
      alerts.push('Rapid pain increase detected');
    }
    
    // Temperature trending up
    if (checkIn.temperature > latest.temperature + 1.5) {
      score += 15;
      alerts.push('Significant temperature increase');
    }
    
    // Declining mobility
    const mobilityScore: Record<string, number> = {
      good: 3,
      moderate: 2,
      limited: 1,
      very_limited: 0
    };
    
    if (mobilityScore[checkIn.mobility] < mobilityScore[latest.mobility] - 1) {
      score += 10;
      alerts.push('Declining mobility trend');
    }
  }

  // Determine risk level based on score
  if (score >= 50) {
    riskLevel = 'high';
  } else if (score >= 25) {
    riskLevel = 'warning';
  } else {
    riskLevel = 'normal';
  }

  return {
    riskLevel,
    alerts,
    score
  };
}

export function getRiskColor(level: 'normal' | 'warning' | 'high'): string {
  switch (level) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'warning':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default:
      return 'text-green-600 bg-green-50 border-green-200';
  }
}

export function getRiskBadgeColor(level: 'normal' | 'warning' | 'high'): string {
  switch (level) {
    case 'high':
      return 'bg-red-500';
    case 'warning':
      return 'bg-yellow-500';
    default:
      return 'bg-green-500';
  }
}