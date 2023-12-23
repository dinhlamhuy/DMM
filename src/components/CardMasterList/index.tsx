/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCheck } from "react-icons/fa";
import { Equipment } from "../../utils/MasterList";

interface CardMListProps {
  label: string | null;
  keys: string | undefined;
  items: Equipment[];
  DarkMode: boolean;
}
const CardMasterList: React.FC<CardMListProps> = ({ DarkMode, items }) => {
  return items.map((item: Equipment, index: number) => {
    return (
      <div
        key={`Equi` + index}
        className={` ${
          DarkMode ? "bg-white  " : " bg-amber-100 "
        } rounded-lg shadow  h-fit flex justify-center w-full p-2`}
      >
        <div className="container pt-2    gird grid-flow-row auto-rows-max">
          <div className="flex">
            <div className="w-3/12 h-3/12 rounded-md border-2 border-black shadow-xl  border justify-center items-center my-auto flex ">
              <img
                src={item.Photo_for_reference}
                alt=""
                className="w-full h-fit "
              />
            </div>
            <div className="font-bold text-lg grid grid-cols-1 text-center">
              <div>{item.Equipment_Name}</div>
              <div className="flex gap-2 justify-center px-2">
                <table className=" w-full text-left ">
                  <tr className="">
                    <td className="w-fit">
                      <span className="text-xs text-teal-800">
                        Unique code:
                      </span>
                      &ensp;
                      <span className="text-xs">{item.Unique_code}</span>
                    </td>
                    <td className="w-fit"></td>
                    <td className="w-fit">
                      <span className="text-xs text-teal-800">
                        Factory code:
                      </span>
                      &ensp;
                      <span className="text-xs">{item.Factory_code}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-xs text-teal-800">Model:</span>
                      &ensp;
                      <span className="text-xs">{item.Model}</span>
                    </td>
                    <td></td>
                    <td>
                      <span className="text-xs text-teal-800">
                        Serial Number:
                      </span>
                      &ensp;
                      <span className="text-xs">
                        {item.Device_Serial_Number}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-xs text-teal-800">Brand:</span>
                      &ensp;
                      <span className="text-xs">{item.Brand}</span>
                    </td>
                    <td></td>
                    <td>
                      <span className="text-xs text-teal-800">Supplier:</span>
                      &ensp;
                      <span className="text-xs">{item.Supplier}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-xs text-teal-800">
                        Incomming Date:
                      </span>
                      &ensp;
                      <span className="text-xs">{item.Incomming_date}</span>
                    </td>
                    <td></td>
                    <td>
                      <span className="text-xs text-teal-800">Group:</span>
                      &ensp;
                      <span className="text-xs">{item.Group}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <span className="text-xs text-teal-800">
                        Use Purpose/ Machine indication:
                      </span>
                      &ensp;
                      <span className="text-xs">
                        {item.Use_Purpose_Machine_indication}
                      </span>
                    </td>

                    <td>
                      <span className="text-xs text-teal-800">Range:</span>
                      &ensp;
                      <span className="text-xs">{item.Range}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <span className="text-xs text-teal-800">
                        Person in charge:
                      </span>
                      &ensp;
                      <span className="text-xs">{item.Person_in_charge}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            {/* <div> </div> */}
          </div>
          <div className="flex">
            <table className=" w-full text-left ">
              <tr className="">
                <td className="w-fit">
                  <span className="text-xs text-teal-800">Building:</span>&ensp;
                  <span className="text-xs font-bold">{item.Building}</span>
                </td>
                <td className="w-fit"></td>
                <td className="w-fit">
                  <span className="text-xs text-teal-800">
                    Department - Line:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Department_Line}
                  </span>
                </td>
                <td className="w-fit flex">
                  <span className="text-xs text-teal-800">Status:</span>&ensp;
                  <span className="text-xs font-bold text-yellow-400   w-fit ">
                    <FaCheck className=" w-fit text-2xl font-bold " />
                    {item.Valid == "Vaild" ? (
                      <FaCheck className=" w-fit text-2xl font-bold " />
                    ) : (
                      ""
                    )}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="w-fit">
                  <span className="text-xs text-teal-800">
                    Frequency follow adidas:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Frequency_follow_adidas_requirement}
                  </span>
                </td>
                <td className="w-fit"></td>
                <td className="w-fit">
                  <span className="text-xs text-teal-800">
                    Current Frequency:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Current_Frequency}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="w-fit">
                  <span className="text-xs text-teal-800">
                    Frequency follow adidas:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Frequency_follow_adidas_requirement2}
                  </span>
                </td>
                <td className="w-fit"></td>
                <td className="w-fit">
                  <span className="text-xs text-teal-800">
                    Certified Calibration Institute/Company:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Certified_Calibration_Institute_Company}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="w-fit">
                  <span className="text-xs text-teal-800">
                    Date Of Calibration:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Date_Of_Calibration}
                  </span>
                </td>
                <td className="w-fit"></td>
                <td className="w-fit">
                  <span className="text-xs text-teal-800">
                    Date Of Next Calibration:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Date_Of_Next}</span>
                </td>
                {/* <td className="w-fit"></td> */}
                <td className="w-fit">
                  <span className="text-xs text-teal-800">Result :</span>&ensp;
                  {item.Result_Company === "Pass" ? (
                    <span className="text-md font-bold text-blue-700 ">
                      Pass
                    </span>
                  ) : (
                    <span className="text-md font-bold text-red-700 ">
                      Fail
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="text-xs text-teal-800" colSpan={4}>
                  Remark:
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  });
};

export default CardMasterList;
