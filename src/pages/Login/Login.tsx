import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import type { LoginForm } from "./Login.types";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  const onSubmit = (data: LoginForm) => {
    try {
      console.log("Email:", data.email);
      console.log("Password:", data.password);
      toast.success("Login successfull");
      reset();
      navigate("/dashboard");
    } catch {
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-offwhite">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-96 p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <div className="text-center">
          <h2>Login</h2>
        </div>

        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 rounded-md "
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />

        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 rounded-md"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />

        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-primary text-white p-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};
