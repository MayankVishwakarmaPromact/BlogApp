/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getPostById } from "../httpRequests/httpRequests";

export default function AddPostForm({
  selectedIdToEdit,
  isModalOpen,
  setIsModalOpen,
  createNewPost,
  updatePostData,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      poster: "",
    },
    mode: "all",
  });

  const getPostData = useQuery({
    queryKey: ["posts", selectedIdToEdit],
    queryFn: async () => await getPostById(selectedIdToEdit),
    enabled: false,
  });
  useEffect(() => {
    if (isModalOpen) {
      selectedIdToEdit != "" && getPostData.refetch();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (getPostData.isFetched && selectedIdToEdit != "") {
      setValue("title", getPostData.data["title"]);
      setValue("description", getPostData.data["description"]);
      setValue("poster", getPostData.data["poster"]);
    } else {
      reset();
    }
  }, [getPostData.data, selectedIdToEdit]);

  const createPost = (data) => {
    createNewPost(data);
    reset();
    setIsModalOpen(false);
  };
  const editPost = (data) => {
    updatePostData(selectedIdToEdit, data);
    reset();
    setIsModalOpen(false);
  };
  return (
    <>
      <h2 className="text-center text-2xl font-bold leading-tight text-black">
        {selectedIdToEdit ? "Edit Post" : "Create New Post"}
      </h2>
      <form
        className="mt-8"
        onSubmit={handleSubmit(selectedIdToEdit ? editPost : createPost)}
      >
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
              {selectedIdToEdit ? "Update Post" : "Create Post"}{" "}
              <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
