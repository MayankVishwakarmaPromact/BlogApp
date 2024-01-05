/* eslint-disable react/prop-types */
import Card from "../components/Card";
import SearchBox from "../components/SearchBox";
import { QueryParamsToObject } from "../hooks/queryParamsToObject";
import { useState, useEffect } from "react";
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
const posts = [
  {
    category: "Design",
    title: "10 Tips for Crafting the Perfect UX Portfolio",
    description:
      "Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market.",
    author: "Emily Lee",
    date: "3 April 2023",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    poster:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
  },
  {
    category: "Technology",
    title: "The Future of Mobile App Development",
    description:
      "Discover the latest trends and techniques that will shape the future of mobile app development.",
    author: "John Smith",
    date: "1 April 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    poster:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    category: "Business",
    title: "How to Launch a Successful Startup",
    description:
      "Learn the essential steps to launch a successful startup and make your dreams a reality.",
    author: "Sarah Brown",
    date: "28 March 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    poster:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Fashion",
    title: "The Latest Fashion Trends for Spring 2023",
    description:
      "Discover the hottest fashion trends for the upcoming spring season and stay ahead of the curve.",
    author: "Jessica Kim",
    date: "13 March 2023",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    poster:
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Sports",
    title: "The Benefits of Yoga for Athletes",
    description:
      "Learn how practicing yoga can improve your athletic performance and prevent injuries.",
    author: "Michael Johnson",
    date: "10 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    poster:
      "https://plus.unsplash.com/premium_photo-1663012880499-47f1ca50459d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Design",
    title: "10 Tips for Crafting the Perfect UX Portfolio",
    description:
      "Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market.",
    author: "Emily Lee",
    date: "3 April 2023",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    poster:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
  },
  {
    category: "Technology",
    title: "The Future of Mobile App Development",
    description:
      "Discover the latest trends and techniques that will shape the future of mobile app development.",
    author: "John Smith",
    date: "1 April 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    poster:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    category: "Business",
    title: "How to Launch a Successful Startup",
    description:
      "Learn the essential steps to launch a successful startup and make your dreams a reality.",
    author: "Sarah Brown",
    date: "28 March 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    poster:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Health",
    title: "The Benefits of Mindfulness Meditation",
    description:
      "Discover the scientifically proven benefits of mindfulness meditation and how it can improve your health and wellbeing.",
    author: "David Kim",
    date: "25 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    poster:
      "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Education",
    title: "Why Learning a Second Language is Important",
    description:
      "Explore the benefits of learning a second language and how it can improve your cognitive abilities.",
    author: "Maria Rodriguez",
    date: "22 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    poster:
      "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Travel",
    title: "The Best Places to Visit in Europe",
    description:
      "Discover the top destinations in Europe and plan your dream vacation.",
    author: "Alex Johnson",
    date: "19 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/99.jpg",
    poster:
      "https://images.unsplash.com/photo-1663616132598-e9a1ee3ad186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Food",
    title: "How to Make the Perfect Cup of Coffee",
    description:
      "Learn the secrets to making the perfect cup of coffee and impress your friends and family.",
    author: "Thomas Lee",
    date: "16 March 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    poster:
      "https://images.unsplash.com/photo-1426260193283-c4daed7c2024?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
  },
  {
    category: "Health",
    title: "The Benefits of Mindfulness Meditation",
    description:
      "Discover the scientifically proven benefits of mindfulness meditation and how it can improve your health and wellbeing.",
    author: "David Kim",
    date: "25 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    poster:
      "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Education",
    title: "Why Learning a Second Language is Important",
    description:
      "Explore the benefits of learning a second language and how it can improve your cognitive abilities.",
    author: "Maria Rodriguez",
    date: "22 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    poster:
      "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Travel",
    title: "The Best Places to Visit in Europe",
    description:
      "Discover the top destinations in Europe and plan your dream vacation.",
    author: "Alex Johnson",
    date: "19 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/99.jpg",
    poster:
      "https://images.unsplash.com/photo-1663616132598-e9a1ee3ad186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Design",
    title: "10 Tips for Crafting the Perfect UX Portfolio",
    description:
      "Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market. Learn how to showcase your design skills and stand out in a crowded job market.",
    author: "Emily Lee",
    date: "3 April 2023",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    poster:
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
  },
  {
    category: "Education",
    title: "Why Learning a Second Language is Important",
    description:
      "Explore the benefits of learning a second language and how it can improve your cognitive abilities.",
    author: "Maria Rodriguez",
    date: "22 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    poster:
      "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Travel",
    title: "The Best Places to Visit in Europe",
    description:
      "Discover the top destinations in Europe and plan your dream vacation.",
    author: "Alex Johnson",
    date: "19 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/99.jpg",
    poster:
      "https://images.unsplash.com/photo-1663616132598-e9a1ee3ad186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Food",
    title: "How to Make the Perfect Cup of Coffee",
    description:
      "Learn the secrets to making the perfect cup of coffee and impress your friends and family.",
    author: "Thomas Lee",
    date: "16 March 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    poster:
      "https://images.unsplash.com/photo-1426260193283-c4daed7c2024?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
  },
  {
    category: "Fashion",
    title: "The Latest Fashion Trends for Spring 2023",
    description:
      "Discover the hottest fashion trends for the upcoming spring season and stay ahead of the curve.",
    author: "Jessica Kim",
    date: "13 March 2023",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    poster:
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Sports",
    title: "The Benefits of Yoga for Athletes",
    description:
      "Learn how practicing yoga can improve your athletic performance and prevent injuries.",
    author: "Michael Johnson",
    date: "10 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    poster:
      "https://plus.unsplash.com/premium_photo-1663012880499-47f1ca50459d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Technology",
    title: "The Future of Mobile App Development",
    description:
      "Discover the latest trends and techniques that will shape the future of mobile app development.",
    author: "John Smith",
    date: "1 April 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    poster:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    category: "Business",
    title: "How to Launch a Successful Startup",
    description:
      "Learn the essential steps to launch a successful startup and make your dreams a reality.",
    author: "Sarah Brown",
    date: "28 March 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    poster:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    category: "Health",
    title: "The Benefits of Mindfulness Meditation",
    description:
      "Discover the scientifically proven benefits of mindfulness meditation and how it can improve your health and wellbeing.",
    author: "David Kim",
    date: "25 March 2023",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    poster:
      "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
];

export default function Home({ searchTerm, handleSearch, params, setParams }) {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    params.get("p")
      ? setCurrentPage(Number(params.get("p")))
      : setCurrentPage(1);
  }, [params]);

  const [itemsPerPage] = useState(15);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Update filtered posts when the searchTerm changes
  useEffect(() => {
    setCurrentPage(1);
    const filteredData = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filteredData);
  }, [searchTerm]);

  // Pagination based on filtered posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    const paramsobj = QueryParamsToObject(params);
    setParams({ ...paramsobj, p: pageNumber });
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mx-auto max-w-7xl px-2">
      <div className=" md:hidden space-y-8 pt-20">
        <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
      {/* categories */}
      <div className="mt-20 hidden w-full flex-col justify-between md:flex md:flex-row overflow-y-auto no-scrollbar">
        <div className="flex w-full items-end border-b border-gray-300">
          <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
            Contents
          </div>
          {/* ToDo: to show categories if needed */}
          {/* {categories.map((filter) => (
            <div
              className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black"
              key={filter}
            >
              {filter}
            </div>
          ))} */}
        </div>
      </div>
      {/* posts */}
      {currentItems.length > 0 ? (
        <div className="grid gap-6 gap-y-10 py-3 md:grid-cols-3 lg:grid-cols-5">
          {currentItems.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <svg
            className="w-28 "
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
          <p className="text-3xl text-gray-700">Not Found</p>
        </div>
      )}
      {/* pagination */}
      <div className="w-full border-t border-gray-300">
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
    </div>
  );
}
