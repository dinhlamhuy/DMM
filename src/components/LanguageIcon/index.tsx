import { useEffect, useState } from "react";
import EN from "../../../public/img/en.png";
import VN from "../../../public/img/vn.png";
import { useTranslation } from "react-i18next";

const LanguageIcon = () => {
  const [lng, setLng] = useState("VN");
  const { i18n } = useTranslation();

  useEffect(() => {
    // console.log("Changing language to:", lng);
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <div className="grid gap-6 grid-flow-col auto-cols-max justify-center">
      <button
        className={`${lng == "VN" ? "ring" : ""} rounded-full`}
        onClick={() => setLng("VN")}
      >
        <img src={VN} />
      </button>

      <button
        className={`${lng == "EN" ? "ring" : ""} rounded-full`}
        onClick={() => setLng("EN")}
      >
        <img src={EN} />
      </button>
    </div>
  );
};

export default LanguageIcon;
