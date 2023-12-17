/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FileInput from "../../components/FileInput";
import ImageCropper from "../../components/ImageCropper";
import CustomModal from "../../components/CustomModal";
import MenuBar from "../../components/MenuBar";
import Camera from "../../components/Camera";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import CreateInput from "../../components/CreateInput";
import DatetimePicker from "../../components/DatetimePicker";

const HomeScreen = () => {
  const [image, setImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("chooseImg");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [text, setText] = useState("");
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
  // useEffect(() => {
  //   console.log(imgAfterCrop)
  // }, [imgAfterCrop])


  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla1", label: "Vanilla" },
    { value: "vanilla2", label: "Vanilla" },
    { value: "vanilla2", label: "Vanilla" },
    { value: "vanilla3", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vani圣达菲sflla", label: "Vanilla" },
    { value: "vanilla", label: "Vanillas" },
    { value: "vanillas", label: "Vanillas" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanillasdf", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <MenuBar>
        <div className="container items-center justify-center mx-auto">
          {/* //  */}
          <div className=" flex grid
           grid-flow-col  grid-rows-2 md:grid-rows-2 gap-3 lg:grid-rows-1 xl:grid-rows-1 
           ">
            <div className=" ">
              <p className="titleName ">Upload thiết bị mới</p>
              <div className="grid  grid-cols-1 md:grid-cols-1 xl:grid-cols-2 lg:grid-cols-2  flex  ">
                <div className="  flex flex-row   justify-center  ">
                  {currentMenu === "chooseImg" ? (
                    // <div className=" reviewImg">
                    <div className="  cropped-img NoneImg grid  flex  content-around md:py-5 lg:py-5 xl:py-5  ">
                      <div className="row-span-2 uploadView">
                        <p> Camera </p>
                        <p> OR</p>
                        <p>Upload an Image </p>
                      </div>
                      <div className="justify-center">
                        <button className="btn rounded-xl px-4 py-2 bg-purple-600 text-white " onClick={() => setCurrentMenu("Camera")} >
                          Camera
                        </button>
                      </div>
                      <div>
                        <FileInput onImageSelected={onImageSelected} />
                      </div>


                    </div>
                  ) :
                    currentMenu === "Camera" ? (

                      <Camera
                        onCancelCam={onCancelCam}
                        onImageSelected={onImageSelected}
                      />
                    ) : (
                      <div className="  px-0 mx-0  cropped-img">
                        <img src={imgAfterCrop} className="aspect-square" />

                        <div className="grid grid-cols-2">
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
                  <div >
                    <TextInput label="Mã số quản lý / Unique code" TextChange={(value: any) => { setText(value) }} value={text} key="input1" />
                  </div>
                  <div >
                    <TextInput label="Mã số tài sản / Factory code" TextChange={(value: any) => { setText(value) }} value={text} key="input2" />
                  </div>
                  <div >
                    <TextInput label="Dòng thiết bị / Model" TextChange={(value: any) => { setText(value) }} value={text} key="input3" />
                  </div>
                  <div >
                    <TextInput label="Nhóm / Group" TextChange={(value: any) => { setText(value) }} value={text} key="input4" />
                  </div>
                  <div className="relative">
                    <DatetimePicker label="Ngày nhập về / Incomming date" />

                  </div>

                </div>
              </div>

              <div className="flex items-center mt-10 ">
                <div className="border-t-2 border-b-2 h-2 shadow border-gray-300 flex-grow"></div>
                <div className="px-3 text-gray-800 text-xl font-bold border rounded-full shadow ">Thông tin chi tiết thiết bị</div>
                <div className="border-t-2 border-b-2 h-2 shadow border-gray-300 flex-grow"></div>
              </div>
              <div className="grid flex gap-5 mt-8 bg-yellow-100 pt-5 px-2.5 shadow rounded-lg">
                <div >
                  <TextInput label="Số Serial thiết bị / Device Serial No " TextChange={(value: any) => { setText(value) }} value={text} key="input5" />
                </div>
                <div >
                  <TextInput label="Nhà cung ứng / Supplier" TextChange={(value: any) => { setText(value) }} value={text} key="input6" />
                </div>
                <div >
                  <TextInput label="Nhãn hiệu / Brand" TextChange={(value: any) => { setText(value) }} value={text} key="input6" />
                </div>
                <div >
                  <TextInput label="Tên thiết bị / Equipment Name" TextChange={(value: any) => { setText(value) }} value={text} key="input7" />
                </div>
                <div >
                  <TextInput label="Nhóm / Group" TextChange={(value: any) => { setText(value) }} value={text} key="input8" />
                </div>
                <div >

                </div>
              </div>


            </div>

            {/* Danh sach */}
            <div className=" p-3">
              <p className="titleName">Danh sách thiết bị vừa nhập</p>
              <div className="flex items-center  ">
                <div className="border-t-2 border-b-2 h-2 shadow border-gray-300 flex-grow"></div>
                <div className="px-3 text-gray-800 text-xl font-bold border rounded-full shadow ">Kiểm tra định kỳ</div>
                <div className="border-t-2 border-b-2 h-2 shadow border-gray-300 flex-grow"></div>
              </div>
              <div className="grid flex gap-5 mt-8 bg-gray-100 pt-5 px-2.5 shadow rounded-lg">
                <div >
                  <TextInput label="Mục đích sử dụng /  Use Purpose" TextChange={(value: any) => { setText(value) }} value={text} key="input5" />
                </div>
                <div >
                  <TextInput label="Phạm Vi / Range" TextChange={(value: any) => { setText(value) }} value={text} key="input6" />
                </div>
                <hr />
                <div >
                  <TextInput label="Xưởng / Building" TextChange={(value: any) => { setText(value) }} value={text} key="input6" />
                </div>
                <div >
                  <TextInput label="Đơn vị-Chuyền / Department-Line" TextChange={(value: any) => { setText(value) }} value={text} key="input7" />
                </div>
                <div >
                  <TextInput label="Người Phụ Trách / Person in charge" TextChange={(value: any) => { setText(value) }} value={text} key="input8" />
                </div>
                <div className="flex items-center  ">
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                  <div className="px-3 text-gray-600 text-xs font-bold border rounded-full shadow ">Hiệu chuẩn nội bộ / Internal Calibration</div>
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                </div>
                <div className="grid grid-cols-2">
                  <div >
                    <TextInput label="Tần suất / Current Frequency" TextChange={(value: any) => { setText(value) }} value={text} key="input8" />
                  </div>
                  <div >
                    <TextInput label="Tần suất theo adidas" TextChange={(value: any) => { setText(value) }} value={text} key="input8" />
                  </div>
                </div>
                <div className="flex items-center  ">
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                  <div className="px-3 text-gray-600 text-xs font-bold border rounded-full shadow ">Hiệu chuẩn ngoài / External Calibration</div>
                  <div className="border-t-2 border-b-2 h-1 shadow border-gray-300 flex-grow"></div>
                </div>
                <div>
                    <TextInput label="Tần suất theo adidas" TextChange={(value: any) => { setText(value) }} value={text} key="input8" />
                  </div>
               
                <div className="grid grid-cols-2 gap-2">
                <div>
                  <DatetimePicker label="Ngày hiệu chuẩn / Date Of Calibration" />
                </div>
                <div >
                  <DatetimePicker label="Ngày hiệu chuẩn tiếp theo / Date Of Next Calibration" />
                </div>
              </div>
                <div></div>

              </div>



              {/* <div >
                <TextInput label="Text" TextChange={(value: any) => { setText(value) }} value={text} />
              </div>
              <div>
                <SelectInput label="Chọn Mã kệ" options={options} />

              </div>
              <div>
                <CreateInput label="Chọn vị trí hoặc thêm" options={options} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <DatetimePicker label="Ngày nhập về/ " />
                </div>
                <div >
                  <DatetimePicker label="Ngày nhập về/ " />
                </div>
              </div> */}
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
