/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useCallback, useState } from "react";
import { IoCamera } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { PiCameraRotateThin } from "react-icons/pi";
import Webcam from "react-webcam";

interface CameraProps {
  onImageSelected: (dataURL: string | ArrayBuffer | null) => void;
  onCancelCam: (value: string) => void;
}

const Camera: React.FC<CameraProps> = ({ onCancelCam, onImageSelected }) => {
  const [latcamera, setLatcamera] = useState(false);
  const videoConstraints: MediaTrackConstraints = {
    // width: '100%' as ConstrainULong,
    // height: '100%' as ConstrainULong,
    width: 300,
    height: 300,
    facingMode: latcamera ?'user':'environment',
    // mirrored: false, 
    // ForceScreenshotSourceSize:true,
    // screenshotQuality: 1,
    //facingMode: { exact: "environment" },
    aspectRatio: 1,

  };
  const webcamRef = useRef<Webcam | null>(null);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // console.log(imageSrc);
      onImageSelected(imageSrc);
    }
  }, [webcamRef]);


  const HandleCancel = () => {
    onCancelCam('Camera')
  }
  return (
    <>
      <div className="" >
        <Webcam
          audio={false}
          ref={webcamRef as React.RefObject<Webcam>}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          screenshotQuality={1}
          imageSmoothing={true}
          mirrored={false}
        />
        <div className="grid grid-cols-3  ">
          <button className="text-red-500 border dark:border-yellow-400 justify-center items-center  flex  btn px-2 text-3xl" onClick={HandleCancel}><ImCancelCircle />
          </button>
          <button className="text-red-500 border dark:border-yellow-400 justify-center items-center  flex  btn px-2 text-3xl" onClick={()=>{setLatcamera(!latcamera)}} ><PiCameraRotateThin />
          </button>
          <button className="text-fuchsia-700 border dark:border-yellow-400 justify-center items-center   flex  btn px-2 text-4xl" onClick={capture}><IoCamera />
          </button>
        </div>
      </div>
    </>
  );
};

export default Camera;
