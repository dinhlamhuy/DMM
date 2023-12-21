/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import "./login.css";
import TextInput from "../../components/TextInput";
import EN from "../../../public/img/en.png";
import VN from "../../../public/img/vn.png";
import { useTranslation } from "react-i18next";
import PassInput from "../../components/PassInput";
import avatar from "../../../public/img/avatar.gif";


const LoginScreen = () => {
  const { t, i18n } = useTranslation();
  const [lng, setLng] = useState("VN");
  const [UserID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const ChangeLanguage = (language: any) => {
    if (language === "VN") {
      setLng("EN");
    } else if (language === "EN") {
      setLng("VN");
    }
  };
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <div className=" bg-blue-50 h-screen w-screen items-center justify-center flex bgal ">
      <div
        className="container px-1.5 py-2 w-4/5 xs:w-4/5  md:w-3/5 lg:w-3/5 xl:w-2/5  h-2/4
        place-items-center place-content-center backdrop-blur-md bg-white/30 shadow-lg border-7  rounded-lg "
      >
        <div className=" relative  -mt-24 justify-center flex"><img src={avatar} className="flex  bg-white rounded-full border-3 border-white/30  border-blur-md bg-white/100  p-0  m-0 flex border object-cover object-fill" /></div>
        <div className="grid gap-5 p-5 ">
          <div className="font-bold text-4xl text-gray-400">
            { t("lblLogin") }
          </div>
          <div className="px-10">
            <TextInput label={t("lblUserID")} TextChange={(value: any) => { setUserID(value); }} value={UserID} keys="UserID"
            />
          </div>
          <div className="px-10">
            <PassInput label={t("lblPassword")} TextChange={(value: any) => { setPassword(value); }} value={password} keys="Password"
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
          <div className="grid gap-6 grid-flow-col auto-cols-max justify-center">
            <button
              className={`${lng == "VN" ? "ring" : ""} rounded-full`}
              onClick={() => ChangeLanguage("EN")}
            >
              <img src={VN} />
            </button>
         
            <button
              className={`${lng == "EN" ? "ring" : ""} rounded-full`}
              onClick={() => ChangeLanguage("VN")}
            >
              <img src={EN} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
