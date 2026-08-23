import { useState } from 'react';
import { Search, Filter, UserPlus, Edit, Trash2, Shield, Mail } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Contributor', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Learner', status: 'Inactive', joined: '2024-03-01' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Contributor', status: 'Pending', joined: '2024-03-10' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Learner', status: 'Active', joined: '2024-03-15' },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Active': return 'bg-green-100 text-green-700';
    case 'Inactive': return 'bg-red-100 text-red-700';
    case 'Pending': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const getRoleColor = (role) => {
  switch(role) {
    case 'Admin': return 'bg-purple-100 text-purple-700';
    case 'Contributor': return 'bg-blue-100 text-blue-700';
    case 'Learner': return 'bg-green-100 text-green-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Users</h1>
          <p className="text-slate-500">Manage all users on the platform</p>
        </div>
        <Button><UserPlus size={18} className="mr-2" />Add User</Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)} 
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Contributor">Contributor</option>
            <option value="Learner">Learner</option>
          </select>
          <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter size={18} className="text-slate-600" />
          </button>
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail size={14} />{user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600">
                        <Shield size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
