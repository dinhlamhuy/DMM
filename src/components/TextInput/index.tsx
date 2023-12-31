interface InputProps {
  label: string | null;
  keys: string | undefined;

  TextChange: (value: string | null) => void;
  value: string | undefined;
}
const TextInput: React.FC<InputProps> = ({
  label,
  TextChange,
  value,
  keys,
}) => {
  const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    TextChange(event.target.value);
  };

  return (
    <div className="relative  " key={keys + "1"}>
      <input
        key={keys + "2"}
        type="text"
        value={value}
        onChange={HandleTextChange}
        id={keys}
        className="block rounded-xl border-gray-300 focus:border-gray-300 focus:border-l focus:border-r focus:border-b border-l border-r border-b p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-xl border-gray-300 appearance-none bg-white  forcus:shadow  peer"
        placeholder=" "
      />
      <label
        key={keys + "3"}
        htmlFor={keys}
        className={`

        peer-focus:border-t peer-focus:border-l peer-focus:top-1  
        peer-focus:border-r peer-focus:rounded-t-lg   
          peer-focus:truncate   peer-placeholder-shown:truncate 
       
          truncate text-ellipsis  flex  
          line-clamp-1
        ${
          value
            ? ` border-t border-l border-r-1 shadow-t shadow-l  rounded-t-lg  start-0  px-2 
        ${
          label != null && label.length <= 0.9 * 30 ? " max-w-full w-fit" : "w-full max-w-fit" }` : "start-1 w-11/12 max-w-fit"
        }
        absolute  text-gray-300  duration-300 transform -translate-y-4 scale-75 top-1  origin-[0] bg-white pl-2  peer-focus:px-2 text-nowrap   peer-placeholder-shown:scale-100 
        peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextInput;
