import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { showToast } from "../utils/toast";

type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  courseIds: number[];
};
type Course = {
  id: number;
  courseName: string;
  courseCode: string;
  courseDuration: string;
  courseFee: number;
};
type StudentModalProps = {
  onClose: () => void;
};

export default function StudentModal({ onClose }: StudentModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    try {
      const studentData = {
        ...data,
        courseIds: selectedCourses,
      };

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/students",
        studentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);
      showToast.success("Student added successfully.");
      onClose();
    } catch (error) {
      console.log("Error adding student:", error);
    }
  };
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");

        console.log("COURSES:", res.data);

        setCourses(res.data.courses.rows);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Add Student</h1>

          <p className="mt-2 text-sm text-gray-500">Enter student details</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              first Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("firstName", {
                required: "Full name is required",
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.firstName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              last Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("lastName", {
                required: "Full name is required",
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.lastName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Age
            </label>

            <input
              type="number"
              placeholder="Enter age"
              {...register("age", {
                required: "Age is required",
                valueAsNumber: true,
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.age
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.age && (
              <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Courses
            </label>

            {/* Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCourseDropdown(!courseDropdown)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left"
              >
                <span>
                  {selectedCourses.length === 0
                    ? "Select courses"
                    : `${selectedCourses.length} course(s) selected`}
                </span>

                <span>⌄</span>
              </button>

              {courseDropdown && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                  {courses.map((course) => (
                    <label
                      key={course.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => {
                          if (selectedCourses.includes(course.id)) {
                            setSelectedCourses(
                              selectedCourses.filter((id) => id !== course.id),
                            );
                          } else {
                            setSelectedCourses([...selectedCourses, course.id]);
                          }
                        }}
                      />

                      <span>{course.courseName}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-accent-from py-3 font-semibold text-white hover:opacity-90"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}
