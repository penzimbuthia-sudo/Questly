import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
export default function SystemHealthCard({ services }) {
  const getStatusIcon = (status) => {
    switch(status) { case 'healthy': return <CheckCircle className="text-green-500" size={18} />; case 'warning': return <AlertCircle className="text-yellow-500" size={18} />; case 'down': return <XCircle className="text-red-500" size={18} />; default: return <CheckCircle className="text-green-500" size={18} />; }
  };
  const getStatusColor = (status) => {
    switch(status) { case 'healthy': return 'bg-green-100 text-green-700'; case 'warning': return 'bg-yellow-100 text-yellow-700'; case 'down': return 'bg-red-100 text-red-700'; default: return 'bg-green-100 text-green-700'; }
  };
  const overallStatus = services.every(s => s.status === 'healthy') ? 'All Systems Operational' : services.some(s => s.status === 'down') ? 'Some Systems Down' : 'Degraded Performance';
  const overallColor = services.every(s => s.status === 'healthy') ? 'text-green-600' : services.some(s => s.status === 'down') ? 'text-red-600' : 'text-yellow-600';
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200"><h3 className="text-lg font-semibold text-slate-800">System Health</h3><p className={`text-sm font-medium ${overallColor}`}>{overallStatus}</p></div>
      <div className="p-6">
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">{getStatusIcon(service.status)}<span className="text-sm font-medium text-slate-700">{service.name}</span></div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(service.status)}`}>{service.status.charAt(0).toUpperCase() + service.status.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
