export default function StatsCards({ patients }: { patients: any[] }) {
  const highRisk = patients.filter(p => p.risk_level === 'high').length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="text-gray-500">Total Patients</h3>
        <p className="text-2xl font-bold">{patients.length}</p>
      </div>
      <div className="p-6 bg-red-50 rounded-xl shadow border border-red-100">
        <h3 className="text-red-600">High Risk</h3>
        <p className="text-2xl font-bold text-red-700">{highRisk}</p>
      </div>
    </div>
  );
}