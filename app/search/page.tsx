import { createServerSupabaseClient } from '@/lib/supabase'

export default async function SearchPage() {
  const supabase = await createServerSupabaseClient()
  
  // TODO: Implement full-text search across transcripts
  // TODO: Save search history
  // TODO: Highlight search terms in results

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Transcripts</h1>
        <p className="text-gray-600">Find specific content across all your call recordings</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex space-x-4 mb-4">
          <input 
            type="text" 
            placeholder="Search for keywords, phrases, or topics..." 
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-lg"
          />
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Search
          </button>
        </div>
        
        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>All dates</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>All participants</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>All call types</option>
            <option>Team meetings</option>
            <option>Client calls</option>
            <option>Interviews</option>
          </select>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Team Standup - Dec 15</h3>
              <p className="text-sm text-gray-500">45 minutes • 3 participants</p>
            </div>
            <a href="/calls/1" className="text-blue-600 hover:text-blue-900">
              View Full Call
            </a>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              ...discussed the <mark className="bg-yellow-200">project timeline</mark> and identified 
              potential blockers. Sarah mentioned that the <mark className="bg-yellow-200">deadline</mark> 
              might need to be adjusted...
            </p>
            <p className="text-xs text-gray-500">Match at 12:34 - 12:47</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Client Review - Dec 12</h3>
              <p className="text-sm text-gray-500">30 minutes • 4 participants</p>
            </div>
            <a href="/calls/2" className="text-blue-600 hover:text-blue-900">
              View Full Call
            </a>
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              Client feedback on the <mark className="bg-yellow-200">project timeline</mark> was positive. 
              They agreed to the proposed <mark className="bg-yellow-200">deadline</mark> and budget...
            </p>
            <p className="text-xs text-gray-500">Match at 08:15 - 08:32</p>
          </div>
        </div>
      </div>
    </div>
  )
}