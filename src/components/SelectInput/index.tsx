import Select from "react-select";

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
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanillasdf", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
  { value: "vanilla", label: "Vanilla" },
];

const SelectInput = () => (
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
      className="absolute  top-5 left-3 bg-white px-2 text-blue-600  h-fit   
      start-0  
      truncate pointer-events-none transition ease-in-out 
      duration-100 border border-transparent 
      peer-disabled:opacity-50 peer-disabled:pointer-events-none
    
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-gray-500
    "
    >
     Select
    </label>
  </div>
);

export default SelectInput;
