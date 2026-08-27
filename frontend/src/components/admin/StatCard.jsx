import { ArrowUp, ArrowDown } from 'lucide-react';
export default function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) {
  const colors = { primary: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600', purple: 'bg-purple-50 text-purple-600', orange: 'bg-orange-50 text-orange-600', red: 'bg-red-50 text-red-600', blue: 'bg-blue-50 text-blue-600' };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center`}><Icon size={24} /></div>
          <div><p className="text-sm font-medium text-slate-500">{title}</p><p className="text-2xl font-bold text-slate-800">{value}</p></div>
        </div>
        {trend && <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}{trendValue}%</div>}
      </div>
    </div>
  );
}
