import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  type Student = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  };
  
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [courseChartData, setCourseChartData] = useState<
    { courseName: string; studentCount: number }[]
  >([]);
 

  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students");
        setTotalStudents(res.data.students.count);
      } catch (err) {
        console.log("Error fetching students");
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setTotalCourses(res.data.courses.count);
      } catch (err) {
        console.log("Error fetching course");
      }
    };

    const fetchRecentStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students", {
          params: {
            page: 1,
            limit: 5,
            sortBy: "recent",
          },
        });
        setRecentStudents(res.data.students.rows);
      } catch (err) {
        console.log("Error fetching recent students ");
      }
    };
    const fetchStudentsPerCourse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/students-per-course",
        );

        setCourseChartData(res.data.chartData);
      } catch (err) {
        console.log("Error fetching students per course");
      }
    };
    fetchStudents();
    fetchCourses();
    fetchRecentStudents();
    fetchStudentsPerCourse();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>

          <p className="text-sm text-gray-500">
            Overview of your student management system
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-from font-bold text-white shadow-sm">
          A
        </div>
      </header>

      <main className="p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Students
                </p>

                <h3 className="mt-2 text-3xl font-bold text-gray-800">
                  {totalStudents}
                </h3>

                <p className="mt-2 text-xs text-gray-400">
                  Registered students
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Courses
                </p>

                <h3 className="mt-2 text-3xl font-bold text-gray-800">
                  {totalCourses}
                </h3>

                <p className="mt-2 text-xs text-gray-400">Available courses</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                <span className="text-xl">📚</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Students per Course
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Student enrollment across available courses
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600">
              Course Overview
            </div>
          </div>

          <div className="h-80 w-full">
            {courseChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseChartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="courseName"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    dy={10}
                  />

                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />

                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />

                  <Bar
                    dataKey="studentCount"
                    name="Students"
                    fill="#6366f1"
                    radius={[8, 8, 0, 0]}
                    barSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    📊
                  </div>

                  <p className="font-medium text-gray-600">
                    No course data available
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Student enrollment data will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Students
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Recently added students
            </p>
          </div>

          <div className="overflow-x-auto">
            {recentStudents.length > 0 ? (
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Student
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Age
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-t border-gray-100 transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {student.firstName} {student.lastName}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            ID: {student.id}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.age}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex min-h-60 items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-2xl text-gray-400">👤</span>
                  </div>

                  <h4 className="font-semibold text-gray-700">
                    No student records
                  </h4>

                  <p className="mt-1 text-sm text-gray-400">
                    Student data will appear here once added.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
