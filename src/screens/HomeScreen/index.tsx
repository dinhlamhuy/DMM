/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { api, apiLYM, config,  urlLVL, urlLHG, urlLYV,urlLYM } from "../../utils/linkApi";
import axios from "axios";
import moment from "moment";
import ConfirmForm from "../../components/ConfirmForm";
import AlertForm from "../../components/AlertForm";
import SelectInput from "../../components/SelectInput";
import { useLocation } from "react-router-dom";
const HomeScreen = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [dataReceived, setdataReceived] = useState(
    location.state && location.state.data
  );
  const [image, setImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("chooseImg");
  const DefautMode = localStorage.getItem("isDark");
  const UserNhap = localStorage.getItem("User");
  const Factory = localStorage.getItem("Factory");
  const [DarkMode, setDarkMode] = useState<boolean>(
    DefautMode ? DefautMode === "true" : false
  );
  const [user, setUser] = useState(UserNhap ? UserNhap : '');
  const [factory, setFactory] = useState(Factory ? Factory : '');
  let urlImg='';
  let linkAPI=api;
  if(factory === "LVL"){
    urlImg=urlLVL;
     linkAPI=api;
  }else if(factory === "LHG") {
    urlImg=urlLHG;
    linkAPI=api;
  }else if(factory === "LYM") {
    urlImg=urlLYM;
    linkAPI=apiLYM;
  }else{
    urlImg=urlLYV;
    linkAPI=api;
  }
  //#region Các state cho ô nhập thiết bị
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [deviceSerialKey, setDeviceSerialKey] = useState("");
  const [UniCode, setUniCode] = useState("");
  const [FactoryCode, setFactoryCode] = useState(factory || null);
  const [Model, setModel] = useState("");
  const [selectedGroup, setselectedGroup] = useState("");
  const [IncommingDate, setIncommingDate] = useState<Date>();
  const [FrequencyAdidas, setFrequencyAdidas] = useState();
  const [CurrentFrequency, setCurrentFrequency] = useState();
  const [FrequencyOutAdidas, setFrequencyOutAdidas] = useState();
  const [InstituteCompany, setInstituteCompany] = useState("");
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
  //#endregion

  //#region Các state Option của react-select
  const [optGroup, setoptGroup] = useState<{ value: string; label: string }[]>(
    []
  );
  const [optFactory] = useState<{ value: string; label: string }[]>([
    { value: "LHG", label: "LHG" },
    { value: "LVL", label: "LVL" },
    { value: "LYV", label: "LYV" },
    { value: "LYM", label: "LYM" },
  ]);
  const [optinternalCalibration, setoptinternalCalibration] = useState<
    { value: string; label: string }[]
  >([]);
  // console.log(optinternalCalibration[1].value);
  const [optinternalCalibrationAdidas, setoptinternalCalibrationAdidas] =
    useState<{ value: string; label: string }[]>([]);
  const [optExternalCalibration, setoptExternalCalibration] = useState<
    { value: string; label: string }[]
  >([]);

  // const [optDepartment, setoptDepartment] = useState<
  //   { value: string; label: string }[]
  // >([]);
  // const [optBuilding, setoptBuilding] = useState<
  //   { value: string; label: string }[]
  // >([]);

  // const optionsRadio = [
  //   {
  //     value: "Pass",
  //     label: t("lblPass"),
  //     cusClass:
  //       "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
  //   },
  //   {
  //     value: "Fail",
  //     label: t("lblFail"),
  //     cusClass:
  //       "text-red-500 peer-checked:bg-red-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-red-200",
  //   },
  // ];
  // const optionsVaild = [
  //   {
  //     value: "1",
  //     label: t("lblValid"),
  //     cusClass:
  //       "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
  //   },
  //   {
  //     value: "0",
  //     label: t("lblInValid"),
  //     cusClass:
  //       "text-red-500 peer-checked:bg-red-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-red-200",
  //   },
  // ];
  //#endregion
  //#region Function Thêm thiết bị
  const AddDevice = async () => {
    const isConfirmed = await ConfirmForm("question", t("confirmAdd"));
    if (isConfirmed) {
      if (
        UniCode !== "" &&
        // FactoryCode !== "" &&
        EquipmentName !== "" &&
        // selectedGroup !== "" &&
        // Model !== "" &&
        DeviceSerialNum !== "" &&
        Brand !== "" &&
        Supplier !== "" 
        // Building !== "" &&
        // DepartmentLine !== "" &&
        // && IncommingDate !== null
        // &&       FrequencyAdidas !== "" &&
        // CurrentFrequency !== "" &&
        // FrequencyOutAdidas !== null
        // &&  UsePurpose !== "" &&
        // PersonInCharge !== "" &&
        // Range !== "" &&
        // InstituteCompany !== ""
      ) {
        const url = linkAPI + "/api/Insert_Device";
        const data = {
          unique_ID: UniCode,
          factory_ID: FactoryCode,
          device_Name: EquipmentName,
          group_Name: selectedGroup,
          model_Device: Model,
          device_Serial_Number: DeviceSerialNum,
          device_Brand: Brand,
          supplier_Name: Supplier,
          building: Building,
          line: DepartmentLine,
          incoming_Date: IncommingDate ? moment(IncommingDate, "YYYY-MM-DD").format("YYYY/MM/DD") :  moment('1900-01-01', "YYYY-MM-DD").format("YYYY/MM/DD"),
          modify_Date: moment(new Date(), "YYYY-MM-DD").format("YYYY/MM/DD"),
          internal_Current_Adidas: FrequencyAdidas,
          internal_Current: CurrentFrequency,
          external_Adidas: FrequencyOutAdidas,
          remark: Remark,
          person_Charge: PersonInCharge,
          Image_Device: imgAfterCrop,
          date_Calibration: moment(new Date()),
          date_Next_Calibration: moment(new Date()),
          user_Purpose_Machine_Indication: UsePurpose,
          range: Range,
          certified_Calibration_Institute_Company: InstituteCompany,
          Implementer_Id: user,
          Factory:factory
        };
        let tb = t("alertAddFail");
        await axios
          .post(url, data, config)
          .then(async (response: any) => {
            if (response.data.result === true) {
              tb = t("alertAddSuccess");
              resetValue();
              await AlertForm("success", tb);
            } else {
              await AlertForm("error", tb);
            }
          })
          .catch(async () => {
            await AlertForm("error", tb);
          })
          .finally(() => {});
      } else {
        await AlertForm("error", t("errValidate"));
      }
    }
  };
  //#endregion
  //#region Function Cập nhật option cho select
  const OptionSelect = () => {
    const url = linkAPI + "/api/Get_Data_Filter";

    const data = {
      Factory:factory
    };
    axios
      .post(url, data, config)
      .then((response: any) => {
        if (response.data !== null) {
          const groupOptions = response.data.Group.map((group: any) => ({
            value: group.Frequency,
            label: group.Frequency,
          }));
          const icAdidasOptions = response.data.IC.map((ic: any) => ({
            value: ic.Frequency,
            label: ic.Frequency,
          }));

          const ecAdidasOptions = response.data.EC.map((ec: any) => ({
            value: ec.Frequency,
            label: ec.Frequency,
          }));
          // const buildingOptions = response.data.location.map(
          //   (location: { building: string }) => ({
          //     value: location.building,
          //     label: location.building,
          //   })
          // );
          // const DepartmentOptions = response.data.location.map(
          //   (location: any) => ({
          //     value: location.location_Serial_Key,
          //     label: location.department,
          //   })
          // );
          setoptGroup(groupOptions);
          setoptinternalCalibrationAdidas(icAdidasOptions);
          setoptinternalCalibration(icAdidasOptions);
          setoptExternalCalibration(ecAdidasOptions);
          // setoptBuilding(buildingOptions);
          // setoptDepartment(DepartmentOptions);
        }
      })
      .finally(() => {});
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authValue = searchParams.get("loginUser");
    const facValue = searchParams.get("Factory");

    if (authValue && authValue!=='') {
      localStorage.setItem("User", authValue.toString());
      setUser(authValue.toString());
    }
    if (facValue && facValue!=='') {
      localStorage.setItem("Factory", facValue.toString());
      setFactory(facValue.toString());
    }
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


  const onCancelCam = () => {
    // console.log(selectedImg);

    // setImage(selectedImg);
    // setImgAfterCrop(selectedImg);
    setCurrentMenu("chooseImg");
  };
  const onCropDone = (imgCroppedArea: any) => {
    console.log(imgCroppedArea)
    closeModal();
    if (imgCroppedArea.x === 0 && imgCroppedArea.y === 0) {
      // Directly set the original image as the cropped image
      setImgAfterCrop(image);
      setCurrentMenu("imgCropped");
      return;
    }
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    if (context) {
      const imageObj1 = new Image();
      imageObj1.crossOrigin = "anonymous"; 
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
        // console.log(dataURL);
        setCurrentMenu("imgCropped");
      };
    }
  };
  const onCropCancel = () => {
    setModalIsOpen(false);
  };
  //#endregion Funtion upload hình ảnh
  //#region Function tự động điền ngày hiệu chuẩn tiếp theo
  // useEffect(() => {
  //   if (DateCalibration) {
  //     let ngay: Date | undefined;

  //     if (FrequencyOutAdidas === "One per year") {
  //       ngay = new Date(DateCalibration);
  //       ngay.setFullYear(ngay.getFullYear() + 1);
  //     } else if (FrequencyOutAdidas === "Twice a year") {
  //       ngay = new Date(DateCalibration);
  //       ngay.setMonth(ngay.getMonth() + 6);
  //     } else if (FrequencyOutAdidas === "Four times a year") {
  //       ngay = new Date(DateCalibration);
  //       ngay.setMonth(ngay.getMonth() + 3);
  //     } else if (FrequencyOutAdidas === "Special frequency") {
  //       // nếu Special frequency thì dưới hoặc bằng 8 năm thì hiệu chuẩn 6 tháng sau
  //       ngay = new Date(DateCalibration);
  //       const currentDate = new Date();
  //       const yearDiff = currentDate.getFullYear() - ngay.getFullYear();
  //       if (yearDiff <= 8) {
  //         ngay.setMonth(ngay.getMonth() + 6);
  //       } else if (yearDiff > 8 && yearDiff <= 15) {
  //         ngay.setMonth(ngay.getMonth() + 3);
  //       } else if (yearDiff > 15) {
  //         alert("Need to replace with a new one");
  //       }
  //     }
  //     setDateNextCalibration(ngay);
  //   }
  // }, [DateCalibration, FrequencyOutAdidas]);
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
    // setDateCalibration(undefined);
    // setDateNextCalibration(undefined);
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
    // setsttResult("");
    // settxtStatus("");
    setImgAfterCrop("");
    setDeviceSerialKey("");
    setImage("");
    setCurrentMenu("chooseImg");
    // dataReceived=0
    setdataReceived("");
  };
  //#endregion

  //#region cập nhật thiết bị
  const getDataDeviceListByUnicode = (unicodeId: string) => {
    const url = linkAPI + "/api/Show_Data_Device_For_Update";
    // setIsLoading(true);
    const data = {
      Uniquecode: unicodeId,
      Implementer_Id: user,
      Is_Active:'1',
      Factory:factory
    };
    axios
      .post(url, data, config)
      .then((response: any) => {
        // resetValues();
        if (response.data !== null) {
          // console.log(response.data);
          setDeviceSerialKey(response.data.Device_Serial_Key);
          setUniCode(response.data.Unique_ID);
          setFactoryCode(response.data.Factory_ID);
          setModel(response.data.Model_Device);
          setselectedGroup(response.data.Group_Name);
          if(response.data.Incoming_Date !== '1/1/1900 12:00:00 AM'){
            const date = new Date(response.data.Incoming_Date);
            setIncommingDate(date);

          }
          // const selectedOptions = optinternalCalibration.find((option) => option.value === response.data.internal_Current);
          // console.log(response.data.Internal_Current);
          // console.log(response.data.Internal_Current_Adidas);
          // console.log(response.data.External_Adidas);

          setCurrentFrequency(response.data.Internal_Current);
          setFrequencyAdidas(response.data.Internal_Current_Adidas);
          setFrequencyOutAdidas(response.data.External_Adidas);

          setInstituteCompany(
            response.data.Certified_Calibration_Institute_Company
          );

          setDeviceSerialNum(response.data.Device_Serial_Number);
          setBrand(response.data.Device_Brand);
          setEquipmentName(response.data.Device_Name);
          setSupplier(response.data.Supplier_Name);
          setUsePurpose(response.data.User_Purpose_Machine_Indication);
          setRange(response.data.Range);
          setBuilding(response.data.Building);
          setDepartmentLine(response.data.Line);
          setPersonInCharge(response.data.Person_Charge);
          setRemark(response.data.Remark);
          if (
            response.data.Image_Device !== "" &&
            response.data.Image_Device !== null
          ) {
            setCurrentMenu("");
            setImgAfterCrop(
              urlImg + response.data.Image_Device
            );
            setImage(urlImg + response.data.Image_Device);
          }
        }
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };
  useEffect(() => {
    if (dataReceived) {
      // console.log(dataReceived)
      getDataDeviceListByUnicode(dataReceived);
    }
  }, [dataReceived]);

  const EditDevice = async () => {
    const isConfirmed = await ConfirmForm("question", t("confirmUpdate"));
    if (isConfirmed) {
      if (
        UniCode !== "" &&
        // FactoryCode !== "" &&
        EquipmentName !== "" &&
        // selectedGroup !== "" &&
        // Model !== "" &&
        DeviceSerialNum !== "" &&
        Brand !== "" &&
        Supplier !== ""
        // Building !== "" &&
        // DepartmentLine !== "" &&
        // &&  IncommingDate !== null
        // &&       FrequencyAdidas !== "" &&
        // CurrentFrequency !== "" &&
        // FrequencyOutAdidas !== null
        // &&  UsePurpose !== "" &&
        // PersonInCharge !== "" &&
        // Range !== "" &&
        // InstituteCompany !== ""
      ) {
        const url = linkAPI + "/api/Update_Data_Device";
       imgAfterCrop.includes(urlImg)
        const data = {
          unique_ID: UniCode,
          factory_ID: FactoryCode,
          device_Name: EquipmentName,
          group_Name: selectedGroup ? selectedGroup: '',
          model_Device: Model,
          device_Serial_Number: DeviceSerialNum,
          device_Brand: Brand,
          supplier_Name: Supplier,
          building: Building,
          line: DepartmentLine,
          incoming_Date: IncommingDate ? moment(IncommingDate, "YYYY-MM-DD").format("YYYY/MM/DD") : moment('1900-01-01', "YYYY-MM-DD").format("YYYY/MM/DD"),
          internal_Current_Adidas: FrequencyAdidas,
          internal_Current: CurrentFrequency,
          external_Adidas: FrequencyOutAdidas,
          remark: Remark,
          person_Charge: PersonInCharge,
          Image_Device: imgAfterCrop.includes(urlImg) ? '' :  imgAfterCrop,
          user_Purpose_Machine_Indication: UsePurpose,
          range: Range,
          certified_Calibration_Institute_Company: InstituteCompany,
          Implementer_Id: user,
          Factory:factory,
          Device_Serial_Key: deviceSerialKey
        };
        await axios
          .post(url, data, config)
          .then(async (response: any) => {
            if (response.data.result === true) {
              resetValue();
              await AlertForm("success", t("alertUpdateSuccess"));
            } else {
              await AlertForm("error", t("alertUpdateFail"));
            }
          })
          .catch(async () => {
            await AlertForm("error", t("alertUpdateFail"));
          })
          .finally(() => {});
      } else {
        await AlertForm("error", t("errValidate"));
      }
    }
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
              {dataReceived
                ? t("lblUploadUpdateDevice") + ": " + dataReceived
                : t("lblUploadNewDevice")}
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
                            setImgAfterCrop("");
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
                    DarkMode
                      ? "dark:bg-zinc-900  bg-zinc-900 "
                      : "dark:bg-zinc-100 bg-zinc-100"
                  } grid  gap-y-5   py-4 px-2.5  rounded-md  relative flex items-end   shadow-md`}
                >
                  <div>
                    <TextInput
                      label={t("lblUniqueCode") + "(*)"}
                      TextChange={(value: any) => {
                        setUniCode(value);
                      }}
                      value={UniCode}
                      keys="lblUniqueCode"
                    />
                  </div>
                  <div>
                    {/* <TextInput
                      // label="Mã số tài sản / Factory code"
                      label={t("lblFactoryCode")+'(*)'}
                      TextChange={(value: any) => {
                        setFactoryCode(value);
                      }}
                      value={FactoryCode}
                      keys="lblFactoryCode"
                    /> */}

                    <CreateInput
                      label={t("lblFactoryCode")}
                      options={optFactory}
                      value={FactoryCode}
                      OnSelected={(value: any) => {
                        setFactoryCode(value);
                      }}
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
                      onChangeDate={(date: any) => {
                        date ? setIncommingDate(new Date(date)) : setIncommingDate(undefined)
                      }}
                      DateSelected={IncommingDate}
                    />
                  </div>
                </div>
              </div>

              <div
                className={` ${
                  DarkMode
                    ? "dark:bg-zinc-700 bg-zinc-700"
                    : "dark:bg-zinc-100 bg-zinc-100"
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
                    <SelectInput
                      label={t("lblCurrentFrequency")}
                      OnSelected={(value: any) => {
                        // console.log(value)
                        setCurrentFrequency(value);
                      }}
                      value={CurrentFrequency}
                      options={optinternalCalibration} // k="lblCurrentFrequency"
                    />
                  </div>
                  <div>
                    <SelectInput
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
                  <SelectInput
                    label={t("lblFrequencyFollowAdidasRequirement") }
                    OnSelected={(value: any) => {
                      setFrequencyOutAdidas(value);
                    }}
                    value={FrequencyOutAdidas}
                    options={optExternalCalibration}
                  />
                </div>
                <div className="grid mb-4">
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
                    {/* <RadioCheck
                      names={"Vaild"}
                      item={optionsRadio}
                      OnChecked={() => {
                        // setsttResult(value);
                      }}
                      value={sttResult}
                    /> */}
                  </div>
                </div>
                {/* <div className="grid grid-cols-2 gap-x-2">
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
                </div> */}
              </div>
            </div>

            {/* Danh sach */}
            <div className=" px-2 ">
              <div
                className={`grid flex gap-5   ${
                  DarkMode
                    ? "dark:bg-zinc-900 bg-zinc-900"
                    : "dark:bg-zinc-100 bg-zinc-100"
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
                      label={t("lblDeviceSerialNumber") + "(*)"}
                      TextChange={(value: any) => {
                        setDeviceSerialNum(value);
                      }}
                      value={DeviceSerialNum}
                      keys="lblDeviceSerialNumber"
                    />
                  </div>
                  <div>
                    <TextInput
                      label={t("lblBrand") + "(*)"}
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
                    label={t("lblEquipmentName") + "(*)"}
                    TextChange={(value: any) => {
                      setEquipmentName(value);
                    }}
                    value={EquipmentName}
                    keys="lblEquipmentName"
                  />
                </div>
                <div>
                  <TextInput
                    label={t("lblSupplier") + "(*)"}
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

                <div className="grid ">
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
                  {/* <div>
                    <RadioCheck
                      names={"Status"}
                      item={optionsVaild}
                      OnChecked={() => {
                        // settxtStatus(value);
                        // console.log(value);
                      }}
                      value={txtStatus}
                    />
                  </div> */}
                </div>
                <div className="grid grid-cols-2 gap-x-2 ">
                  <div>
                    <TextInput
                      label={t("lblBuilding")}
                      TextChange={(value: any) => {
                        setBuilding(value);
                      }}
                      value={Building}
                      keys="lblBuilding"
                    />
                  </div>
                  <div>
                    <TextInput
                      label={t("lblDepartment_Line")}
                      TextChange={(value: any) => {
                        setDepartmentLine(value);
                      }}
                      value={DepartmentLine}
                      keys="lblDepartment_Line"
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
                {dataReceived ? (
                  <button
                    onClick={EditDevice}   disabled={!user || user === ''}
                    className={` ${!user && user ==='' ? 'cursor-not-allowed select-none bg-gray-300' : 'bg-blue-500'} btn mt-3 py-3 font-bold text-white px-4 rounded-lg  flex text-center justify-center items-center `}
                  >
                    {t("btnEdit")}
                  </button>
                ) : (
                  <button
                    onClick={AddDevice}   disabled={!user || user === ''}
                    className={`${!user && user ==='' ? 'cursor-not-allowed select-none bg-gray-300' : 'bg-blue-500 '}  btn mt-3 py-3 font-bold text-white px-4 rounded-lg flex text-center justify-center items-center`}
                  >
                    {t("btnAdd")}
                  </button>
                )}

                <button
                  onClick={resetValue}
                  className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-gray-500 flex text-center justify-center items-center"
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
