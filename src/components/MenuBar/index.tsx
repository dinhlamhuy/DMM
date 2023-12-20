/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useState } from "react";
import logo from "../../../public/img/logo.png";
import EN from "../../../public/img/en.png";
import VN from "../../../public/img/vn.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const MenuBar: React.FC<Props> = ({ children }) => {

  const { t, i18n } = useTranslation();
  const [img, setImg] = useState(EN);
  const [lng, setLng] = useState("EN");

  const ChangeLanguage = () => {
    if (lng === "VN") {
      setLng("EN");
      setImg(EN);
    }else if(lng === "EN") {
      setLng("VN");
      setImg(VN);
    }

    i18n.changeLanguage(lng);
  };
  const navigate = useNavigate();
  const handleUrl=(link:string)=>{
    navigate(link);
  }
  
  const [isOpenSlide, setIsOpenSlide] = useState(false);

  return (
    <>
      <nav className="fixed top-0 shadow-md z-50 w-full bg-nav border-b border-gray-200 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* <button onClick={()=> setIsOpenSlide(!isOpenSlide)} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   ">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button> */}
              <button
                className="flex ms-2 md:me-24"
                onClick={() => setIsOpenSlide(!isOpenSlide)}
              >
                <img src={logo} className="h-8 me-3" alt="LHG" />
                <span className="projectName self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                  DMM
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
        className={`fixed shadow-md top-0 left-0 z-40 w-60 h-screen pt-20 ${
          isOpenSlide
            ? "transition-transform -translate-x-full sm:translate-x-0  "
            : " hidden  sm:translate-x-0"
        } bg-white border-r   translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white text-gray-900">
          <ul className="space-y-2 font-medium">
            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-900">
                 {t('lblHome')}
                </span>
              </button>
            </li>
            <li>
              <button className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-900">
                 {t('lblListDevice')}
                </span>
              </button>
            </li>

        
            <li>
              <button
                onClick={() => ChangeLanguage()}
                className="flex items-center py-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <img src={img} className="w-8  " />
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-900">
                  {t('lblChangeLng')}
                </span>
              </button>
            </li>
            <li>
              <button onClick={()=>handleUrl('/login')}  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
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
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-900">
                  {t('lblLogout')}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className={`p-4    ${isOpenSlide ? "sm:ml-60" : "  "} `}>
        <div className="p-4 border bg-white border-gray-200   min-h-screen border-dashed rounded-lg  mt-14 pt-1 pb-12">
          {children}
        </div>
      </div>
    </>
  );
};

export default MenuBar;
