import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/toast";
type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: data.email,
        password: data.password,
      });
      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      showToast.success("Login successfully.");
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
    >
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Login</h1>

        <p className="mt-2 text-sm text-gray-500">Please enter your details</p>
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          placeholder="Enter email"
          {...register("email", {
            required: "email is required",
          })}
          className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
            errors.email
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }`}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
          })}
          className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
            errors.password
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }`}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent-from py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
      >
        Login
      </button>
      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-[#7E33E0] hover:underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
