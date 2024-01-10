import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function AddPostForm() {

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const handleLogin = (data) => {
      console.log(data)
    };
  return (
    <>
    <h2 className="text-center text-2xl font-bold leading-tight text-black">
      Create New Post
    </h2>
    <form
      className="mt-8"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor=""
            className="text-base font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            ></input>
            {errors.email && <small className="text-red-600">Email is required.</small>}
          </div>  
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor=""
              className="text-base font-medium text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            ></input>
            {errors.password && <small className="text-red-600">Password is required.</small>}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
          >
            Login <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
        <div className="divider">OR</div>
        <div className="text-center">
          <Link
            className="text-sm font-semibold text-gray-800 hover:text-gray-900 hover:underline"
            to={"/"}
          >
            Back To Home
          </Link>
        </div>
      </div>
    </form></>
  )
}
