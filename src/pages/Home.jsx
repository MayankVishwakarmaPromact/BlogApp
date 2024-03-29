/* eslint-disable react/prop-types */

import Card from "../components/Card";
import { useState, useEffect } from "react";
import useSetQueryParams from "../hooks/useSetQueryParams";
import useQueryParamsByKey from "../hooks/useQueryParamsByKey";
import { ForEach } from "../functions/ForEach";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthGuard } from "../functions/AuthGuard.js";
import { Plus } from "lucide-react";
import ModalView from "../components/ModalView.jsx";
import AddPostForm from "../components/AddPostForm.jsx";
import {
  createPost,
  getAllPosts,
  deletePost,
  editPost,
} from "../httpRequests/httpRequests.js";
// const categories = [
//   "Design",
//   "Technology",
//   "Business",
//   "Health",
//   "Education",
//   "Travel",
//   "Food",
//   "Fashion",
//   "Sports",
// ];

export default function Home() {
  let isMounted = true;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchTerm = useQueryParamsByKey("search");
  const pageNumber = useQueryParamsByKey("page");
  const setParams = useSetQueryParams();
  const [itemsPerPage] = useState(15);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIdToEdit, selectIdToEdit] = useState("");
  const [updatedData, setUpdatedData] = useState();

  const getAllPostsdata = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    enabled: false,
  });
  const createPostMutation = useMutation({
    mutationFn: async (data) => {
      await createPost(data);
      await getAllPostsdata.refetch();
    },
  });
  const editPostMutation = useMutation({
    mutationFn: async (id, data) => {
      data ? await editPost(id, data) : await editPost(id, updatedData);
      await getAllPostsdata.refetch();
    },
  });
  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      await deletePost(id);
      await getAllPostsdata.refetch();
    },
  });
  useEffect(() => {
    if (isMounted) {
      getAllPostsdata.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => (isMounted = false);
  }, [getAllPostsdata.refetch]);

  useEffect(() => {
    getAllPostsdata.isFetched && setPosts(getAllPostsdata.data);
  }, [getAllPostsdata]);
  useEffect(() => {
    !pageNumber && setParams("page", 1);
  }, [pageNumber, searchTerm, setParams]);

  useEffect(() => {
    searchTerm == "" ? setCurrentPage(Number(pageNumber)) : setCurrentPage(1);
  }, [pageNumber, searchTerm]);

  // Update filtered posts when the searchTerm changes
  useEffect(() => {
    const filteredData = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filteredData);
  }, [pageNumber, posts, searchTerm]);

  // Pagination based on filtered posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setParams("page", pageNumber);
    setCurrentPage(pageNumber);
  };

  const createNewPost = (data) => {
    createPostMutation.mutate(data);
  };
  const updatePostData = (id, data) => {
    selectIdToEdit("");
    setUpdatedData(data);
    editPostMutation.mutate(id, data);
  };
  const deleteSelectedPost = (id) => {
    deletePostMutation.mutate(id);
  };

  return (
    <div className="mt-24 md:mt-[4.5rem] mx-auto max-w-7xl px-2">
      {/* ToDo: to show categories if needed */}
      {/* categories */}
      {/* <div className="mt-20 hidden w-full flex-col justify-between md:flex md:flex-row overflow-y-auto no-scrollbar">
        <div className="flex w-full items-end border-b border-gray-300">
          <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
            Contents
          </div>          
          {categories.map((filter) => (
            <div
              className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
              key={filter}
            >
              {filter}
            </div>
          ))}
         </div>
      </div> */}

      <div className="pt-2 md:pt-2 w-full flex justify-between">
        <div className="flex w-full p-2 md:p-5 rounded-md items-center bg-white top-6 md:top-1  relative">
          <div className="px-4 py-2 text-xl font-bold text-gray-700  first:border-black">
            Posts
          </div>
          <AuthGuard>
            <div className=" absolute right-1 cursor-pointer px-4 py-2 text-sm md:text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
              <button
                className=" flex gap-1 bg-transparent hover:bg-gray-900 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                onClick={() => {
                  selectIdToEdit("");
                  setIsModalOpen(!isModalOpen);
                }}
              >
                Add New <Plus />
              </button>
            </div>
          </AuthGuard>
        </div>
      </div>

      {/* posts */}
      {currentItems.length > 0 ? (
        <div className="min-h-[calc(100dvh-13rem)] md:min-h-[calc(100dvh-22rem)] ">
          <div className="grid gap-6 pt-8 md:pt-3 py-2 md:grid-cols-3 lg:grid-cols-5 ">
            {/* {currentItems.map((post, index) => (
              <Card key={index} post={post} index={index} />
            ))} */}
            <ForEach
              of={currentItems}
              render={(post, index) => (
                <Card
                  post={post}
                  index={index}
                  deleteSelectedPost={deleteSelectedPost}
                  setIsModalOpen={setIsModalOpen}
                  selectIdToEdit={selectIdToEdit}
                />
              )}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-20rem)]">
          <svg
            className="w-16 md:w-36"
            enableBackground="new 0 0 32 32"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Error_x2C__lost_x2C__no_page_x2C__not_found">
              <g>
                <g>
                  <g>
                    <circle cx="7.5" cy="5.5" fill="#263238" r="0.5" />
                    <circle cx="5.5" cy="5.5" fill="#263238" r="0.5" />
                    <circle cx="3.5" cy="5.5" fill="#263238" r="0.5" />
                    <path
                      d="M30.5,8h-29C1.224,8,1,7.776,1,7.5S1.224,7,1.5,7h29C30.776,7,31,7.224,31,7.5S30.776,8,30.5,8z"
                      fill="#263238"
                    />
                    <path
                      d="M29.5,29h-27C1.673,29,1,28.327,1,27.5v-23C1,3.673,1.673,3,2.5,3h27C30.327,3,31,3.673,31,4.5v23      C31,28.327,30.327,29,29.5,29z M2.5,4C2.224,4,2,4.225,2,4.5v23C2,27.775,2.224,28,2.5,28h27c0.276,0,0.5-0.225,0.5-0.5v-23      C30,4.225,29.776,4,29.5,4H2.5z"
                      fill="#263238"
                    />
                  </g>
                </g>
              </g>
              <g>
                <path
                  d="M24.5,24c-0.276,0-0.5-0.224-0.5-0.5V21h-3.5c-0.163,0-0.315-0.079-0.409-0.212s-0.117-0.303-0.062-0.456    l2.5-7C22.6,13.133,22.789,13,23,13h1.5c0.276,0,0.5,0.224,0.5,0.5V20h0.5c0.276,0,0.5,0.224,0.5,0.5S25.776,21,25.5,21H25v2.5    C25,23.776,24.776,24,24.5,24z M21.209,20H24v-6h-0.647L21.209,20z"
                  fill="#263238"
                />
                <path
                  d="M10.5,24c-0.276,0-0.5-0.224-0.5-0.5V21H6.5c-0.163,0-0.315-0.079-0.409-0.212s-0.117-0.303-0.062-0.456    l2.5-7C8.6,13.133,8.789,13,9,13h1.5c0.276,0,0.5,0.224,0.5,0.5V20h0.5c0.276,0,0.5,0.224,0.5,0.5S11.776,21,11.5,21H11v2.5    C11,23.776,10.776,24,10.5,24z M7.209,20H10v-6H9.353L7.209,20z"
                  fill="#263238"
                />
                <path
                  d="M17.5,24h-3c-0.827,0-1.5-0.673-1.5-1.5v-8c0-0.827,0.673-1.5,1.5-1.5h3c0.827,0,1.5,0.673,1.5,1.5v8    C19,23.327,18.327,24,17.5,24z M14.5,14c-0.276,0-0.5,0.225-0.5,0.5v8c0,0.275,0.224,0.5,0.5,0.5h3c0.276,0,0.5-0.225,0.5-0.5v-8    c0-0.275-0.224-0.5-0.5-0.5H14.5z"
                  fill="#263238"
                />
              </g>
            </g>
          </svg>
          <p className="md:text-3xl text-gray-700">No Results Found</p>
        </div>
      )}

      {/* pagination */}
      <div className="rounded-md p-4 w-full border-t border-gray-300 bg-white">
        <div className="mt-2 flex items-center justify-between">
          <div className="hidden md:block">
            <p>
              showing{" "}
              <strong>
                {filteredPosts.length > 0 ? indexOfFirstItem + 1 : 0}
              </strong>{" "}
              to{" "}
              <strong>
                {indexOfLastItem > filteredPosts.length
                  ? filteredPosts.length
                  : indexOfLastItem}
              </strong>{" "}
              of <strong>{posts.length}</strong> results
            </p>
          </div>
          <div className="space-x-2">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredPosts.length / itemsPerPage)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>

      <ModalView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <AddPostForm
          selectedIdToEdit={selectedIdToEdit}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          createNewPost={createNewPost}
          updatePostData={updatePostData}
        />
      </ModalView>
    </div>
  );
}
