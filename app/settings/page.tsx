import { createServerSupabaseClient } from '@/lib/supabase'

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient()
  
  // TODO: Fetch user settings and preferences
  // TODO: Fetch app configuration
  // TODO: Check user role for admin features

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="bg-white rounded-lg shadow p-6">
          <nav className="space-y-2">
            <a href="/settings" className="block px-3 py-2 bg-blue-50 text-blue-700 rounded-md">
              General
            </a>
            <a href="/settings/integrations" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Integrations
            </a>
            <a href="/settings/notifications" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              Notifications
            </a>
            <a href="/settings/users" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
              User Management
            </a>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Account Settings</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  defaultValue="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  defaultValue="john@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>

          {/* General Preferences */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">General Preferences</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Call Folder Structure
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>By Date (YYYY/MM/DD)</option>
                  <option>By Call Type</option>
                  <option>By Participant</option>
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="auto-transcript" className="mr-2" />
                <label htmlFor="auto-transcript" className="text-sm text-gray-700">
                  Automatically generate transcripts for new calls
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="action-items" className="mr-2" />
                <label htmlFor="action-items" className="text-sm text-gray-700">
                  Extract action items from transcripts
                </label>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}