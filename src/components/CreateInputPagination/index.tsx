// import { useState } from "react";
import { useState } from "react";
import Select from "react-select";

interface SelectProps {
  label: string;
  options: Option[];
  value: string | undefined | null;
  OnSelected: (value: string | null) => void;
}
interface Option {
  value: string;
  label: string;
}
const CreateInputPagination: React.FC<SelectProps> = ({
  label,
  options,
  value,
  OnSelected,
}) => {
  const [vl, setvl] = useState("ALL");
  const handleChange = (selectedOption: Option | "" | null) => {
    OnSelected(selectedOption ? selectedOption.value : null);
    setvl(selectedOption ? selectedOption.label : "");
  };
  return (
    <div className="relative w-full  ">
      <Select
        className="  
         w-full   text-[12px] 
       p-0 m-0 
       z-12
     "
        // isClearable
        onChange={handleChange}
        value={value ? { label: vl, value } : null}
        options={options}
        placeholder={label}
        theme={(theme) => ({
          ...theme,
          // borderRadius: 10,
          colors: {
            ...theme.colors,
            primary50: "hotpink",
            primary: "black",
          },
        })}
      />
    
    </div>
  );
};

export default CreateInputPagination;
