export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Topbar */}
      <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Dashboard
          </h2>

          <p className="text-sm text-gray-500">
            Overview of your student management system
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-from font-bold text-white">
          A
        </div>
      </header>

      {/* Content */}
      <main className="p-8">

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Students */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Students
            </p>

            <h3 className="mt-3 text-3xl font-bold text-gray-800">
              0
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Registered students
            </p>
          </div>

          {/* Courses */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Courses
            </p>

            <h3 className="mt-3 text-3xl font-bold text-gray-800">
              0
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Available courses
            </p>
          </div>

          {/* Classes */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Classes
            </p>

            <h3 className="mt-3 text-3xl font-bold text-gray-800">
              0
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Active classes
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Pending
            </p>

            <h3 className="mt-3 text-3xl font-bold text-gray-800">
              0
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              Pending records
            </p>
          </div>

        </div>

        {/* Recent Students */}
        <section className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800">
              Recent Students
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Recently added students will appear here.
            </p>
          </div>

          <div className="flex min-h-60 items-center justify-center">
            <div className="text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <span className="text-2xl text-gray-400">
                  👤
                </span>
              </div>

              <h4 className="font-semibold text-gray-700">
                No student records
              </h4>

              <p className="mt-1 text-sm text-gray-400">
                Student data will appear here once added.
              </p>

            </div>
          </div>

        </section>

      </main>
    </div>
  );
}