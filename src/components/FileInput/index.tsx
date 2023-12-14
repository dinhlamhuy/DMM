/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, ChangeEvent } from "react";

interface FileInputProps {
  onImageSelected: (dataURL: string | ArrayBuffer | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files[0].type.startsWith("image/")) {
      
        console.log("Selected file is an image:", event.target.files[0]);
        const reader = new FileReader();
        // reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
          if (reader.readyState === 2) {
            onImageSelected(reader.result);
          }
        };
        reader.readAsDataURL(event.target.files[0]);
        // console.log(reader.result)
      }else{
        console.log("Không phải hình ảnh:", event.target.files[0]);
      }

    }
  };

  const onChooseImg = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />

      <button className="btns" onClick={onChooseImg}>
        Chọn Ảnh
      </button>
    </div>
  );
};

export default FileInput;
