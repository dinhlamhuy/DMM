/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FileInput from "../../components/FileInput";
import ImageCropper from "../../components/ImageCropper";
import CustomModal from "../../components/CustomModal";
import MenuBar from "../../components/MenuBar";
import Camera from "../../components/Camera";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
// import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import CreateInput from "../../components/CreateInput";
import DatetimePicker from "../../components/DatetimePicker";
import { useTranslation } from "react-i18next";
import RadioCheck from "../../components/RadioCheck";

const HomeScreen = () => {
  const { t } = useTranslation();

  const [image, setImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("chooseImg");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const [UniCode, setUniCode] = useState("");
  const [FactoryCode, setFactoryCode] = useState("");
  const [Model, setModel] = useState("");
  const [selectedGroup, setselectedGroup] = useState("");
  const [IncommingDate, setIncommingDate] = useState<Date>();
  const [CurrentFrequency, setCurrentFrequency] = useState("");
  const [FrequencyAdidas, setFrequencyAdidas] = useState("");
  const [FrequencyOutAdidas, setFrequencyOutAdidas] = useState("");
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
        setCurrentMenu("imgCropped");
      };
    }
  };
  const onCropCancel = () => {
    // setCurrentMenu("chooseImg");
    // setImage("");
    setModalIsOpen(false);
  };

  const options = [
    { value: "1", label: "Nhóm 1" },
    { value: "2", label: "Nhóm 2" },
    { value: "3", label: "Nhóm 3" },
    { value: "4", label: "Nhóm 4" },
    { value: "5", label: "Nhóm 5" },
  ];
  const optionsRadio = [
    {
      value: "PASS",
      label: t("lblPass"),
      cusClass:
        "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
    },
    {
      value: "FAIL",
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

  return (
    <>
      <MenuBar>
        <div className="container items-center justify-center mx-auto">
          {/* //  */}
          <div
            className=" flex grid
           grid-flow-col  grid-rows-2 md:grid-rows-2 gap-3 lg:grid-rows-1 xl:grid-rows-1 
           "
          >
            <div className=" ">
              <p className="titleName ">{t("lblUploadNewDevice")}</p>
              <div className="grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2  flex  ">
                <div className="  flex flex-row   justify-center mb-14 md:mb-14  ">
                  {currentMenu === "chooseImg" ? (
                    // <div className=" reviewImg">
                    <div className="  cropped-img NoneImg grid  flex  content-around md:py-5 lg:py-5 xl:py-5  ">
                      <div className="row-span-2 uploadView">
                        <p> Camera </p>
                        <p> OR</p>
                        <p>Upload an Image </p>
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
                          className=" text-red-600 btnIcon btn border items-center flex text-center justify-center   text-3xl p-2"
                        >
                          <FaRegTrashAlt />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentMenu("cropImg");
                            openModal();
                          }}
                          className="text-green-700 btnIcon btn  border  items-center flex text-center justify-center  text-3xl p-2"
                        >
                          <MdEditSquare />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className=" grid  gap-y-5  border py-4 px-2.5 bg-gray-100 rounded-md  relative flex items-end   shadow-md">
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
                      options={options}
                      value={selectedGroup}
                      OnSelected={(value: any) => {
                        setselectedGroup(value);
                      }}
                    />

                    {/* <TextInput label="Nhóm / Group" TextChange={(value: any) => { setText(value) }} value={text}keys="input4" /> */}
                  </div>
                  <div className="relative ">
                    <DatetimePicker label={t("lblIncommingDate")} onChangeDate={(date:any)=> setIncommingDate(date)}  DateSelected={IncommingDate} />
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center mt-10  ">
                <div className="border-t-2 border-b h-2 shadow border-gray-300 flex-grow"></div>
                <div className="px-3 text-gray-800 text-xl font-bold border rounded-full shadow ">
                  Kiểm tra định kỳ
                </div>
                <div className="border-t-2 border-b h-2 shadow border-gray-300 flex-grow"></div>
              </div> */}
              <div className="grid flex gap-5 mt-6 bg-gray-100 pt-4 px-2.5 shadow rounded-lg">
                <div className="flex items-center  ">
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                  <div className="px-3 text-gray-600 text-xs font-bold border rounded-full shadow ">
                    {t("lblInternalCalibration")}
                  </div>
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 ">
                  <div>
                    <TextInput
                      label={t("lblCurrentFrequency")}
                      TextChange={(value: any) => {
                        setCurrentFrequency(value);
                      }}
                      value={CurrentFrequency}
                      keys="lblCurrentFrequency"
                    />
                  </div>
                  <div>
                    <TextInput
                      label={t("lblFrequencyFollowAdidasRequirement")}
                      TextChange={(value: any) => {
                        setFrequencyAdidas(value);
                      }}
                      value={FrequencyAdidas}
                      keys="lblFrequencyFollowAdidasRequirement1"
                    />
                  </div>
                </div>
                <div className="flex items-center  ">
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                  <div className="px-3 text-gray-600 text-xs font-bold border rounded-full shadow ">
                    {t("lblExternalCalibration")}
                  </div>
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                </div>
             
                <div>
                  <TextInput
                    label={t("lblFrequencyFollowAdidasRequirement")}
                    TextChange={(value: any) => {
                      setFrequencyOutAdidas(value);
                    }}
                    value={FrequencyOutAdidas}
                    keys="lblFrequencyFollowAdidasRequirement2"
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
                        // console.log(value);
                      }}
                      value={sttResult}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  <div>
                    <DatetimePicker label={t("lblDateOfCalibration")} onChangeDate={(date:any)=> setDateCalibration(date)}  DateSelected={DateCalibration} />
                  </div>
                  <div>
                    <DatetimePicker label={t("lblDateOfNextCalibration")} onChangeDate={(date:any)=> setDateNextCalibration(date)}  DateSelected={DateNextCalibration} />
                  </div>
                </div>

              
              </div>
            </div>

            {/* Danh sach */}
            <div className=" p-3  ">
              <div className="flex items-center mt-12  ">
                <div className="border-t-2 border-b-2 h-2 shadow border-gray-300 flex-grow"></div>
                <div className="px-3 text-gray-800 text-xl font-bold border rounded-full shadow ">
                  {t("lblDeviceDetails")}
                </div>
                <div className="border-t-2 border-b-2 h-2 shadow border-gray-300 flex-grow"></div>
              </div>
              {/* <p className="titleName">Danh sách thiết bị vừa nhập</p> */}
              <div className="grid flex gap-5 mt-8 bg-yellow-100 pt-5 px-2.5 shadow rounded-lg">
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
                <div className="grid grid-cols-2 gap-2">
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
                <div>
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
                <button className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-gray-400 flex text-center justify-center items-center " disabled>Chỉnh sửa</button>
                <button className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-blue-500 flex text-center justify-center items-center">Thêm mới</button>
                <button className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-blue-500 flex text-center justify-center items-center">Làm mới</button>
                {/* <button className="btn mt-3 py-3 font-bold text-white px-4 rounded-lg bg-blue-500 flex text-center justify-center items-center"></button> */}
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
