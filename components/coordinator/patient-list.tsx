export default function PatientList({ patients }: { patients: any[] }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Procedure</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="px-6 py-4">{p.name}</td>
              <td className="px-6 py-4">{p.procedure}</td>
              <td className="px-6 py-4">{p.risk_level || 'Normal'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}