// src/pages/admin/Settings.jsx
import { useState } from 'react';
import { Save, RefreshCw, Globe, Users, Bell, Shield, Database, Mail, Moon, Sun } from 'lucide-react';

// From Person B - UI Components
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';

// From Person A - Auth
// import { useAuth } from '../../context/AuthContext';

const initialSettings = {
  siteName: 'Questly',
  siteDescription: 'Learn through community-driven challenges',
  language: 'en',
  theme: 'light',
  allowRegistration: true,
  requireEmailVerification: true,
  enableNotifications: true,
  enableAnalytics: true,
  maintenanceMode: false,
  cacheEnabled: true,
  emailNotifications: true,
};

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      setSettings(initialSettings);
      alert('Settings reset to default!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 mt-1">Manage platform configuration and preferences.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleReset}>
            <RefreshCw size={18} className="mr-2" /> Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save size={18} className="mr-2" /> {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-blue-600" />
            <h3 className="font-semibold text-slate-800">General Settings</h3>
          </div>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Site Description</label>
            <input
              type="text"
              value={settings.siteDescription}
              onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="sw">Swahili</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Theme</label>
            <div className="flex gap-2">
              <button
                onClick={() => handleInputChange('theme', 'light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  settings.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Sun size={16} /> Light
              </button>
              <button
                onClick={() => handleInputChange('theme', 'dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  settings.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Moon size={16} /> Dark
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* User Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-green-600" />
            <h3 className="font-semibold text-slate-800">User Settings</h3>
          </div>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-700">Allow Registration</p>
              <p className="text-sm text-slate-500">Allow new users to sign up</p>
            </div>
            <Toggle
              checked={settings.allowRegistration}
              onChange={() => handleToggle('allowRegistration')}
            />
          </div>
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="font-medium text-slate-700">Email Verification</p>
              <p className="text-sm text-slate-500">Require email verification for new accounts</p>
            </div>
            <Toggle
              checked={settings.requireEmailVerification}
              onChange={() => handleToggle('requireEmailVerification')}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Notification Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-yellow-600" />
            <h3 className="font-semibold text-slate-800">Notification Settings</h3>
          </div>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-700">Email Notifications</p>
              <p className="text-sm text-slate-500">Send email notifications for important events</p>
            </div>
            <Toggle
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
          </div>
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="font-medium text-slate-700">In-App Notifications</p>
              <p className="text-sm text-slate-500">Show notifications within the platform</p>
            </div>
            <Toggle
              checked={settings.enableNotifications}
              onChange={() => handleToggle('enableNotifications')}
            />
          </div>
        </Card.Body>
      </Card>

      {/* System Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-purple-600" />
            <h3 className="font-semibold text-slate-800">System Settings</h3>
          </div>
        </Card.Header>
        <Card.Body className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-700">Maintenance Mode</p>
              <p className="text-sm text-slate-500">Put the platform in maintenance mode</p>
            </div>
            <Toggle
              checked={settings.maintenanceMode}
              onChange={() => handleToggle('maintenanceMode')}
            />
          </div>
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="font-medium text-slate-700">Analytics</p>
              <p className="text-sm text-slate-500">Enable platform analytics tracking</p>
            </div>
            <Toggle
              checked={settings.enableAnalytics}
              onChange={() => handleToggle('enableAnalytics')}
            />
          </div>
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="font-medium text-slate-700">Cache</p>
              <p className="text-sm text-slate-500">Enable caching for improved performance</p>
            </div>
            <Toggle
              checked={settings.cacheEnabled}
              onChange={() => handleToggle('cacheEnabled')}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}