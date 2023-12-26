/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import {   useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import "./login.css";

import { useTranslation } from "react-i18next";

import LanguageIcon from "../../components/LanguageIcon";
import axios from "axios";
import { api, config } from "../../utils/linkApi";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [UserID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [Open, setOpen] = useState("hopclose");
  const PlaceholderUser = t("lblUserID");
  const PlaceholderPass = t("lblPassword");
  // useEffect(() => {
  //   localStorage.removeItem("User");
  // }, []); 
  // const dataUser = localStorage.getItem("User");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    const url = api + "/api/User/Sign_In";

    const data = {
      user_Id: UserID,
      user_Password: password,
    };
    axios
      .post(url, data, config)
      .then((response: any) => {
        if (response.data.result === true) {
          const dataString = JSON.stringify(response.data);
          localStorage.setItem("User", dataString);
          navigate("/");
        } else {
          alert("Thất bai");
        }
      })
      .finally(() => {});
  };
 

  return (
    <div className="screen">
      <div
        className={`hop  ${Open} `}
        onClick={() => {
          setOpen("hopopen");
        }}
      >
        <div className="login">
          <div className="loginBx">
            <h2 className="titleNameLogin">
              <i className="fa-solid fa-right-to-bracket"></i>

              {t("lblLogin")}
              <i className="fa-solid fa-heart"></i>
            </h2>
            <input
              type="text"
              placeholder={PlaceholderUser}
              onChange={(e) => {
                setUserID(e.target.value);
              }}
              value={UserID}
            />
            {/* <label htmlFor="" className="absolute top-16 text-left left-4 flex bg-black px-2 bg-teal-700 text-white">UserID</label> */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder={PlaceholderPass}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              className="absolute top-1/2 right-4 transform 
              -translate-y-1/4 cursor-pointer text-2xl"
              onClick={handleTogglePassword}
            >
              {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
            </button>
            {/* <input type="radio" name="" id="" /> */}

            {/* <input type="submit" value="Sign In" /> */}

            <button className="btnSubmit " onClick={handleLogin}>
              {t("lblLogin")}
            </button>

            <div className="nhom flex justify-center">
              <LanguageIcon />
            </div>
          </div>
        </div>
      </div>
    </div>

    /* 
        
          <div className=" bg-blue-50 h-screen w-screen items-center justify-center flex bgal ">
      <div
        className="container px-1.5 py-2 w-4/5 xs:w-4/5  md:w-3/5 lg:w-3/5 xl:w-2/5  h-2/4
        place-items-center place-content-center backdrop-blur-md bg-white/30 shadow-lg border-7  rounded-lg "
      >
        <div className=" relative  -mt-24 justify-center flex"><img src={avatar} className="flex  bg-white rounded-full border-3 border-white/30  border-blur-md bg-white/100  p-0  m-0 flex border object-cover object-fill" /></div>
        <div className="grid gap-5 p-5 ">
          <div className="font-bold text-4xl text-gray-400">
            { t("lblLogin") as string}
          </div>
          <div className="px-10">
            <TextInput label={t("lblUserID") as string} TextChange={(value: any) => { setUserID(value); }} value={UserID} keys="UserID"
            />
          </div>
          <div className="px-10">
            <PassInput label={t("lblPassword") as string} TextChange={(value: any) => { setPassword(value); }} value={password} keys="Password"
            />
          </div>
          <div>
            <button className="btn border-4 ring font-bold text-gray-500 border-gray-200 px-9 py-3 shadow bg-white rounded-full ">
              {t("lblLogin")}
            </button>
          </div>
          <div className="flex items-center  ">
                <div className="border h-1 shadow border-gray-300 flex-grow"></div>
                <div className="px-3 text-gray-500 text-md font-bold bg-gray-50 border rounded-full shadow ">
                  {t("lblChangeLng")}
                </div>
                <div className=" border h-1 shadow border-gray-300 flex-grow"></div>
              </div>
         
        </div>   </div>
     </div> */
  );
};

export default LoginScreen;
