/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FileInput from "../../components/FileInput";
import ImageCropper from "../../components/ImageCropper";
import CustomModal from "../../components/CustomModal";
import MenuBar from "../../components/MenuBar";

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
        console.log(dataURL)
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
        <div className="Container ">
          <div className="Container flex grid grid-rows-2 md:grid-rows-2 lg:grid-rows-1 xl:grid-rows-1  grid-flow-col ">
            <div className="text-center">
              <p className="titleName">Upload thiết bị mới</p>
              {currentMenu === "chooseImg" ? (
                <div className="Container flex justify-center   reviewImg">
                  <div className="cropped-img NoneImg grid flex grid-rows-5 content-end s" >
                    <div className="row-span-2 uploadView">
                      <p>  Camera </p>
                      <p> OR</p>
                      <p>Upload an Image </p>
                    </div>
                    <div>

                      <button className="btns ">Camera</button>
                    </div>

                    <div>

                      <FileInput onImageSelected={onImageSelected} />
                    </div>

                  </div>

                </div>
              ) : (
                <div className="Container flex justify-center   reviewImg">
                  <div className="  ">

                    <img src={imgAfterCrop} className="cropped-img" />
                  </div>
                  <div className="grid grid-rows-2">
                    <button
                      onClick={() => {
                        setCurrentMenu("cropImg");
                        openModal();
                      }}
                      className="btn  border "
                    >
                      Chỉnh sửa
                    </button>

                    <button
                      onClick={() => {
                        setCurrentMenu("chooseImg");
                        setImage("");
                        closeModal();
                      }}
                      className="btn border "
                    >
                      Xóa
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Danh sach */}
            <div className=""><p className="titleName">Danh sách thiết bị vừa nhập</p>

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
