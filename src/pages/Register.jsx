import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/register.schema";

export default function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      navigate("/");
    } catch (err) {
      const errorMsg = err.message || "Register failed";
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
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-sm text-base-content/70 mt-2">
              Create your account
            </p>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="label">Name</label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter name"
              className="input input-bordered w-full"
            />

            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          <div>
            <label className="label">Confirm Password</label>

            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
              className="input input-bordered w-full"
            />

            {errors.confirmPassword && (
              <p className="text-error text-sm mt-1">
                {errors.confirmPassword.message}
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
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
