// import { ActionMeta, SingleValue } from 'react-select';
import CreatableSelect from "react-select/creatable";
interface SelectProps {
  label: string;
  options: Option[];
  value: string | undefined;
  OnSelected: (value: string | null) => void;
}
interface Option {
  value: string;
  label: string;
}

const CreateInput: React.FC<SelectProps> = ({
  label,
  options,
  value,
  OnSelected,
}) => {
  const handleChange = (selectedOption: Option | null) => {
    OnSelected(selectedOption ? selectedOption.value : null);
  };

  return (
    <div className="relative w-full ">
      <CreatableSelect
        className="   selectStyle
    peer  p-0 w-full   text-sm  
    disabled:opacity-50 
    disabled:pointer-events-none 
   z-12
  focus:pt-6
  focus:pb-2
  [&:not(:placeholder-shown)]:pt-6
  [&:not(:placeholder-shown)]:pb-2
  autofill:pt-6
  autofill:pb-2"
        isClearable
        onChange={handleChange}
        // inputValue={value}
        options={options}
        placeholder={label}
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
      {value ? (
        <label
          className="absolute  top-5 bg-white px-2 text-blue-600  h-fit  
   rounded-t-lg
  start-0  
  truncate pointer-events-none transition ease-in-out 
  duration-100 border border-transparent 
  peer-disabled:opacity-50 peer-disabled:pointer-events-none

  truncate text-ellipsis max-w-fit  flex  
peer-[:not(:placeholder-shown)]:text-xs
peer-[:not(:placeholder-shown)]:-translate-y-1.5
peer-[:not(:placeholder-shown)]:text-gray-500
"
        >
          {label}
        </label>
      ) : (<label className="absolute  top-5">&ensp;</label>)}
    </div>
  );
};

export default CreateInput;
