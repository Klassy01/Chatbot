import Layout from '../components/Layout';

export default function PrivacyPage() {
  return (
    <Layout title="Privacy">
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white rounded-lg shadow p-6 max-w-3xl w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Privacy Settings</h1>
          <div className="space-y-6">

            {/* Data Collection */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Data Collection</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Usage Analytics",
                    description: "Help us improve by sharing anonymous usage data",
                  },
                  {
                    title: "Crash Reports",
                    description: "Automatically send crash reports to help fix issues",
                  },
                ].map(({ title, description }, index) => (
                  <div key={index} className="flex items-center justify-between flex-wrap gap-4">
                    <div className="min-w-0">
                      <h3 className="font-medium">{title}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 
                          after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white 
                          after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                          after:transition-all peer-checked:after:translate-x-full 
                          peer-checked:after:border-white" />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Retention */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Data Retention</h2>
              <div>
                <h3 className="font-medium mb-2">Chat History</h3>
                <select className="border rounded-md p-2 w-full max-w-sm">
                  <option>Keep for 30 days</option>
                  <option>Keep for 90 days</option>
                  <option>Keep forever</option>
                  <option>Delete immediately</option>
                </select>
                <p className="text-sm text-gray-600 mt-2">
                  Your chat history will be automatically deleted after the selected period.
                </p>
              </div>
            </div>

            {/* Export Data */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Export Data</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Export All Data
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Download a copy of all your data in JSON format.
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
