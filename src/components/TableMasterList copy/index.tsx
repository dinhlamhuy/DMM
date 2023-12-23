/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCheck } from "react-icons/fa";
import { Equipment } from "../../utils/MasterList";
import { useEffect, useState } from "react";

interface TableMListProps {
  label: string | null;
  keys: string | undefined;
  items: Equipment[] | null;
  DarkMode: boolean;
}
const TableMasterList: React.FC<TableMListProps> = ({ DarkMode, items }) => {
  const [borderColor, setBorderColor] = useState("border-white");
  const [borderColorTH, setBorderColorTH] = useState("border-white ");
  useEffect(() => {
    if (DarkMode) {
      setBorderColor("border-white");
      setBorderColorTH("border-white ");
    } else {
      setBorderColor("border-black");
      setBorderColorTH("border-black");
    }
  }, [DarkMode]);
  return (
    <div
      className={` ${
        DarkMode ? " text-white" : " text-black "
      } w-full overflow-x-auto `}
    >
      <table className=" w-full    table-fixed">
        <thead>
          <tr className={` ${DarkMode ? "bg-yellow-900" : "bg-yellow-200"} `}>
            <th className={` w-12  border-2 ${borderColorTH}`} rowSpan={2}>
              No
            </th>
            <th className={` w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Unique code <br /> Mã số quản lý
            </th>
            <th className={` w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Factory code <br /> Mã số tài sản
            </th>
            <th className={`w-64 border-2 ${borderColorTH}`} rowSpan={2}>
              Equipment Name <br /> Tên Thiết Bị
            </th>
            <th className={` w-20 border-2 ${borderColorTH}`} rowSpan={2}>
              Group <br /> Nhóm
            </th>
            <th className={` w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Photo for reference <br /> Hình ảnh tham khả
            </th>
            <th className={`w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Model <br /> Dòng Thiết Bị
            </th>
            <th className={`w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Device Serial Number <br /> Số Serial Thiết Bị
            </th>
            <th className={`w-24 border-2 ${borderColorTH}`} rowSpan={2}>
              Brand <br /> Nhãn Hiệu
            </th>
            <th className={`w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Supplier <br /> Nhà Cung Ứng
            </th>
            <th className={`w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Incomming date <br /> Ngày Nhập Dụng Cụ Về
            </th>
            <th className={` w-72 border-2 ${borderColorTH}`} colSpan={2}>
              Measurement indication <br /> Chỉ định đo lường
            </th>
            <th className={` w-48 border-2 ${borderColorTH}`} colSpan={2}>
              Location <br /> Vị Trí Đặt
            </th>
            <th className={`w-48 border-2 ${borderColorTH}`} rowSpan={2}>
              Person in charge <br /> Người Phụ Trách
            </th>
            <th className={`w-64 border-2 ${borderColorTH}`} colSpan={2}>
              Internal Calibration <br /> Hiệu chuẩn nội bộ
            </th>
            <th className={`w-48 border-2 ${borderColorTH}`} colSpan={2}>
              Status <br /> Tình trạng
            </th>
            <th className={`w-[52rem] relative border-2 ${borderColorTH}`} colSpan={5}>
              External Calibration <br /> Hiệu chuẩn ngoài
            </th>
            <th className={`w-32 border-2 ${borderColorTH}`} rowSpan={2}>
              Remark <br /> Ghi chú
            </th>
          </tr>
          <tr className={` ${DarkMode ? "bg-yellow-900" : "bg-yellow-200"} `}>
            <th className={`border-2 ${borderColorTH}`}>
              Use Purpose/ Machine indication <br /> Mục Đích Sử Dụng/Loại máy
              sử dụng
            </th>
            <th className={`border-2 ${borderColorTH}`}>
              Range <br /> Phạm vi
            </th>
            <th className={`border-2 ${borderColorTH}`}>
              Building <br /> Xưởng
            </th>
            <th className={`border-2 ${borderColorTH}`}>
              Department-Line <br /> Đơn vị-Chuyền
            </th>
            <th className={`border-2 ${borderColorTH}`}>
              Frequency follow adidas requirement <br /> Tần suất theo adidas
            </th>
            <th className={`border-2 ${borderColorTH}`}>
              Current Frequency <br /> Tần suất
            </th>
            <th className={`border-2 ${borderColorTH}`}>
              VALID <br /> HỢP LỆ
            </th>
            <th className={`border-2 ${borderColorTH}`}>
              INVALID <br /> KHÔNG HỢP LỆ
            </th>
            <th className={` border-2 ${borderColorTH}`}>
              Frequency follow adidas requirement <br />
              Tần suất theo adidas
            </th>
            <th className={` border-2 ${borderColorTH}`}>
              Certified Calibration Institute/Company <br />
              Trung tâm Kiểm định
            </th>
            <th className={` border-2 ${borderColorTH}`}>
              Date Of Calibration <br /> Ngày hiệu chuẩn (YYYY/MM/DD)
            </th>
            <th className={`  border-2 ${borderColorTH}`}>
              Result <br />
              Kết quả
            </th>
            <th className={`  border-2 ${borderColorTH}`}>
              Date Of Next Calibration <br /> Ngày hiệu chuẩn tiếp theo
            </th>
          </tr>
        </thead>
        <tbody>
          {items
            ? items.map((item: Equipment, index: number) => (
                <tr key={index} className="border-2">
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
                  <td className={`border ${borderColor}`}>
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
                        <div className=" text-center px-auto flex justify-center items-center relative ">
                          <FaCheck />
                        </div>
                      </td>
                      <td className={`border ${borderColor}`}></td>
                    </>
                  ) : (
                    <>
                      {" "}
                      <td className="border border-black border-black"></td>
                      <td className={`border ${borderColor} bg-red-300`}>
                        <div className=" text-center px-auto flex justify-center items-center relative ">
                          <FaCheck />
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
                  <td className={`border ${borderColor}`}>{item.Remarky}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default TableMasterList;
