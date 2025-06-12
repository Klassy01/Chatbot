import Layout from '../components/Layout';

export default function ProfilePage() {
  return (
    <Layout title="Profile">
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src="/assets/user-avatar.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                Change Avatar
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Display Name', type: 'text', defaultValue: 'John Doe' },
              { label: 'Email', type: 'email', defaultValue: 'john.doe@example.com' },
            ].map(({ label, type, defaultValue }, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  defaultValue={defaultValue}
                  className="border rounded-md p-2 w-full"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                rows={3}
                defaultValue="AI enthusiast and developer"
                className="border rounded-md p-2 w-full"
              />
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
