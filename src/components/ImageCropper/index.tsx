/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
const ImageCropper = ({ image, onCropDone, onCropCancel }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const [aspectRatio] = useState(1 / 1);
  const onCropComplete = (
    _croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    // console.log(croppedAreaPixels)
    // console.log(_croppedAreaPercentage)
    setCroppedArea(croppedAreaPixels);
  };

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const imgAspectRatio = img.width / img.height;
      
      if (imgAspectRatio > aspectRatio) {
        // Image is wider than 1:1, so fit to width
        setZoom(1);
      } else {
        // Image is taller than 1:1, so fit to height
        const zoomLevel = aspectRatio / imgAspectRatio;
        setZoom(zoomLevel);
      }
    };
  }, [image, aspectRatio]);
  

  // const onAspectRatioChange = (event: any) => {
  //     setAspectRadio(event.target.value);

  // }
  return (
    <div className="cropper ">
      {/* <div> */}
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          minZoom={0.5}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          // onZoomChange={handleZoomChange}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "100%",
              // backgroundColor: "#fff",
              backgroundColor: "#004",
            },
            mediaStyle: {
              objectFit: "contain",
              objectPosition:"center" // Ensures the image fits within the container
            },
          }}
        />
      {/* </div> */}
      <button className="btns btnCancel " onClick={onCropCancel}><IoClose /></button>
      <button
        className="btns btnDone "
        onClick={() => {
          onCropDone(croppedArea);
        }}
      ><FaCheck />
      </button>
    </div>
  );
};

export default ImageCropper;
