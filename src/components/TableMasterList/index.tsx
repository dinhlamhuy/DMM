/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCheck } from "react-icons/fa";
import { Equipment } from "../../utils/MasterList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isValid } from "date-fns";
import { useNavigate } from "react-router-dom";
import ModalDetail from "../ModalDetail";
// import moment from "moment";
import { api, config } from "../../utils/linkApi";
import axios from "axios";

interface TableMListProps {
  items: Equipment[] | null;
  DarkMode: boolean;
}

const TableMasterList: React.FC<TableMListProps> = ({ DarkMode, items }) => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [borderColor, setBorderColor] = useState("border-white text-white");
  const [borderColorTH, setBorderColorTH] = useState("border-white ");
  const [selectUniID, setSelectUniID] = useState("");
  const [arrDetail, setarrDetail] = useState<any[]>([]);
  useEffect(() => {
    if (DarkMode) {
      setBorderColor("border-white  text-white");
      setBorderColorTH("border-white ");
    } else {
      setBorderColor("border-black ");
      setBorderColorTH("border-black ");
    }
  }, [DarkMode]);
  const openModal = (unique_ID: string) => {
    setSelectUniID(unique_ID);
    // setarrDetail([
    //   // {
    //   //   unique_ID: unique_ID,
    //   //   CalDate: "2023-11-20",
    //   //   Result: "OK",
    //   // },
    // ]);

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
            date_Calibration:item.date_Calibration,
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

  return (
    <div
      className={`relative  border shadow px-1  h-[45rem]  ${
        DarkMode ? " text-white" : " text-black "
      } w-full overflow-auto `}
    >
      <table
        className=" w-full   h-96  table-fixed"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead
          className={` font-bold sticky top-0  ${
            DarkMode ? "bg-yellow-900" : "bg-yellow-200"
          } `}
        >
          <tr
            className={`border-2  ${
              DarkMode ? "bg-yellow-900" : "bg-yellow-200"
            } `}
          >
            <td
              className={` w-12  border-l-2 border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>No</b> <br /> STT */}
              {t("lblNo")}
            </td>
            <td
              className={` px-0 w-32 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Unique code</b> <br /> Mã số quản lý */}
              {t("lblUniqueCode")}
            </td>
            <td
              className={` w-32 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Factory code</b> <br /> Mã số tài sản */}
              {t("lblFactoryCode")}
            </td>
            <td
              className={`w-72 px-1 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Equipment Name</b> <br /> Tên Thiết Bị */}
              {t("lblEquipmentName")}
            </td>
            <td
              className={` w-20 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Group</b> <br /> Nhóm */}
              {t("lblGroup")}
            </td>
            <td
              className={` w-32 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Photo for reference</b> <br /> Hình ảnh tham khảo */}
              {t("lblPhotoForReference")}
            </td>
            <td
              className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Model</b> <br /> Dòng Thiết Bị */}
              {t("lblModel")}
            </td>
            <td
              className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Device Serial Number</b> <br /> Số Serial Thiết Bị */}
              {t("lblDeviceSerialNumber")}
            </td>
            <td
              className={`w-24 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Brand</b> <br /> Nhãn Hiệu */}
              {t("lblBrand")}
            </td>
            <td
              className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Supplier</b> <br /> Nhà Cung Ứng */}
              {t("lblSupplier")}
            </td>
            <td
              className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Incomming date</b> <br /> Ngày Nhập Dụng Cụ Về */}
              {t("lblIncommingDate")}
            </td>
            <td
              className={` w-72 border-l border-r border-t-2 border-b ${borderColorTH}`}
              colSpan={2}
            >
              {/* <b>Measurement indication</b> <br /> Chỉ định đo lường */}
              {t("lblMeasurementIndication")}
            </td>
            <td
              className={` w-60 border-l border-r border-t-2 border-b ${borderColorTH}`}
              colSpan={2}
            >
              {/* <b>Location</b> <br /> Vị Trí Đặt */}
              {t("lblLocation")}
            </td>
            <td
              className={`w-48  border-l border-r border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Person in charge</b> <br /> Người Phụ Trách */}
              {t("lblPersonInCharge")}
            </td>
            <td
              className={`w-64  border-l border-r border-t-2 border-b ${borderColorTH}`}
              colSpan={2}
            >
              {/* <b>Internal Calibration</b> <br /> Hiệu chuẩn nội bộ */}
              {t("lblInternalCalibration")}
            </td>
            <td
              className={`w-48  border-l border-r border-t-2 border-b ${borderColorTH}`}
              colSpan={2}
            >
              {/* <b>Status</b> <br /> Tình trạng */}
              {t("lblStatus")}
            </td>
            <td
              className={`w-[52rem] relative  border-l border-r border-t-2 border-b ${borderColorTH}`}
              colSpan={5}
            >
              {/* <b>External Calibration</b> <br /> Hiệu chuẩn ngoài */}
              {t("lblExternalCalibration")}
            </td>
            <td
              className={`w-32  border-l border-r-2 border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {/* <b>Remark</b> <br /> Ghi chú */}
              {t("lblRemark")}
            </td>
            <td
              className={`w-32  border-l border-r-2 border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {t("CalibrationDetail")}
            </td>
            <td
              className={`w-32  border-l border-r-2 border-t-2 border-b ${borderColorTH}`}
              rowSpan={2}
            >
              {t("btnEdit")}
            </td>
          </tr>
          <tr
            className={`border  ${
              DarkMode ? "bg-yellow-900" : "bg-yellow-200"
            } `}
          >
            <td className={`border ${borderColorTH}`}>
              {/* <b>Use Purpose/ Machine indication</b> <br /> Mục Đích Sử Dụng/Loại máy */}
              {t("lblUsePurpose_MachineIndication")}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Range</b> <br /> Phạm vi */}
              {t("lblRange")}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Building</b> <br /> Xưởng */}
              {t("lblBuilding")}
            </td>
            <td className={`border  ${borderColorTH}`}>
              {/* <b>Department-Line</b> <br /> Đơn vị-Chuyền */}
              {t("lblDepartment_Line")}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Frequency follow adidas requirement</b> <br /> Tần suất theo adidas */}
              {t("lblFrequencyFollowAdidasRequirement")}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Current Frequency</b> <br /> Tần suất */}
              {t("lblCurrentFrequency")}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>VALID</b> <br /> HỢP LỆ */}
              {t("lblValid")}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>INVALID</b> <br /> KHÔNG HỢP LỆ */}
              {t("lblInValid")}
            </td>
            <td className={` border ${borderColorTH}`}>
              {/* <b>Frequency follow adidas requirement </b><br />   Tần suất theo adidas */}
              {t("lblFrequencyFollowAdidasRequirement")}
            </td>
            <td className={` border ${borderColorTH}`}>
              {/* <b>Certified Calibration Institute/Company </b><br />  Trung tâm Kiểm định */}
              {t("lblCertifiedCalibrationInstitute/Company")}
            </td>
            <td className={` border ${borderColorTH}`}>
              {/* <b>Date Of Calibration</b> <br /> Ngày hiệu chuẩn (YYYY/MM/DD) */}
              {t("lblDateOfCalibration")}
            </td>
            <td className={`  border ${borderColorTH}`}>
              {/* <b>Result</b> <br />   Kết quả */}
              {t("lblResult")}
            </td>
            <td className={`  border ${borderColorTH}`}>
              {/* <b>Date Of Next Calibration</b> <br /> Ngày hiệu chuẩn tiếp theo */}
              {t("lblDateOfNextCalibration")}
            </td>
          </tr>
        </thead>
        <tbody>
          {items ? (
            items.map((item: Equipment, index: number) => {
              const ngayHC = new Date(item.Date_Of_Next);
              const ngayHT = new Date();
              let the;
              if (ngayHC < ngayHT) {
                the = "text-gray-800 font-bold bg-red-400 ";
              }
              return (
                <tr
                  key={"đâs" + index}
                  className={`border-2 ${borderColor}  ${
                    index % 2 != 0
                      ? `  ${DarkMode ? " bg-gray-800" : "bg-gray-300"}`
                      : ""
                  } `}
                >
                  <td className={`border  ${borderColor}`}>{index + 1}</td>
                  <td className={`border ${borderColor}`}>
                    {item.Unique_code}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Factory_code}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Equipment_Name}
                  </td>
                  <td className={`border ${borderColor}`}>{item.Group}</td>
                  <td className={`border ${borderColor}`}>
                    {(item.Photo_for_reference !== "" ||
                      item.Photo_for_reference !== null) && (
                      <img
                        loading="lazy"
                        src={item.Photo_for_reference}
                        className=" object-cover w-full aspect-square"
                        alt=""
                      />
                    )}
                  </td>
                  <td className={`border ${borderColor}`}>{item.Model}</td>
                  <td className={`border ${borderColor}`}>
                    {item.Device_Serial_Number}
                  </td>
                  <td className={`border ${borderColor}`}>{item.Brand}</td>
                  <td className={`border ${borderColor}`}>{item.Supplier}</td>
                  <td className={`border ${borderColor}`}>
                    {/* {item.Incomming_date} */}
                    {isValid(new Date(item.Incomming_date))
                      ? item.Incomming_date
                      : ""}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Use_Purpose_Machine_indication}
                  </td>
                  <td className={`border ${borderColor}`}>{item.Range}</td>
                  <td className={`border ${borderColor}`}>{item.Building}</td>
                  <td className={`border px-1 ${borderColor}`}>
                    {item.Department_Line}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Person_in_charge}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Frequency_follow_adidas_requirement}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Current_Frequency}
                  </td>
                  {item.Valid == "OK" ? (
                    <>
                      <td className={`bg-green-400 border ${borderColor} `}>
                        <div className=" text-center px-auto flex justify-center items-center ">
                          <FaCheck className=" w-fit text-2xl font-bold  " />
                        </div>
                      </td>
                      <td className={`border ${borderColor}`}></td>
                    </>
                  ) : (
                    <>
                      <td className={`border ${borderColor}`}></td>
                      <td className={`border ${borderColor} bg-red-400`}>
                        <div className=" text-center px-auto flex justify-center items-center  ">
                          <FaCheck className=" w-fit text-2xl font-bold  " />
                        </div>
                      </td>
                    </>
                  )}

                  <td className={` border ${borderColor}`}>
                    {item.Frequency_follow_adidas_requirement2}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Certified_Calibration_Institute_Company}
                  </td>
                  <td className={` border ${borderColor}`}>
                    {/* {item.Date_Of_Calibration} */}
                    {isValid(new Date(item.Date_Of_Calibration))
                      ? item.Date_Of_Calibration
                      : ""}
                  </td>
                  <td className={` border ${borderColor}`}>
                    {item.Result_Company === "OK" ? "PASS" : "FAIL"}
                  </td>
                  <td className={`border ${borderColor} `}>
                    {/* {item.Date_Of_Next} */}
                    <div className={`${the}`}>
                      {isValid(new Date(item.Date_Of_Next))
                        ? item.Date_Of_Next
                        : ""}
                    </div>
                  </td>
                  <td className={`border   ${borderColor}`}>{item.Remarky}</td>
                  <td className={`border   ${borderColor}`}>
                    <button
                      onClick={() => openModal(item.Unique_code)}
                      className={`p-1 btn  text-gray-500 font-bold rounded`}
                    >
                      {t("SeeDetails")}
                    </button>
                  </td>
                  <td className={`border   ${borderColor}`}>
                    <button
                      onClick={() => handleClick(item.Unique_code)}
                      className="p-1   text-blue-600 font-bold rounded"
                    >
                      {t("btnEdit")}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>

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
  );
};

export default TableMasterList;
