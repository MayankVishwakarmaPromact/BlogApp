import { useNavigate } from "react-router";
import { MoreVertical } from "lucide-react";

/* eslint-disable react/prop-types */
export default function Card({ post, index }) {
  const { title, poster, description } = post;
  const navigateTo = useNavigate();
  return (
    <div className="border dropdown dropdown-end shadow-md">
      <div
        tabIndex={0}
        role="button"
        className="text-white bg-black btn btn-sm btn-circle btn-ghost hover:bg-black/80 absolute right-2 top-2 m-1 z-[1]"
      >
        <MoreVertical />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box absolute top-12"
      >
        <li>
          <a className="hover:bg-black hover:text-white">Edit</a>
        </li>
        <li>
          <a className="hover:bg-black hover:text-white">Delete</a>
        </li>
      </ul>
      <img
        src={poster}
        className="aspect-video w-full rounded-md cursor-pointer"
        alt=""
      />
      <div className="min-h-min p-3">
        {/* ToDo: show category of post */}
        {/* <p className="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
          #{category}
        </p> */}
        <p
          className="mt-4 flex-1 text-base font-semibold text-gray-900 line-clamp-1 hover:underline cursor-pointer"
          onClick={() => navigateTo(`${index + 1}`)}
        >
          {title}
        </p>
        <p className="mt-4 w-full text-sm leading-normal text-gray-600 line-clamp-2">
          {description}
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => navigateTo(`${index + 1}`)}
        >
          View More
        </button>
      </div>
    </div>
  );
}
