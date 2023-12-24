import {  useState } from "react";
import EN from "../../../public/img/en.png";
import VN from "../../../public/img/vn.png";
import { useTranslation } from "react-i18next";


const LanguageIcon = () => {
  const { i18n } = useTranslation();


const DefautLng = localStorage.getItem('Lng');

  const [lng, setLng] = useState(DefautLng === null ? "VN" : DefautLng);
  const handleChangelng = (lngs: string) => {
    if (lngs !== lng) {
      setLng(lngs);
      i18n.changeLanguage(lngs);
      localStorage.setItem('Lng', lngs);
    }
  }
  return (
    <div className="grid gap-6 grid-flow-col auto-cols-max justify-center">
      <button
        className={`${lng == "VN" ? "ring" : ""} rounded-full`}
        onClick={() => handleChangelng("VN")}
      >
        <img src={VN} />
      </button>

      <button
        className={`${lng == "EN" ? "ring" : ""} rounded-full`}
        onClick={() => handleChangelng("EN")}
      >
        <img src={EN} />
      </button>
    </div>
  );
};

export default LanguageIcon;
