import { createServerSupabaseClient } from '@/lib/supabase'

export default async function CallsPage() {
  const supabase = await createServerSupabaseClient()
  
  // TODO: Fetch all calls with pagination
  // TODO: Fetch call metadata and transcripts
  // TODO: Apply filters and sorting

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Calls</h1>
          <p className="text-gray-600">Manage and browse your call recordings</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Sync Now
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex space-x-4">
        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>All Status</option>
          <option>Complete</option>
          <option>Processing</option>
          <option>Failed</option>
        </select>
        <input 
          type="text" 
          placeholder="Search calls..." 
          className="px-3 py-2 border border-gray-300 rounded-md flex-1 max-w-md"
        />
      </div>

      {/* Calls Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Call
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="font-medium text-gray-900">Team Standup</p>
                  <p className="text-sm text-gray-500">Daily team sync</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Dec 15, 2024 10:00 AM
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                45 min
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                  Complete
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="/calls/1" className="text-blue-600 hover:text-blue-900 mr-4">
                  View
                </a>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}