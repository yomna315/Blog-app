import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { createPost, updatePost } from "../utils/api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../schema/post.schema";

export default function AddPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });
  const imageUrl = watch("imageUrl");
  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);
  useEffect(() => {
    if (id && location.state?.post) {
      const post = location.state.post;
      reset({
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
      });
      setImagePreview(post.imageUrl);
    }
  }, [id, reset, location.state]);
  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const postData = {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        author: user.name,
      };
      if (id) {
        await updatePost(id, postData, user.id);
      } else {
        await createPost(postData, user.id);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                {id ? "Edit Post" : " Create New Post"}
              </h2>

              {error && (
                <div className="alert alert-error mb-6">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Title *
                    </span>
                  </label>

                  <input
                    {...register("title")}
                    type="text"
                    placeholder="Enter post title"
                    className="input input-bordered w-full focus:input-primary transition-all duration-300"
                  />

                  {errors.title && (
                    <span className="text-error text-sm mt-2">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Description *
                    </span>
                  </label>

                  <textarea
                    {...register("description")}
                    placeholder="Write your post description..."
                    className="textarea textarea-bordered h-36 w-full focus:textarea-primary transition-all duration-300"
                  ></textarea>

                  {errors.description && (
                    <span className="text-error text-sm mt-2">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">
                      Image URL
                    </span>
                  </label>

                  <input
                    {...register("imageUrl")}
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered w-full focus:input-primary transition-all duration-300"
                  />

                  <label className="label">
                    <span className="label-text-alt text-xs text-base-content/60">
                      Use image links from Unsplash, Pexels, or Pixabay
                    </span>
                  </label>
                </div>

                {imagePreview && (
                  <div className="space-y-3">
                    <label className="label">
                      <span className="label-text font-semibold text-base">
                        Preview
                      </span>
                    </label>

                    <div className="rounded-2xl overflow-hidden border border-base-300 shadow-md">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x200?text=Invalid+URL";
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary flex-1 rounded-xl"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner"></span>
                    ) : id ? (
                      "Update Post"
                    ) : (
                      "Create Post"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="btn btn-outline flex-1 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
