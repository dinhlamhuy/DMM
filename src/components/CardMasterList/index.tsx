/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCheck } from "react-icons/fa";
import { Equipment } from "../../utils/MasterList";
// import { IoCloseSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { isValid } from "date-fns";
import { FiEdit3 } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import ModalDetail from "../ModalDetail";
import { useState } from "react";
// import moment from "moment";
import axios from "axios";
import { api, config } from "../../utils/linkApi";
interface CardMListProps {
  items: Equipment[];
  DarkMode: boolean;
}
const CardMasterList: React.FC<CardMListProps> = ({ DarkMode, items }) => {
  const { t } = useTranslation();

  const [selectUniID, setSelectUniID] = useState("");
  const [arrDetail, setarrDetail] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (unique_ID: string) => {
    setSelectUniID(unique_ID);
    getDataDetailCali(unique_ID);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const navigate = useNavigate();
  const handleClick = (unique_ID: string) => {
    navigate("/", { state: { data: unique_ID } });
  };

  const getDataDetailCali = (unique_ID: string) => {
    const url = api + "/api/Device/See_More_Calibration_Info";
    // setIsLoading(true);
    const data = {
      unique_ID: unique_ID,
    };
    axios
      .post(url, data, config)
      .then((response: any) => {
        // resetValues();
        if (response.data !== null) {
          const arr = response.data.map((item: any, index: number) => ({
            No: index + 1,
            // unique_ID: item.unique_ID,
            result: item.result,
            evaluation: item.evaluation,
            date_Calibration: item.date_Calibration,
            file_Upload: item.file_Upload,
          }));

          setarrDetail(arr);
          console.log(arr);
        }
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  return items.map((item: Equipment, index: number) => {
    const ngayHC = new Date(item.Date_Of_Next);
    const ngayHT = new Date();
    let the;
    if (ngayHC < ngayHT) {
      the = " text-white font-bold  bg-red-900 px-2";
    }

    return (
      <div
        key={`Equi` + index}
        className={` ${
          DarkMode
            ? `bg-whitse   ${
                item.Valid === "OK" ? "bg-[#96FFC6]" : "bg-[#FF969A]"
              }`
            : ` bg-ambser-50  ${
                item.Valid === "OK" ? "bg-[#96FFC6]" : "bg-[#FF969A]"
              }    `
        } rounded-lg shadow   flex justify-center w-full p-2  group/item  `}
      >
        <div className="container pt-1    gird grid-flow-row auto-rows-max">
          <div className="  flex flex-col md:flex-row ">
            <div className="w-48 h-48 flex-none justify-center items-center my-auto mr-2">
              {(item.Photo_for_reference !== "" ||
                      item.Photo_for_reference !== null) && (
                <img
                  src={item.Photo_for_reference}
                  loading="lazy"
                  alt=""
                  className="w-48 h-48  rounded-lg  object-cover"
                />
              )}
            </div>
            <div className="   flex ml-2">
              <div className=" grid grid-cols-2 md:gap-x-5 text-left">
                <div className=" font-bold text-2xl col-span-2 text-center ">
                  <p className="flex">
                    {item.Equipment_Name} &ensp;
                    <button
                      onClick={() => handleClick(item.Unique_code)}
                      className="group/edit invisible  group-hover/item:visible  border px-2 py-1 bg-slate-500 text-white rounded-lg"
                    >
                      <FiEdit3 />
                    </button>
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblUniqueCode")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Unique_code}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblFactoryCode")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Factory_code}</span>
                </div>

                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblModel")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Model}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800">
                    {" "}
                    {t("lblDeviceSerialNumber")}:{" "}
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Device_Serial_Number}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblSupplier")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Supplier}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800">
                    {" "}
                    {t("lblBrand")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Brand}</span>
                </div>

                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblGroup")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Group}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblIncommingDate")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {/* {item.Incomming_date} */}
                    {isValid(new Date(item.Incomming_date))
                      ? item.Incomming_date
                      : ""}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblPersonInCharge")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Person_in_charge}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-800">
                    {t("lblRange")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Range}</span>
                </div>

                <div className="col-span-2">
                  <span className="text-xs text-gray-800">
                    {t("lblUsePurpose_MachineIndication")}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Use_Purpose_Machine_indication}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="  grid text-left  lg:mt-1 px-3 gap-y-4  h-fit flex  items-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2 h-fit  ">
              <div className="flex items-center flex-wrap  ">
                <span className="text-xs text-gray-800">
                  {t("lblBuilding")}:
                </span>
                &ensp;
                <span className="text-xs font-bold">{item.Building}</span>
              </div>
              <div className="flex items-center flex-wrap gap-x-2">
                <span className="text-xs text-gray-800 ">
                  {t("lblDepartment_Line")}:
                </span>
                <span className="text-xs font-bold">
                  {item.Department_Line}
                </span>
              </div>

              <div className="flex  items-center   gap-x-3">
                <span className="text-xs text-gray-800 items-center ">
                  {t("lblStatus")}:
                </span>
                <span className="text-xs font-bold">
                  {item.Valid === "OK" ? (
                    <FaCheck className="  text-2xl font-bold text-green-500 " />
                  ) : (
                    <IoClose className="  text-3xl font-bold text-red-500 " />
                  )}
                </span>
              </div>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-3 mt-1 lg:mt-0 gap-x-2  px-1 pb-1 backdrop-blur-sm ${
                DarkMode ? "bg-yellow-50/50" : "bg-white/50"
              }
            relative  h-fit gap-y-1  rounded-md`}
            >
              <div
                style={{ fontSize: "8px" }}
                className={`col-span-3 absolute  -top-3  ml-1 backdrop-blur-sm  ${
                  DarkMode ? "bg-yellow-50/50" : "bg-white/50"
                }  text-center  flex justify-center
               text-gray-500    font-bold rounded-t-md px-1`}
              >
                {t("lblInternalCalibration")}
              </div>

              <div
                className="lg:mt-2   h-fit flex gap-x-4 w-fit flex-wrap
              "
              >
                <span className="text-xs text-gray-800">
                  {t("lblFrequencyFollowAdidasRequirement")}:
                </span>{" "}
                <span className="text-xs font-bold">
                  {item.Frequency_follow_adidas_requirement}
                </span>
              </div>

              <div className="lg:mt-2 h-fit flex gap-x-4 w-fit flex-wrap">
                <span className="text-xs text-gray-800    ">
                  {t("lblCurrentFrequency")}:
                </span>{" "}
                <span className="text-xs font-bold">
                  {item.Current_Frequency}
                </span>
              </div>

              <div className="lg:mt-2 h-fit flex gap-x-4 flex-wrap">
                <span className="text-xs text-gray-800">
                  {t("lblCertifiedCalibrationInstitute/Company")}:
                </span>{" "}
                <span className="text-xs font-bold">
                  {item.Certified_Calibration_Institute_Company}
                </span>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-x-2  px-1  pb-1 items-center ${
                DarkMode ? "bg-yellow-50/50" : "bg-white/50"
              } 
              h-fit gap-y-1 flex mt-2 relative  rounded-md backdrop-blur-xl  items-center`}
            >
              <div
                style={{ fontSize: "8px" }}
                className={`col-span-3 absolute   -top-3   ml-1 backdrop-blur-xl ${
                  DarkMode ? "bg-yellow-50/50" : "bg-white/50"
                }  text-center flex justify-center
             text-gray-500    font-bold rounded-t-md px-1  `}
              >
                {t("lblExternalCalibration")}
              </div>
              <div className="lg:mt-2 flex-wrap flex w-fit gap-x-4">
                <span className="text-xs text-gray-800">
                  {t("lblFrequencyFollowAdidasRequirement")}:
                </span>

                <span className="text-xs font-bold">
                  {item.Frequency_follow_adidas_requirement2}
                </span>
              </div>
              <div className="lg:mt-2 flex-wrap flex w-fit gap-x-4 ">
                <span className="text-xs text-gray-800">
                  {t("lblDateOfCalibration")}:
                </span>

                <span className="text-xs font-bold">
                  {/* {item.Date_Of_Calibration} */}
                  {isValid(new Date(item.Date_Of_Calibration))
                    ? item.Date_Of_Calibration
                    : ""}
                </span>
              </div>
              <div className="lg:mt-2 flex-wrap flex w-fit gap-x-4">
                <span className="text-xs text-gray-800">
                  {t("lblDateOfNextCalibration")}:
                </span>

                <span className={`text-xs font-bold ${the}`}>
                  {" "}
                  {isValid(new Date(item.Date_Of_Next))
                    ? item.Date_Of_Next
                    : ""}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
              <div className="text-xs text-gray-800 cols-span-2">
                {t("lblRemark")}:&ensp;{item.Remarky}
              </div>
              <div className=""></div>
              <div className="">
                <span className="text-xs text-gray-800">{t("lblResult")}:</span>
                &ensp;
                <button onClick={() => openModal(item.Unique_code)}>
                  {item.Result_Company === "OK" ? (
                    <span className="text-md font-bold text-blue-700 ">
                      Pass
                    </span>
                  ) : (
                    <span className="text-md font-bold text-red-700 ">
                      Fail
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <ModalDetail
        isOpen={modalIsOpen}
        onClose={closeModal}
        DarkMode={DarkMode}
      >
        <>
          <button
            onClick={closeModal}
            className="btn  -mt-4  text-4xl font-bold right-0 absolute  rounded-full"
          >
            &times;
          </button>
          <h1 className="mt-5 p-3 uppercase text-xl font-bold">
            {t("lblTitle")}:{selectUniID}
          </h1>
          <div>
            <table
              className=" w-full border   table-fixed "
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: "10%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    className="border bg-gray-400"
                  >
                    {t("lblNo")}
                  </th>
                  <th
                    style={{
                      width: "35%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    className="border bg-gray-400"
                  >
                    {t("lblDateOfCalibration")}
                  </th>
                  <th
                    style={{
                      width: "45%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    className="border bg-gray-400"
                  >
                    {t('Content')}
                  </th>
                  <th
                    style={{
                      width: "45%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    className="border bg-gray-400"
                  >
                    {t("lblResult")}
                  </th>
                  <th
                    style={{
                      width: "45%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    className="border bg-gray-400"
                  >
                    Calibration report
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrDetail ? (
                  arrDetail.map((item: any) => (
                    <tr className=" text-center ">
                      <td className="border">{item.No}</td>
                      <td className="border">{item.date_Calibration}</td>
                      <td className="border">{item.result}</td>
                      <td className="border">{item.evaluation}</td>
                      <td className="border">{item.file_Upload}</td>
                    </tr>
                  ))
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      </ModalDetail>
      </div>
      // </div>
    );
  });
};

export default CardMasterList;
