import { createServerSupabaseClient } from '@/lib/supabase'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  
  // TODO: Fetch recent calls data
  // TODO: Fetch sync logs for activity feed
  // TODO: Fetch notification count
  // TODO: Calculate stats (total calls, processing status, etc.)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your call recordings and processing status</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Calls</h3>
          <p className="text-3xl font-bold text-gray-900">247</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Processing</h3>
          <p className="text-3xl font-bold text-orange-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-3xl font-bold text-green-600">244</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Action Items</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Calls */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Calls</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Team Standup</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Complete</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Client Review</p>
                  <p className="text-sm text-gray-500">4 hours ago</p>
                </div>
                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">Processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Activity Feed</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4 text-sm">
              <p className="text-gray-600">New call uploaded to Drive</p>
              <p className="text-gray-600">Transcript generated for Team Standup</p>
              <p className="text-gray-600">3 action items extracted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}