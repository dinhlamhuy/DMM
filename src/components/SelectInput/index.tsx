import Select from "react-select";
interface SelectProps {
  label:string;
  options: Option[];
}
interface Option {
  value: string;
  label: string;
}



const SelectInput: React.FC<SelectProps> = ({label,options}) => (
  <div className="relative w-full">
    <Select className=" selectStyle
    peer  p-0 w-full   text-sm  
    disabled:opacity-50 
    disabled:pointer-events-none 
   
  focus:pt-6
  focus:pb-2
  [&:not(:placeholder-shown)]:pt-6
  [&:not(:placeholder-shown)]:pb-2
  autofill:pt-6
  autofill:pb-2" 
      options={options}
      placeholder="Chọn mã kệ"
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,

        colors: {
          ...theme.colors,
          primary50: "hotpink",
          primary: "black",
        },
      })}
    />
    <label
      className="absolute  top-5 left-3 bg-white px-2   h-fit     border-t-1 border-l-1 border-r-1 rounded-full bg-gray-100 shadow-md shadow-gray-300 
      start-0  ml-0.5 text-ms
      truncate pointer-events-none transition ease-in-out 
      duration-100 border border-transparent 
      peer-disabled:opacity-50 peer-disabled:pointer-events-none
    
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-gray-500
    "
    >
     {label}
    </label>
  </div>
);

export default SelectInput;
