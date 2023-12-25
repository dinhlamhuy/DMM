/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCheck } from "react-icons/fa";
import { Equipment } from "../../utils/MasterList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface TableMListProps {
  label: string | null;
  keys: string | undefined;
  items: Equipment[] | null;
  DarkMode: boolean;
}

const TableMasterList: React.FC<TableMListProps> = ({ DarkMode, items }) => {
  const {t}=useTranslation()
  const [borderColor, setBorderColor] = useState("border-white text-white");
  const [borderColorTH, setBorderColorTH] = useState("border-white ");
  useEffect(() => {
    if (DarkMode) {
      setBorderColor("border-white text-white");
      setBorderColorTH("border-white ");
    } else {
      setBorderColor("border-black ");
      setBorderColorTH("border-black ");
    }
  }, [DarkMode]);
  return (
    <div
      className={`relative  border shadow px-1  h-[45rem]  ${
        DarkMode ? " text-white" : " text-black "
      } w-full overflow-auto `}
    >
      <table className=" w-full   h-96  table-fixed" style={{ borderCollapse: 'separate', borderSpacing: 0}}>
        <thead className={` font-bold sticky top-0  ${DarkMode ? "bg-yellow-900" : "bg-yellow-200"} `}>
          <tr className={`border-2  ${DarkMode ? "bg-yellow-900" : "bg-yellow-200"} `}>
            <td className={` w-12  border-l-2 border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>No</b> <br /> STT */}
              {t('lblNo')}

            </td>
            <td className={` px-0 w-32 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Unique code</b> <br /> Mã số quản lý */} 
              {t('lblUniqueCode')}
            </td>
            <td className={` w-32 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Factory code</b> <br /> Mã số tài sản */} 
              {t('lblFactoryCode')}
            </td>
            <td className={`w-72 px-1 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Equipment Name</b> <br /> Tên Thiết Bị */} 
              {t('lblEquipmentName')}
            </td>
            <td className={` w-20 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Group</b> <br /> Nhóm */} 
              {t('lblGroup')}
            </td>
            <td className={` w-32 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Photo for reference</b> <br /> Hình ảnh tham khảo */} 
              {t('lblPhotoForReference')}
            </td>
            <td className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Model</b> <br /> Dòng Thiết Bị */} 
              {t('lblModel')}
            </td>
            <td className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Device Serial Number</b> <br /> Số Serial Thiết Bị */} 
              {t('lblDeviceSerialNumber')}
            </td>
            <td className={`w-24 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Brand</b> <br /> Nhãn Hiệu */} 
              {t('lblBrand')}
            </td>
            <td className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Supplier</b> <br /> Nhà Cung Ứng */} 
              {t('lblSupplier')}
            </td>
            <td className={`w-32 border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Incomming date</b> <br /> Ngày Nhập Dụng Cụ Về */} 
              {t('lblIncommingDate')}
            </td>
            <td className={` w-72 border-l border-r border-t-2 border-b ${borderColorTH}`} colSpan={2}>
              {/* <b>Measurement indication</b> <br /> Chỉ định đo lường */} 
              {t('lblMeasurementIndication')}
            </td>
            <td className={` w-60 border-l border-r border-t-2 border-b ${borderColorTH}`} colSpan={2}>
              {/* <b>Location</b> <br /> Vị Trí Đặt */} 
              {t('lblLocation')}
            </td>
            <td className={`w-48  border-l border-r border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Person in charge</b> <br /> Người Phụ Trách */} 
              {t('lblPersonInCharge')}
            </td>
            <td className={`w-64  border-l border-r border-t-2 border-b ${borderColorTH}`} colSpan={2}>
              {/* <b>Internal Calibration</b> <br /> Hiệu chuẩn nội bộ */} 
              {t('lblInternalCalibration')}
            </td>
            <td className={`w-48  border-l border-r border-t-2 border-b ${borderColorTH}`} colSpan={2}>
              {/* <b>Status</b> <br /> Tình trạng */} 
              {t('lblStatus')}
            </td>
            <td className={`w-[52rem] relative  border-l border-r border-t-2 border-b ${borderColorTH}`} colSpan={5}>
              {/* <b>External Calibration</b> <br /> Hiệu chuẩn ngoài */} 
              {t('lblExternalCalibration')}
            </td>
            <td className={`w-32  border-l border-r-2 border-t-2 border-b ${borderColorTH}`} rowSpan={2}>
              {/* <b>Remark</b> <br /> Ghi chú */} 
              {t('lblRemark')}
            </td>
          </tr>
          <tr className={`border  ${DarkMode ? "bg-yellow-900" : "bg-yellow-200"} `}>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Use Purpose/ Machine indication</b> <br /> Mục Đích Sử Dụng/Loại máy */} 
              {t('lblUsePurpose_MachineIndication')}
              
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Range</b> <br /> Phạm vi */} 
              {t('lblRange')}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Building</b> <br /> Xưởng */} 
              {t('lblBuilding')}
            </td>
            <td className={`border  ${borderColorTH}`}>
              {/* <b>Department-Line</b> <br /> Đơn vị-Chuyền */} 
              {t('lblDepartment_Line')}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Frequency follow adidas requirement</b> <br /> Tần suất theo adidas */} 
              {t('lblFrequencyFollowAdidasRequirement')}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>Current Frequency</b> <br /> Tần suất */} 
              {t('lblCurrentFrequency')}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>VALID</b> <br /> HỢP LỆ */} 
              {t('lblValid')}
            </td>
            <td className={`border ${borderColorTH}`}>
              {/* <b>INVALID</b> <br /> KHÔNG HỢP LỆ */} 
              {t('lblInValid')}
            </td>
            <td className={` border ${borderColorTH}`}>
              {/* <b>Frequency follow adidas requirement </b><br />   Tần suất theo adidas */} 
              {t('lblFrequencyFollowAdidasRequirement')}
            </td>
            <td className={` border ${borderColorTH}`}>
              {/* <b>Certified Calibration Institute/Company </b><br />  Trung tâm Kiểm định */} 
              {t('lblCertifiedCalibrationInstitute/Company')}
            </td>
            <td className={` border ${borderColorTH}`}>
              {/* <b>Date Of Calibration</b> <br /> Ngày hiệu chuẩn (YYYY/MM/DD) */} 
              {t('lblDateOfCalibration')}
            </td>
            <td className={`  border ${borderColorTH}`}>
              {/* <b>Result</b> <br />   Kết quả */} 
              {t('lblResult')}
            </td>
            <td className={`  border ${borderColorTH}`}>
              {/* <b>Date Of Next Calibration</b> <br /> Ngày hiệu chuẩn tiếp theo */}
              {t('lblDateOfNextCalibration')}
            
            </td>
          </tr>
        </thead>
        <tbody>
          {items
            ? items.map((item: Equipment, index: number) => (
                <tr key={'đâs'+index} className={`border-2 ${borderColor}  ${index %2 !=0 ? `  ${DarkMode ? " bg-gray-800":"bg-gray-300"}`  : ''} `}>
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
                    <img
                      src={item.Photo_for_reference}
                      className="w-full"
                      alt=""
                    />
                  </td>
                  <td className={`border ${borderColor}`}>{item.Model}</td>
                  <td className={`border ${borderColor}`}>
                    {item.Device_Serial_Number}
                  </td>
                  <td className={`border ${borderColor}`}>{item.Brand}</td>
                  <td className={`border ${borderColor}`}>{item.Supplier}</td>
                  <td className={`border ${borderColor}`}>
                    {item.Incomming_date}
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
                  {item.Valid == "VALID" ? (
                    <>
                      <td className={`border ${borderColor} bg-green-300`}>
                        <div className=" text-center px-auto flex justify-center items-center ">
                          <FaCheck className=" w-fit text-2xl font-bold  " />
                        </div>
                      </td>
                      <td className={`border ${borderColor}`}></td>
                    </>
                  ) : (
                    <>
                      
                      <td className="border border-black border-black"></td>
                      <td className={`border ${borderColor} bg-red-300`}>
                        <div className=" text-center px-auto flex justify-center items-center  ">
                          <FaCheck className=" w-fit text-2xl font-bold  " />
                        </div>
                      </td>
                    </>
                  )}

                  <td className={` border ${borderColor}`}>
                    {item.Frequency_follow_adidas_requirement}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Certified_Calibration_Institute_Company}
                  </td>
                  <td className={` border ${borderColor}`}>
                    {item.Date_Of_Calibration}
                  </td>
                  <td className={` border ${borderColor}`}>
                    {item.Result_Company}
                  </td>
                  <td className={`border ${borderColor}`}>
                    {item.Date_Of_Next}
                  </td>
                  <td className={`border   ${borderColor}`}>{item.Remarky}</td>
                </tr>
              ))
            : ( <tr></tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default TableMasterList;
