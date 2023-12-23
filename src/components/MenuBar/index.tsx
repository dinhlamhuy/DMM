/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState } from "react";
import logo from "../../../public/img/logo.png";
import EN from "../../../public/img/en.png";
import VN from "../../../public/img/vn.png";
import { useTranslation } from "react-i18next";
import { IoSunny } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; import { IoIosMoon } from "react-icons/io";
import './index.css'
type Props = {
  children: ReactNode;
  onDarkMode: any;
};

const MenuBar: React.FC<Props> = ({ children, onDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [img, setImg] = useState(EN);
  const [DarkMode, setDarkMode] = useState(false);
  const [lng, setLng] = useState("EN");
  const toggleDarkMode = () => {
    setDarkMode(!DarkMode);
    onDarkMode(!DarkMode);
  }
  const ChangeLanguage = () => {
    if (lng === "VN") {
      setLng("EN");
      setImg(EN);
    } else if (lng === "EN") {
      setLng("VN");
      setImg(VN);
    }

    i18n.changeLanguage(lng);
  };
  const navigate = useNavigate();
  const handleUrl = (link: string) => {
    navigate(link);
  };

  const [isOpenSlide, setIsOpenSlide] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 ${DarkMode ? "border-slate-900 bg-black dark:bg-black dark:border-slate-900" : "bg-white"}   shadow-md z-50 w-full bg-nav border-b border-gray-200 `}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button 
                className="flex ms-2 md:me-24"
                onClick={() => setIsOpenSlide(!isOpenSlide)}
              >
                <img src={logo} className="h-8 me-3" alt="LHG" />
                <span className={`projectName self-center text-xl ${DarkMode ? "dark:text-yellow-400 text-yellow-400" : "text-black "}  font-bold sm:text-2xl whitespace-nowrap`}>
                  Device Management
                </span>
              </button>
            </div>
            <div className="flex items-center">
              {/* avatar */}
              {/* <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 " aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
              </button>
            </div>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow  " id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 " role="none">
                  Neil Simsádsad
                </p>
                <p className="text-sm font-medium text-gray-900 truncate " role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   " role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   " role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   " role="menuitem">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100   " role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed shadow-xl ${DarkMode ? "dark:shadow-gray-900  dark:border-slate-900  dark:bg-black shadow-gray-900 border-slate-900 bg-black" : "bg-white"} top-0 left-0 z-40 w-60 h-screen pt-20 
        ${isOpenSlide ? "transition-transform -translate-x-full md:translate-x-0 sm:translate-x-0 "
            : " hidden  sm:translate-x-0 md:translate-x-0 "
          }  border-r   translate-x-0`}
        aria-label="Sidebar"
      >
        <div className={`h-full px-3 grid gap-4 content-between  ${DarkMode ? "dark:text-white dark:bg-black bg-black text-white" : "text-gray-900 bg-white"} pb-4 overflow-y-auto  `} >
          <ul className="space-y-2 font-medium  ">
            <li>
              <button
              onClick={() => handleUrl("/")}
              className={`flex ${DarkMode ? "dark:text-white dark-hover:bg-gray-100 dark-hover:text-gray-800 hover:text-gray-800 hover:bg-gray-100 text-white " : "text-gray-900 hover:bg-gray-100 "}  items-center p-2  rounded-lg     group`}>
                <svg
                  className={`${DarkMode ? "dark:text-white text-white" : "text-gray-600"}  w-5 h-5  transition duration-75  group-hover:text-gray-900 `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className={`${DarkMode ? "dark:text-white text-white" : "text-gray-900 "}  flex-1 ms-3 whitespace-nowrap  group-hover:text-gray-900`}>
                  {t("lblHome")}
                </span>
              </button>
            </li>
            <li>
              <button   onClick={() => handleUrl("/list")}  className=" flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <svg
                  className={`${DarkMode ? "dark:text-white text-white" : "text-gray-600"}   flex-shrink-0 w-5 h-5  transition duration-75  group-hover:text-gray-900 `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className={`  ${DarkMode ? "dark:text-white text-white" : "text-gray-900"} group-hover:text-gray-900 pr-2 flex-1 ms-3 whitespace-nowrap `}>
                  {t("lblListDevice")}
                </span>
              </button>
            </li>
            <li>
              <button className=" flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <svg
                  className={`${DarkMode ? "dark:text-white text-white" : "text-gray-600"}   flex-shrink-0 w-5 h-5  transition duration-75  group-hover:text-gray-900 `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className={`  ${DarkMode ? "dark:text-white text-white" : "text-gray-900"} group-hover:text-gray-900 pr-2 flex-1 ms-3 whitespace-nowrap `}>
                  Thêm tài khoản
                </span>
              </button>
            </li>

            <li>
              <button
                onClick={() => ChangeLanguage()}
                className="flex items-center py-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <img src={img} className="w-8  dark:text-white" />
                <span className={`  ${DarkMode ? "dark:text-white text-white" : "text-gray-900"} group-hover:text-gray-900 pr-2 flex-1 ms-3 whitespace-nowrap `}>
                  {t("lblChangeLng")}
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleUrl("/login")}
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className={`  ${DarkMode ? "dark:text-white text-white" : "text-gray-500"} flex-shrink-0 w-5 h-5  transition duration-75  group-hover:text-gray-900 `}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className={`  ${DarkMode ? "dark:text-white text-white" : "text-gray-900"} group-hover:text-gray-900 pr-2 flex-1 ms-3 whitespace-nowrap `}>
                  {t("lblLogout")}
                </span>
              </button>
            </li>

          </ul>
          <ul className="space-y-2 font-medium  ">
            {/* <li className="place-self-end">
              <label className="relative  inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={toggleDarkMode} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
                after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className={`ms-3 text-sm font-medium ${DarkMode ? "dark:text-white text-white":""}  `}>{DarkMode ? "Sáng" : "Tối"}</span>
              </label>
            </li> */}
            <li className="justify-center flex">

              <input type="checkbox" id="darkmode-toggle" className="inputDarkMode" checked={DarkMode} onChange={toggleDarkMode} />
              <label htmlFor="darkmode-toggle" className={`labelDarkMode  ${DarkMode ? "text-yellow-400" : ""}`} >

                <IoSunny className={`sun ${DarkMode ? "text-yellow-400" : ""} `} />
                <IoIosMoon className={`moon ${DarkMode ? "text-yellow-400" : ""} `} />
              </label>

            </li>
          </ul>
        </div>
      </aside>

      <div className={`p-4    ${isOpenSlide ? "sm:ml-60" : "  "} ${DarkMode ? "dark:bg-slate-800 bg-slate-800" : "bg-gray-200"} `}>
        <div className={` ${DarkMode ? "dark:bg-black bg-black" : "bg-white "}  p-4 border    border-gray-200   min-h-screen border-dashed rounded-lg  mt-14 pt-1 pb-12`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default MenuBar;
