/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaCheck } from "react-icons/fa";
import { Equipment } from "../../utils/MasterList";
// import { IoCloseSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
interface CardMListProps {
  label: string | null;
  keys: string | undefined;
  items: Equipment[];
  DarkMode: boolean;
}
const CardMasterList: React.FC<CardMListProps> = ({ DarkMode, items }) => {
  const { t } = useTranslation();
  return items.map((item: Equipment, index: number) => {
    return (
      <div
        key={`Equi` + index}
        className={` ${DarkMode ? `bg-whitse   ${item.Valid === "VALID" ? "bg-[#96FFC6]": "bg-[#FF969A]"}` : ` bg-ambser-50  ${item.Valid === "VALID" ? "bg-[#96FFC6]": "bg-[#FF969A]" }    `
          } rounded-lg shadow  h-fit flex justify-center w-full p-2`}
      >
        <div className="container pt-1    gird grid-flow-row auto-rows-max">
          <div className="  flex flex-col md:flex-row ">
            <div className="w-48 h-48 flex-none justify-center items-center my-auto mr-2">
              {item.Photo_for_reference != "" &&
                (<img  src={item.Photo_for_reference} loading="lazy"
                  alt="" className="w-48 h-48  rounded-lg "/>) }
            </div>
            <div className="   flex ml-2">
              <div className=" grid grid-cols-2 md:gap-x-5 text-left">
              <div className=" font-bold text-2xl col-span-2 text-center">{item.Equipment_Name}</div>
                <div >
                  <span className="text-xs text-gray-800">
                    {t('lblUniqueCode')}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Unique_code}</span>
                </div>
                <div >
                  <span className="text-xs text-gray-800">
                    {t('lblFactoryCode')}:</span>&ensp;
                  <span className="text-xs font-bold">{item.Factory_code}</span>
                </div>

                <div >
                  <span className="text-xs text-gray-800">
                    {t('lblModel')}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Model}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800"> {t('lblDeviceSerialNumber')}: </span>
                  &ensp;
                  <span className="text-xs font-bold">
                    {item.Device_Serial_Number}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-gray-800">{t('lblSupplier')}:</span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Supplier}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800"> {t('lblBrand')}:</span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Brand}</span>
                </div>

                <div>
                  <span className="text-xs text-gray-800">{t('lblGroup')}:</span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Group}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800">
                    {t('lblIncommingDate')}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Incomming_date}</span>
                </div>

                <div>
                  <span className="text-xs text-gray-800">
                    {t('lblPersonInCharge')}:
                  </span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Person_in_charge}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-800">{t('lblRange')}:</span>
                  &ensp;
                  <span className="text-xs font-bold">{item.Range}</span>
                </div>

                <div className="col-span-2">
                  <span className="text-xs text-gray-800">
                    {t('lblUsePurpose_MachineIndication')}:
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
                <span className="text-xs text-gray-800">{t('lblBuilding')}:</span>&ensp;
                <span className="text-xs font-bold">{item.Building}</span>
              </div>
              <div className="flex items-center flex-wrap gap-x-2">
                <span className="text-xs text-gray-800 ">
                  {t('lblDepartment_Line')}:
                </span>
                <span className="text-xs font-bold">
                  {item.Department_Line}
                </span>
              </div>

              <div className="flex  items-center   gap-x-3">
                <span className="text-xs text-gray-800 items-center ">{t('lblStatus')}:</span>
                <span className="text-xs font-bold">
                  {item.Valid === "VALID" ? (
                    <FaCheck className="  text-2xl font-bold text-green-500 " />
                  ) : (

                    <IoClose className="  text-3xl font-bold text-red-500 " />
                  )}
                </span>
              </div>


            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 mt-1 lg:mt-0 gap-x-2  px-1 pb-1 backdrop-blur-sm ${DarkMode ? "bg-yellow-50/50" : "bg-white/50"}
            relative  h-fit gap-y-1  rounded-md`}>
              <div style={{fontSize:"8px"}} className={`col-span-3 absolute  -top-3  ml-1 backdrop-blur-sm  ${DarkMode ? "bg-yellow-50/50" : "bg-white/50"}  text-center  flex justify-center
               text-gray-500    font-bold rounded-t-md px-1`}>{t('lblInternalCalibration')}</div>
              
              <div className="lg:mt-2   h-fit flex gap-x-4 w-fit flex-wrap
              ">
                <span className="text-xs text-gray-800">
                  {t('lblFrequencyFollowAdidasRequirement')}:
                </span> <span className="text-xs font-bold">
                  {item.Frequency_follow_adidas_requirement}
                </span>
              </div>

              <div className="lg:mt-2 h-fit flex gap-x-4 w-fit flex-wrap">
                <span className="text-xs text-gray-800    ">
                  {t('lblCurrentFrequency')}:
                </span>  <span className="text-xs font-bold">
                  {item.Current_Frequency}
                </span>
              </div>

              <div className="lg:mt-2 h-fit flex gap-x-4 flex-wrap">
                <span className="text-xs text-gray-800">
                  {t('lblCertifiedCalibrationInstitute/Company')}:
                </span> <span className="text-xs font-bold">
                  {item.Certified_Calibration_Institute_Company}
                </span>
              </div>

            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-x-2  px-1  pb-1 items-center ${DarkMode ? "bg-yellow-50/50" : "bg-white/50"} 
              h-fit gap-y-1 flex mt-2 relative  rounded-md backdrop-blur-xl  items-center`}>
            <div style={{fontSize:"8px"}} className={`col-span-3 absolute   -top-3   ml-1 backdrop-blur-xl ${DarkMode ? "bg-yellow-50/50" : "bg-white/50"}  text-center flex justify-center
             text-gray-500    font-bold rounded-t-md px-1  `}>{t('lblExternalCalibration')}</div>
              <div className="lg:mt-2 flex-wrap flex w-fit gap-x-4">
                <span className="text-xs text-gray-800">
                  {t('lblFrequencyFollowAdidasRequirement')}:
                </span>
                
                <span className="text-xs font-bold">
                  {item.Frequency_follow_adidas_requirement2}
                </span>
              </div>
              <div className="lg:mt-2 flex-wrap flex w-fit gap-x-4 ">
                <span className="text-xs text-gray-800">
                  {t('lblDateOfCalibration')}:
                </span>
               
                <span className="text-xs font-bold">
                  {item.Date_Of_Calibration}
                </span>
              </div>
              <div className="lg:mt-2 flex-wrap flex w-fit gap-x-4">
                <span className="text-xs text-gray-800">
                  {t('lblDateOfNextCalibration')}:</span> 
              
                <span className="text-xs font-bold">{item.Date_Of_Next}</span>
              </div>
            </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">



            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-2">
              <div className="text-xs text-gray-800 cols-span-2" >
                {t('lblRemark')}:
              </div>
              <div className=""></div>
              <div className="">
                <span className="text-xs text-gray-800">{t('lblResult')}:</span>&ensp;
                {item.Result_Company === "Pass" ? (
                  <span className="text-md font-bold text-blue-700 ">
                    Pass
                  </span>
                ) : (
                  <span className="text-md font-bold text-red-700 ">
                    Fail
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
      // </div>
    );
  });
};

export default CardMasterList;
