import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/login.schema";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      await login(data.email, data.password);

      navigate("/");
    } catch (err) {
      const errorMsg = err.message || "Login failed";
      console.error(" failed:", errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-100 shadow-2xl rounded-3xl p-8 space-y-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-sm text-base-content/70 mt-2">
              Login to your account
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="label">Email</label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full"
            />

            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="label">Password</label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full"
            />

            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
