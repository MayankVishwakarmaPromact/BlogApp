import { useNavigate } from "react-router";
import { MoreVertical } from "lucide-react";
import { AuthGuard } from "../functions/AuthGuard";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../httpRequests/httpRequests";
import ModalView from "./ModalView";
import { useState } from "react";

/* eslint-disable react/prop-types */
export default function Card({ post, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdToDelete, selecteIdToDelete] = useState(false);
  const { _id, title, poster, description } = post;
  const deletePostMutation = useMutation({
    mutationFn: (id) => {
      deletePost(id);
    },
    onSettled: (id) => {
      console.log(id)
    }
  });
  const navigateTo = useNavigate();
  return (
    <div className="border rounded-md bg-white dropdown dropdown-end shadow-md">
      <AuthGuard>
        <div
          tabIndex={0}
          role="button"
          className="text-white bg-black btn btn-sm btn-circle btn-ghost hover:bg-black/80 absolute right-2 top-2 m-1 z-[1]"
        >
          <MoreVertical />
        </div>
      </AuthGuard>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box absolute top-12"
      >
        <li>
          <a className="hover:bg-black hover:text-white">Edit</a>
        </li>
        <li>
          <a
            className="hover:bg-black hover:text-white"
            onClick={() => {
              selecteIdToDelete(_id);
              setIsModalOpen(true);
            }}
          >
            Delete
          </a>
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
        <p className="mt-4 w-full text-sm leading-normal text-gray-600 line-clamp-2">
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() => navigateTo(`${index + 1}`)}
        >
          View More
        </button>
      </div>
      <ModalView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <ConfirmDeleteModal
          onClick={() => {
            deletePostMutation.mutate(selectedIdToDelete);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      </ModalView>
    </div>
  );
}

function ConfirmDeleteModal({ onClick, onClose }) {
  return (
    <>
      <div className=""></div>
      <div>Are you sure you want to delete.</div>
      <div className="flex items-center justify-end">
        <button
          className="mr-4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={onClick}
        >
          Ok
        </button>
        <button
          className="mr   -4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
