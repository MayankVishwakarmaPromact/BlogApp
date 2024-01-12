/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../httpRequests/httpRequests.js";

export default function AddPostForm({setIsModalOpen}) {
  const mutation = useMutation({
    mutationFn: (data) => {
      createPost(data);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({mode:'all'});

  const handleLogin = (data) => {
    // console.log(data);
    reset();setIsModalOpen(false)
    mutation.mutate(data);
  };
  return (
    <>
      <h2 className="text-center text-2xl font-bold leading-tight text-black">
        Create New Post
      </h2>
      <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="text-base font-medium text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
              ></input>
              {errors.title && (
                <small className="text-red-600">Title is required.</small>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="text-base font-medium text-gray-900"
              >
                Description
              </label>
            </div>
            <div className="mt-2">
              <textarea
                className="flex h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="Description"
                {...register("description", { required: true })}
              />

              {errors.description && (
                <small className="text-red-600">Description is required.</small>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="poster"
              className="text-base font-medium text-gray-900"
            >
              Poster Url
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Image url"
                {...register("poster", { required: true })}
              ></input>
              {errors.poster && (
                <small className="text-red-600">Image URL is required.</small>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Create Post <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
