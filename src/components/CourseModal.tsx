import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { showToast } from "../utils/toast";
import { useEffect } from "react";
interface Course {
  id: number;
  courseName: string;
  courseCode: string;
  courseDuration: string;
  courseFee: number;
}
type CourseInputs = {
  courseName: string;
  courseCode: string;
  courseDuration: string;
  courseFee: number;
};
type CourseModalProps = {
  onClose: () => void;
  onSuccess: () => void;
  course: Course | null;
};

export default function CourseModal({
  onClose,
  onSuccess,
  course,
}: CourseModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CourseInputs>();

  const onSubmit: SubmitHandler<CourseInputs> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      console.log(data);
      if (course) {
        const res = await axios.put(
          `http://localhost:5000/api/courses/${course.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("UPDATE RESPONSE:", res.data);
        showToast.success("Course updated successfully.");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/courses",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(res.data);
        showToast.success("Course added successfully.");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.log("Error adding course:", error);
    }
  };
  useEffect(() => {
    if (course) {
      setValue("courseName", course.courseName);
      setValue("courseCode", course.courseCode);
      setValue("courseDuration", course.courseDuration);
      setValue("courseFee", course.courseFee);
    }
  }, [course, setValue, reset]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{course ? "Edit Course" : "Add Course"}</h1>

          <p className="mt-2 text-sm text-gray-500">{course ? "Update course details" : "Enter course details"}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("courseName", {
                required: "Full name is required",
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.courseName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.courseName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Code
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              {...register("courseCode", {
                required: "Full name is required",
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.courseCode
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.courseCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseCode.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Duration
            </label>

            <input
              type="text"
              placeholder="Enter your courseDuration"
              {...register("courseDuration", {
                required: "courseDuration is required",
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.courseDuration
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.courseDuration && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseDuration.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Course Fee
            </label>

            <input
              type="number"
              placeholder="Enter courseFee"
              {...register("courseFee", {
                required: "courseFee is required",
                valueAsNumber: true,
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.courseFee
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />

            {errors.courseFee && (
              <p className="mt-1 text-sm text-red-500">
                {errors.courseFee.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            
            className="w-full rounded-lg bg-accent-from py-3 font-semibold text-white hover:opacity-90"
          >
{ course ? "Update Course" :  "Add Course"
}          </button>
        </form>
      </div>
    </div>
  );
}
