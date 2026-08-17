import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import StudentModal from "../components/LoginModal";

interface Course {
  id: number;
  courseName: string;
  courseCode: string;
  courseDuration: string;
  courseFee: number;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  // password:string;
  email: string;
  age: number;
  courses: Course[];
}

interface Filter {
  page: number;
  limit: number;
  sortBy: string;
}

export default function Students() {
  const BASE_URL = "http://localhost:5000";
  const [showModal, setShowModal] = useState(false);
  const [student, setStudent] = useState<Student[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");

  const [filter, setFilter] = useState<Filter>({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 7,
    sortBy: searchParams.get("sortBy") || "recent",
  });

  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(false);
  // for edit select student
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const totalPages = Math.ceil(totalStudents / filter.limit);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/students`, {
        params: {
          page: filter.page,
          limit: filter.limit,
          sortBy: filter.sortBy,
          q: search,
        },
      });

      console.log("STUDENT RESPONSE:", res.data);

      setStudent(res.data.students.rows);
      setTotalStudents(res.data.students.count);
    } catch (error) {
      console.error("Error fetching students:", error);

      setStudent([]);
      setTotalStudents(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [filter, search]);

  const handleSearch = (value: string) => {
    setSearch(value);

    setFilter((prev) => ({
      ...prev,
      page: 1,
    }));

    setSearchParams({
      page: "1",
      limit: String(filter.limit),
      sortBy: filter.sortBy,
      q: value,
    });
  };

  const handleSort = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: value,
      page: 1,
    }));

    setSearchParams({
      page: "1",
      limit: String(filter.limit),
      sortBy: value,
      q: search,
    });
  };

  const handleLimit = (value: number) => {
    setFilter((prev) => ({
      ...prev,
      limit: value,
      page: 1,
    }));

    setSearchParams({
      page: "1",
      limit: String(value),
      sortBy: filter.sortBy,
      q: search,
    });
  };

  const handlePrevious = () => {
    if (filter.page <= 1) return;

    const newPage = filter.page - 1;

    setFilter((prev) => ({
      ...prev,
      page: newPage,
    }));

    setSearchParams({
      page: String(newPage),
      limit: String(filter.limit),
      sortBy: filter.sortBy,
      q: search,
    });
  };

  const handleNext = () => {
    if (filter.page >= totalPages) return;

    const newPage = filter.page + 1;

    setFilter((prev) => ({
      ...prev,
      page: newPage,
    }));

    setSearchParams({
      page: String(newPage),
      limit: String(filter.limit),
      sortBy: filter.sortBy,
      q: search,
    });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/students/${id}`);

      fetchStudent();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Students</h2>

          <p className="text-sm text-gray-500">Manage student records</p>
        </div>

        <button
          onClick={() => {
            setSelectedStudent(null);
            setShowModal(true);
          }}
          className="rounded-lg bg-accent-from px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Add Student
        </button>
      </header>

      <main className="p-8">
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-5 border-b border-gray-200 p-6 lg:flex-row lg:items-center">
            <div>
              <h3 className="font-semibold text-gray-800">Student List</h3>

              <p className="mt-1 text-sm text-gray-500">
                View, update and delete student records.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-accent-from focus:ring-2 focus:ring-indigo-100 sm:w-64"
              />

              <select
                value={filter.sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-accent-from"
              >
                <option value="recent">Newest</option>

                <option value="oldest">Oldest</option>
              </select>

              <select
                value={filter.limit}
                onChange={(e) => handleLimit(Number(e.target.value))}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-accent-from"
              >
                <option value={3}>3 / page</option>

                <option value={6}>7 / page</option>

                <option value={9}>9 / page</option>

                <option value={12}>12 / page</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
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

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Courses
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <p className="text-gray-500">Loading students...</p>
                    </td>
                  </tr>
                ) : student.length > 0 ? (
                  student.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.firstName} {item.lastName}
                          </p>

                          <p className="text-xs text-gray-400">ID: {item.id}</p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.age}
                      </td>

                      <td className="px-6 py-4">
                        {item.courses && item.courses.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {item.courses.map((course) => (
                              <span
                                key={course.id}
                                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                              >
                                {course.courseName}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No courses
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setSelectedStudent(item);
                          }}
                          className="mr-3 text-sm font-medium text-blue-600 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                          <span className="text-2xl text-gray-400">👥</span>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-700">
                          No students found
                        </h4>

                        <p className="mt-1 text-sm text-gray-400">
                          {search
                            ? "No students match your search."
                            : "Add a student to start managing student records."}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!loading && totalStudents > 0 && (
            <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={filter.page === 1}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  Page {filter.page} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={filter.page >= totalPages}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      {showModal && (
        <StudentModal
          onClose={() => {
            setShowModal(false);
            setSelectedStudent(null);
          }}
          onSuccess={fetchStudent}
          student={selectedStudent}
        />
      )}
    </div>
  );
}
