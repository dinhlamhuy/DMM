/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropDone, onCropCancel }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const [aspectRatio] = useState(1 / 1);
  const onCropComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  // const onAspectRatioChange = (event: any) => {
  //     setAspectRadio(event.target.value);

  // }
  return (
    <div className="cropper">
      {/* <div> */}
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
            },
          }}
        />
      {/* </div> */}
      <button className="btns btnCancel " onClick={onCropCancel}>
        Hủy
      </button>
      <button
        className="btns btnDone "
        onClick={() => {
          onCropDone(croppedArea);
        }}
      >
       Hoàn tất
      </button>
    </div>
  );
};

export default ImageCropper;
