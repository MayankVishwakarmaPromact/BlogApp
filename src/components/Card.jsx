import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
export default function Card({ post, index }) {
  const { title, poster, category, description } = post;
  const navigateTo = useNavigate();
  return (
    <div className="border">
      <img
        src={poster}
        className="aspect-video w-full rounded-md"
        alt=""
        onClick={() => navigateTo(`${index + 1}`)}
      />
      <div className="min-h-min p-3">
        <p className="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
          #{category}
        </p>
        <p
          className="mt-4 flex-1 text-base font-semibold text-gray-900 line-clamp-1 hover:underline"
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
