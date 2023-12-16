/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FileInput from "../../components/FileInput";
import ImageCropper from "../../components/ImageCropper";
import CustomModal from "../../components/CustomModal";
import MenuBar from "../../components/MenuBar";
import Camera from "../../components/Camera";
// import { IoCamera } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import CreateInput from "../../components/CreateInput";
const HomeScreen = () => {
  const [image, setImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("chooseImg");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
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
    // console.log("cái gì đây", imgCroppedArea);
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;
    // console.log(imgCroppedArea);
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

        console.log(dataURL);
      };
    }
  };
  const onCropCancel = () => {
    // setCurrentMenu("chooseImg");
    // setImage("");
    setModalIsOpen(false);
  };
  return (
    <>
      <MenuBar>
        <div className="container ">
          <div className=" flex grid grid-rows-2 md:grid-rows-2 lg:grid-rows-1 xl:grid-rows-1 grid-flow-col ">
            <div className=" ">
              <p className="titleName ">Upload thiết bị mới</p>
              <div className="grid container grid-cols-1 md:grid-cols-1 xl:grid-cols-2 lg:grid-cols-2  flex">
                <div className="  flex flex-row   justify-center  ">
                  {currentMenu === "chooseImg" ? (
                    // <div className=" reviewImg">
                    <div className="  cropped-img NoneImg grid  flex grid-rows-5 content-end ">
                      <div className="row-span-2 uploadView">
                        <p> Camera </p>
                        <p> OR</p>
                        <p>Upload an Image </p>
                      </div>
                      <div className="jus">
                        <button
                          className="btn rounded-xl px-4 py-2 bg-purple-600 text-white "
                          onClick={() => setCurrentMenu("Camera")}
                        >
                          Camera
                        </button>
                      </div>

                      {/* <div className="jus"> */}
                      <FileInput onImageSelected={onImageSelected} />
                      {/* </div> */}
                    </div>
                  ) : // </div>
                  currentMenu === "Camera" ? (
              
                    <Camera
                      onCancelCam={onCancelCam}
                      onImageSelected={onImageSelected}
                    />
                  ) : (
                    <div className="  px-0 mx-0  cropped-img">
                      <img src={imgAfterCrop} className="aspect-square"/>

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
                <div className="border conatiner">
đâsdasd
                  {/* <input type="text" className="w-100 w-full  border rounded-full px-4 text-2xl" value={"sdasdsa"} /> */}
                </div>
              </div>
            </div>

            {/* Danh sach */}
            <div className="">
              <p className="titleName">Danh sách thiết bị vừa nhập</p>
              <div className="grid ">
                <TextInput />


              </div>
              <div>
              <SelectInput />

              </div>
              <div>
                <CreateInput />

              </div>
            </div>
          </div>
        </div>

        <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
          <div className="h-full w-full  bg-dark">
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
