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
      <div className="Container border">
        <div className="grid grid-cols-2 grid-flow-col ">
          <div className="text-center">
            <p>Upload thiết bị mới</p>
            {currentMenu === "chooseImg" ? (
              <FileInput onImageSelected={onImageSelected} />
            ) : (
              <div>
                <div>
                  <img src={imgAfterCrop} className="cropped-img" />
                </div>
                <button
                  onClick={() => {
                    setCurrentMenu("cropImg");
                    openModal();
                  }}
                  className="btns"
                >
                  Chỉnh sửa
                </button>

                <button
                  onClick={() => {
                    setCurrentMenu("chooseImg");
                    setImage("");
                    closeModal();
                  }}
                  className="btns "
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
          <div className="border">Danh sách thiết bị vừa nhập</div>
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
