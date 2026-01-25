"use client";
import { useEffect, useState } from 'react';
import PatientList from '@/components/coordinator/patient-list';
import StatsCards from '@/components/coordinator/stats-cards';
import AddPatientModal from '@/components/coordinator/add-patient-modal';

export default function CoordinatorDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => {
        setPatients(data.patients || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading CareLink Dashboard...</div>;

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Coordinator Dashboard</h1>
        <AddPatientModal />
      </div>
      <StatsCards patients={patients} />
      <PatientList patients={patients} />
    </main>
  );
}