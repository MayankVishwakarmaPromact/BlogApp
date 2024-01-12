/* eslint-disable react/prop-types */
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox.jsx";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/adminReducer.js";
import SetQueryParams from "../hooks/useSetQueryParams";
import GetQueryParamsByKey from "../hooks/useQueryParamsByKey";
import ModalView from "./ModalView.jsx";
import AddPostForm from "./AddPostForm.jsx";
import { AuthGuard } from "../functions/AuthGuard.js";

const title = "Hola Amigo";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#",
  },
];

export default function Header() {
  const setParams = SetQueryParams();
  const params = GetQueryParamsByKey("search");
  const isAdminLoggedIn = useSelector(
    (state) => state.admin.admin.isAdminLogin
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState(params);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(params);
  }, [params]);

  // Search functionality
  const handleSearch = (event) => {
    setParams("search", event.target.value);
    setSearchTerm(event.target.value);
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full border-b bg-white py-2 z-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Logo width={30} />
          </span>
          <span className="font-bold">{title}</span>
        </div>

        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900 hover:underline"
                  onClick={item.handleClick}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <AuthGuard>
              <li>
                <button
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900 hover:underline"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  Add New
                </button>
              </li>
            </AuthGuard>
          </ul>
        </div>

        <div className="hidden md:block md:w-3/4 lg:w-2/4">
          <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>

        <div className="hidden lg:block">
          {!isAdminLoggedIn ? (
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => {
                navigateTo("/login");
              }}
            >
              Login
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => {
                dispatch(logout());
                navigateTo("/login");
              }}
            >
              logout
            </button>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <MenuBox
            toggleMenu={toggleMenu}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>

      {/* searchbar for mobile view */}
      <div className="mx-auto max-w-7xl block md:hidden md:w-3/4 lg:w-2/4 px-4 py-2">
        <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>

      <ModalView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <AddPostForm setIsModalOpen={setIsModalOpen} />
      </ModalView>
    </header>
  );
}

function MenuBox({ toggleMenu, isModalOpen, setIsModalOpen }) {
  const isAdminLoggedIn = useSelector(
    (state) => state.admin.admin.isAdminLogin
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  return (
    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
      <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="px-5 pb-6 pt-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2">
              <span>
                <Logo width={30} />
              </span>
              <span className="font-bold">{title}</span>
            </div>
            <div className="-mr-2">
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6">
            <nav className="grid gap-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-m-3 items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                >
                  <span className="ml-3 text-base font-medium text-gray-900">
                    {item.name}
                  </span>
                </a>
              ))}
              <AuthGuard>
                <a
                  className="-m-3 items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    toggleMenu();
                  }}
                >
                  <span className="ml-3 text-base font-medium text-gray-900">
                    Add New
                  </span>
                </a>
              </AuthGuard>
            </nav>
          </div>
          {!isAdminLoggedIn ? (
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => {
                navigateTo("/login");
              }}
            >
              Login
            </button>
          ) : (
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => {
                dispatch(logout());
                navigateTo("/login");
              }}
            >
              logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
