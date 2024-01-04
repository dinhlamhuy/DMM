/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FileInput from "../../components/FileInput";
import ImageCropper from "../../components/ImageCropper";
import CustomModal from "../../components/CustomModal";
import MenuBar from "../../components/MenuBar";
import Camera from "../../components/Camera";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import TextInput from "../../components/TextInput";
import CreateInput from "../../components/CreateInput";
import DatetimePicker from "../../components/DatetimePicker";
import { useTranslation } from "react-i18next";
import RadioCheck from "../../components/RadioCheck";
import { api, config } from "../../utils/linkApi";
import axios from "axios";
import moment from "moment";
import ConfirmForm from "../../components/ConfirmForm";
import AlertForm from "../../components/AlertForm";

const HomeScreen = () => {
  const { t } = useTranslation();

  const [image, setImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("chooseImg");
  const DefautMode = localStorage.getItem("isDark");
  const [DarkMode, setDarkMode] = useState<boolean>(
    DefautMode ? DefautMode === "true" : false
  );

  //#region Các state cho ô nhập thiết bị
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [UniCode, setUniCode] = useState("");
  const [FactoryCode, setFactoryCode] = useState("");
  const [Model, setModel] = useState("");
  const [selectedGroup, setselectedGroup] = useState("");
  const [IncommingDate, setIncommingDate] = useState<Date>();
  const [CurrentFrequency, setCurrentFrequency] = useState();
  const [FrequencyAdidas, setFrequencyAdidas] = useState();
  const [FrequencyOutAdidas, setFrequencyOutAdidas] = useState();
  const [InstituteCompany, setInstituteCompany] = useState("");
  const [DateCalibration, setDateCalibration] = useState<Date>();
  const [DateNextCalibration, setDateNextCalibration] = useState<Date>();
  const [DeviceSerialNum, setDeviceSerialNum] = useState("");
  const [Brand, setBrand] = useState("");
  const [EquipmentName, setEquipmentName] = useState("");
  const [Supplier, setSupplier] = useState("");
  const [UsePurpose, setUsePurpose] = useState("");
  const [Range, setRange] = useState("");
  const [Building, setBuilding] = useState("");
  const [DepartmentLine, setDepartmentLine] = useState("");
  const [PersonInCharge, setPersonInCharge] = useState("");
  const [Remark, setRemark] = useState("");
  const [sttResult, setsttResult] = useState("");
  const [txtStatus, settxtStatus] = useState("");
  //#endregion
  //#region Các state Option của react-select
  const [optGroup, setoptGroup] = useState<{ value: string; label: string }[]>(
    []
  );
  const [optinternalCalibration, setoptinternalCalibration] = useState<
    { value: string; label: string }[]
  >([]);
  const [optinternalCalibrationAdidas, setoptinternalCalibrationAdidas] =
    useState<{ value: string; label: string }[]>([]);
  const [optExternalCalibration, setoptExternalCalibration] = useState<
    { value: string; label: string }[]
  >([]);

  const [optDepartment, setoptDepartment] = useState<
    { value: string; label: string }[]
  >([]);
  const [optBuilding, setoptBuilding] = useState<
    { value: string; label: string }[]
  >([]);

  const optionsRadio = [
    {
      value: "Pass",
      label: t("lblPass"),
      cusClass:
        "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
    },
    {
      value: "Fail",
      label: t("lblFail"),
      cusClass:
        "text-red-500 peer-checked:bg-red-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-red-200",
    },
  ];
  const optionsVaild = [
    {
      value: "1",
      label: t("lblValid"),
      cusClass:
        "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
    },
    {
      value: "0",
      label: t("lblInValid"),
      cusClass:
        "text-red-500 peer-checked:bg-red-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-red-200",
    },
  ];
  //#endregion
  //#region Function Thêm thiết bị
  const AddDevice = async () => {
    const isConfirmed = await ConfirmForm("question", "Bạn chắc chắn chưa?");
    if (isConfirmed) {
      const url = api + "/api/Device/Insert_Device";
      const data = {
        unique_ID: UniCode,
        factory_ID: FactoryCode,
        device_Name: EquipmentName,
        group_Serial_Key: selectedGroup,
        Status: txtStatus,
        delivery_Date: IncommingDate,
        modify_Date: moment(new Date()),
        Image_Device: imgAfterCrop,
        model_Device: Model,
        device_Serial_Number: DeviceSerialNum,
        device_Brand: Brand,
        supplier_Name: Supplier,
        note: Remark,
        person_Charge: PersonInCharge,
        external_Calibration_Serial_Key: FrequencyOutAdidas,
        result: sttResult,
        internal_Calibration_Serial_Key: CurrentFrequency,
        Frequency_Internal: FrequencyAdidas,
        status: sttResult,
        Note_Internal: "",
        Factory: FactoryCode,
        location_Serial_Key: DepartmentLine,
        Building: Building,
        Department: DepartmentLine,
        user_Purpose_Machine_Indication: UsePurpose,
        range: Range,
        measurement_Serial_Key: UsePurpose,
        certified_Calibration_Institute_Company: InstituteCompany,
        date_Calibration: DateCalibration,
        date_Next_Calibration: DateNextCalibration,
        person_Calibration: "Nguyễn Sơn",
      };

      await axios
        .post(url, data, config)
        .then(async (response: any) => {
          if (response.data === true) {
            console.log("thành công");
            await AlertForm("success", "Thêm thành công");
          } else {
            await AlertForm("error", "Thêm thất bại");
          }
        })
        .catch(async () => {
          await AlertForm("error", "Thêm thất bại");
        })
        .finally(() => {});
    }
  };
  //#endregion
  //#region Function Cập nhật option cho select
  const OptionSelect = () => {
    const url = api + "/api/Get_Data_Filter/Get_Data_Filter";

    const data = {};
    axios
      .post(url, data, config)
      .then((response: any) => {
        if (response.data !== null) {
          const groupOptions = response.data.group.map((group: any) => ({
            value: group.group_Serial_Key,
            label: group.name_Group,
          }));
          const icAdidasOptions = response.data.ic.map((ic: any) => ({
            value: ic.internal_Calibration_Serial_Key,
            label: ic.frequency_General,
          }));

          const ecAdidasOptions = response.data.ec.map((ec: any) => ({
            value: ec.external_Calibration_Serial_Key,
            label: ec.frequency_Adidas,
          }));
          const buildingOptions = response.data.location.map(
            (location: { building: string }) => ({
              value: location.building,
              label: location.building,
            })
          );
          const DepartmentOptions = response.data.location.map(
            (location: any) => ({
              value: location.location_Serial_Key,
              label: location.department,
            })
          );
          setoptGroup(groupOptions);
          setoptinternalCalibrationAdidas(icAdidasOptions);
          setoptinternalCalibration(icAdidasOptions);
          setoptExternalCalibration(ecAdidasOptions);
          setoptBuilding(buildingOptions);
          setoptDepartment(DepartmentOptions);
        }
      })
      .finally(() => {});
  };
  useEffect(() => {
    OptionSelect();
  }, []);
  //#endregion
  //#region Các funtion upload hình ảnh
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onImageSelected = (selectedImg: any) => {
    setImage(selectedImg);
    setImgAfterCrop(selectedImg);
    setCurrentMenu("cropImg");
  };
  const onCancelCam = (selectedImg: any) => {
    setImage(selectedImg);
    setImgAfterCrop(selectedImg);
    setCurrentMenu("chooseImg");
  };
  const onCropDone = (imgCroppedArea: any) => {
    closeModal();

    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    if (context) {
      const imageObj1 = new Image();
      imageObj1.src = image;
      imageObj1.onload = function () {
        context.drawImage(
          imageObj1,
          imgCroppedArea.x,
          imgCroppedArea.y,
          imgCroppedArea.width,
          imgCroppedArea.height,
          0,
          0,
          imgCroppedArea.width,
          imgCroppedArea.height
        );
        const dataURL = canvasEle.toDataURL("image/jpeg");
        setImgAfterCrop(dataURL);
        console.log(dataURL);
        setCurrentMenu("imgCropped");
      };
    }
  };
  const onCropCancel = () => {
    setModalIsOpen(false);
  };
  //#endregion Funtion upload hình ảnh
  //#region Function tự động điền ngày hiệu chuẩn tiếp theo
  useEffect(() => {
    if (DateCalibration) {
      let ngay: Date | undefined;
      if (FrequencyOutAdidas === "EC0000000000001") {
        ngay = new Date(DateCalibration);
        ngay.setFullYear(ngay.getFullYear() + 1);
      } else if (FrequencyOutAdidas === "EC0000000000002") {
        ngay = new Date(DateCalibration);
        ngay.setMonth(ngay.getMonth() + 6);
      } else if (FrequencyOutAdidas === "EC0000000000005") {
        ngay = new Date(DateCalibration);
        ngay.setMonth(ngay.getMonth() + 3);
      }
      setDateNextCalibration(ngay);
    }
  }, [DateCalibration, FrequencyOutAdidas]);
  //#endregion
  //#region Function làm mới các ô nhập liệu
  const resetValue = () => {
    setUniCode("");
    setFactoryCode("");
    setModel("");
    setselectedGroup("");
    setIncommingDate(undefined);
    setCurrentFrequency(undefined);
    setFrequencyAdidas(undefined);
    setFrequencyOutAdidas(undefined);
    setInstituteCompany("");
    setDateCalibration(undefined);
    setDateNextCalibration(undefined);
    setDeviceSerialNum("");
    setBrand("");
    setEquipmentName("");
    setSupplier("");
    setUsePurpose("");
    setRange("");
    setBuilding("");
    setDepartmentLine("");
    setPersonInCharge("");
    setRemark("");
    setsttResult("");
    settxtStatus("");
    setImgAfterCrop("");
    setImage("");
    setCurrentMenu("chooseImg");
  };
  //#endregion

  return (
    <>
      <MenuBar
        isActive="home"
        onDarkMode={(darkmode: boolean | ((prevState: boolean) => boolean)) =>
          setDarkMode(darkmode)
        }
      >
        <div className="container items-center justify-center mx-auto">
          <div className="grid">
            <p
              className={`titleName flex justify-center ${
                DarkMode ? "dark:text-white text-white" : ""
              } `}
            >
              {t("lblUploadNewDevice")}
            </p>
          </div>

          <div
            className=" flex grid
           grid-flow-col  grid-rows-2 md:grid-rows-2 gap-3 lg:grid-rows-1 xl:grid-rows-1 
           "
          >
            <div className=" ">
              <div className="grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2  flex  ">
                <div className="  flex flex-row   justify-center mb-14 md:mb-14  ">
                  {currentMenu === "chooseImg" ? (
                    <div
                      className={`cropped-img NoneImg grid  flex  ${
                        DarkMode ? "dark:text-white text-white" : ""
                      }  content-around md:py-5 lg:py-5 xl:py-5  `}
                    >
                      <div
                        className={`row-span-2 uploadView  ${
                          DarkMode ? "dark:text-white text-white" : ""
                        } `}
                      >
                        <p
                          className={` ${
                            DarkMode
                              ? "dark:text-white text-white"
                              : "text-[#008080]"
                          } `}
                        >
                          {" "}
                          Camera{" "}
                        </p>
                        <p
                          className={` ${
                            DarkMode
                              ? "dark:text-white text-white"
                              : "text-[#008080]"
                          } `}
                        >
                          {" "}
                          OR
                        </p>
                        <p
                          className={` ${
                            DarkMode
                              ? "dark:text-white text-white"
                              : "text-[#008080]"
                          } `}
                        >
                          Upload an Image{" "}
                        </p>
                      </div>
                      <div className="justify-center">
                        <button
                          className="btn rounded-xl px-4 py-2 bg-purple-600 text-white "
                          onClick={() => setCurrentMenu("Camera")}
                        >
                          Camera
                        </button>
                      </div>
                      <div>
                        <FileInput onImageSelected={onImageSelected} />
                      </div>
                    </div>
                  ) : currentMenu === "Camera" ? (
                    <Camera
                      onCancelCam={onCancelCam}
                      onImageSelected={onImageSelected}
                    />
                  ) : (
                    <div className="  px-0 mx-0 cropped-img">
                      <img src={imgAfterCrop} className="aspect-square" />

                      <div className="grid grid-cols-2 ">
                        <button
                          onClick={() => {
                            setCurrentMenu("chooseImg");
                            setImage("");
                            closeModal();
                          }}
                          className={` ${
                            DarkMode
                              ? " dark:border-yellow-400 border-yellow-400"
                              : ""
                          } text-red-700 btn border items-center flex text-center justify-center   text-3xl p-2`}
                        >
                          <FaRegTrashAlt />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentMenu("cropImg");
                            openModal();
                          }}
                          className={` ${
                            DarkMode
                              ? " dark:border-yellow-400 border-yellow-400"
                              : ""
                          } text-green-500  btn  border  items-center flex text-center justify-center  text-3xl p-2`}
                        >
                          <MdEditSquare />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={` ${
                    DarkMode ? "dark:bg-zinc-900  bg-zinc-900 " : "dark:bg-gray-100 bg-gray-100"
                  } grid  gap-y-5   py-4 px-2.5  rounded-md  relative flex items-end   shadow-md`}
                >
                  <div>
                    <TextInput
                      label={t("lblUniqueCode")}
                      TextChange={(value: any) => {
                        setUniCode(value);
                      }}
                      value={UniCode}
                      keys="lblUniqueCode"
                    />
                  </div>
                  <div>
                    <TextInput
                      // label="Mã số tài sản / Factory code"
                      label={t("lblFactoryCode")}
                      TextChange={(value: any) => {
                        setFactoryCode(value);
                      }}
                      value={FactoryCode}
                      keys="lblFactoryCode"
                    />
                  </div>
                  <div>
                    <TextInput
                      label={t("lblModel")}
                      TextChange={(value: any) => {
                        setModel(value);
                      }}
                      value={Model}
                      keys="lblModel"
                    />
                  </div>
                  <div className="relative -mt-4">
                    <CreateInput
                      label={t("lblGroup")}
                      options={optGroup}
                      value={selectedGroup}
                      OnSelected={(value: any) => {
                        setselectedGroup(value);
                      }}
                    />
                  </div>
                  <div className="relative  -mt-3">
                    <DatetimePicker
                      label={t("lblIncommingDate")}
                      onChangeDate={(date: any) => setIncommingDate(date)}
                      DateSelected={IncommingDate}
                    />
                  </div>
                </div>
              </div>

              <div
                className={` ${
                  DarkMode ? "dark:bg-zinc-700 bg-zinc-700" : "bg-gray-100"
                } grid flex gap-5 mt-6   pt-4 px-2.5 shadow rounded-lg`}
              >
                <div className="flex items-center  ">
                  <div className="border h-1 shadow rounded-l-full border-teal-700  flex-grow"></div>
                  <div
                    className={` ${
                      DarkMode
                        ? "dark:text-teal-400 dark:text-white text-white text-teal-400"
                        : ""
                    } px-3 text-teal-900  text-xs font-bold border border-teal-400  rounded-full shadow `}
                  >
                    {t("lblInternalCalibration")}
                  </div>
                  <div className="border h-1 shadow rounded-r-full border-teal-700  flex-grow"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 -mt-5">
                  <div>
                    <CreateInput
                      label={t("lblCurrentFrequency")}
                      OnSelected={(value: any) => {
                        setCurrentFrequency(value);
                      }}
                      value={CurrentFrequency}
                      options={optinternalCalibration} // k="lblCurrentFrequency"
                    />
                  </div>
                  <div>
                    <CreateInput
                      label={t("lblFrequencyFollowAdidasRequirement")}
                      OnSelected={(value: any) => {
                        setFrequencyAdidas(value);
                      }}
                      value={FrequencyAdidas}
                      options={optinternalCalibrationAdidas}
                    />
                  </div>
                </div>
                <div className="flex items-center  ">
                  <div className="border h-1 shadow rounded-l-full border-teal-700  flex-grow"></div>
                  <div
                    className={` ${
                      DarkMode
                        ? "dark:text-teal-400 dark:text-white text-white text-teal-400"
                        : ""
                    } px-3 text-teal-900  text-xs font-bold border border-teal-400  rounded-full shadow `}
                  >
                    {t("lblExternalCalibration")}
                  </div>
                  <div className="border  h-1 shadow rounded-r-full border-teal-700 flex-grow"></div>
                </div>

                <div className="-mt-5">
                  <CreateInput
                    label={t("lblFrequencyFollowAdidasRequirement")}
                    OnSelected={(value: any) => {
                      setFrequencyOutAdidas(value);
                    }}
                    value={FrequencyOutAdidas}
                    options={optExternalCalibration}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <TextInput
                      label={t("lblCertifiedCalibrationInstitute/Company")}
                      TextChange={(value: any) => {
                        setInstituteCompany(value);
                      }}
                      value={InstituteCompany}
                      keys="lblCertifiedCalibrationInstitute/Company"
                    />
                  </div>
                  <div>
                    <RadioCheck
                      names={"Vaild"}
                      item={optionsRadio}
                      OnChecked={(value: any) => {
                        setsttResult(value);
                      }}
                      value={sttResult}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  <div>
                    <DatetimePicker
                      label={t("lblDateOfCalibration")}
                      onChangeDate={(date: any) => setDateCalibration(date)}
                      DateSelected={DateCalibration}
                    />
                  </div>
                  <div>
                    <DatetimePicker
                      label={t("lblDateOfNextCalibration")}
                      onChangeDate={(date: any) => setDateNextCalibration(date)}
                      DateSelected={DateNextCalibration}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Danh sach */}
            <div className=" px-2 ">
              <div
                className={`grid flex gap-5   ${
                  DarkMode ? "dark:bg-zinc-900 bg-zinc-900" : "bg-gray-100"
                } pt-5 px-2.5 shadow rounded-lg`}
              >
                <div className="flex items-center   ">
                  <div className="border-2 rounded-l-full h-1 shadow border-teal-700  flex-grow"></div>
                  <div className="px-3 text-teal-700 dark:text-teal-600 text-xl font-bold border-teal-700 border rounded-full shadow ">
                    {t("lblDeviceDetails")}
                  </div>
                  <div className="border-2 rounded-r-full  h-1 shadow border-teal-700  flex-grow"></div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-2">
                  <div>
                    <TextInput
                      label={t("lblDeviceSerialNumber")}
                      TextChange={(value: any) => {
                        setDeviceSerialNum(value);
                      }}
                      value={DeviceSerialNum}
                      keys="lblDeviceSerialNumber"
                    />
                  </div>
                  <div>
                    <TextInput
                      label={t("lblBrand")}
                      TextChange={(value: any) => {
                        setBrand(value);
                      }}
                      value={Brand}
                      keys="lblBrand"
                    />
                  </div>
                </div>
                <div>
                  <TextInput
                    label={t("lblEquipmentName")}
                    TextChange={(value: any) => {
                      setEquipmentName(value);
                    }}
                    value={EquipmentName}
                    keys="lblEquipmentName"
                  />
                </div>
                <div>
                  <TextInput
                    label={t("lblSupplier")}
                    TextChange={(value: any) => {
                      setSupplier(value);
                    }}
                    value={Supplier}
                    keys="lblSupplier"
                  />
                </div>

                <div>
                  <TextInput
                    label={t("lblUsePurpose_MachineIndication")}
                    TextChange={(value: any) => {
                      setUsePurpose(value);
                    }}
                    value={UsePurpose}
                    keys="lblUsePurpose_MachineIndication"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <TextInput
                      label={t("lblRange")}
                      TextChange={(value: any) => {
                        setRange(value);
                      }}
                      value={Range}
                      keys="lblRange"
                    />
                  </div>
                  <div>
                    <RadioCheck
                      names={"Status"}
                      item={optionsVaild}
                      OnChecked={(value: any) => {
                        settxtStatus(value);
                        // console.log(value);
                      }}
                      value={txtStatus}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2 -mt-3 ">
                  <div>
                    <CreateInput
                      label={t("lblBuilding")}
                      OnSelected={(value: any) => {
                        setBuilding(value);
                      }}
                      value={Building}
                      options={optBuilding}
                    />
                  </div>
                  <div>
                    <CreateInput
                      label={t("lblDepartment_Line")}
                      OnSelected={(value: any) => {
                        setDepartmentLine(value);
                      }}
                      value={DepartmentLine}
                      options={optDepartment}
                    />
                  </div>
                </div>
                <div className="">
                  <TextInput
                    label={t("lblPersonInCharge")}
                    TextChange={(value: any) => {
                      setPersonInCharge(value);
                    }}
                    value={PersonInCharge}
                    keys="lblPersonInCharge"
                  />
                </div>

                <div>
                  <TextInput
                    label={t("lblRemark")}
                    TextChange={(value: any) => {
                      setRemark(value);
                    }}
                    value={Remark}
                    keys="lblRemark"
                  />
                </div>
                <div></div>
              </div>
              <div className="text-center justify-center flex gap-3">
                <button
                  className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-gray-400 flex text-center justify-center items-center "
                  // onClick={handleButtonClick}
                >
                  {t("btnEdit")}
                </button>
                <button
                  onClick={AddDevice}
                  className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-blue-500 flex text-center justify-center items-center"
                >
                  {t("btnAdd")}
                </button>
                <button
                  onClick={resetValue}
                  className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-blue-500 flex text-center justify-center items-center"
                >
                  {t("btnReset")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
          <div className="h-full w-full  bg-gray-300">
            <ImageCropper
              image={image}
              onCropDone={onCropDone}
              onCropCancel={onCropCancel}
            />
          </div>
        </CustomModal>
      </MenuBar>
    </>
  );
};

export default HomeScreen;
