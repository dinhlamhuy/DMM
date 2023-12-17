interface InputProps {
  label: string | null;
  key: string;

  TextChange: (value: string | null) => void;
  value: string | undefined;

}
const TextInput: React.FC<InputProps>  = ({label,TextChange,value,key}) => {
  const HandleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Call the TextChange prop with the new value
    TextChange(event.target.value);
  };

  return(
  <>
    <div className="relative  ">
      <input
        type="text" 
        value={value}
        onChange={HandleTextChange}
        id={key}
        className="block rounded-xl border-gray-300 shadow   border p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-xl border-gray-300 appearance-none bg-white  focus:outline-none focus:ring-0 focus:border-gray-400 peer"
        placeholder=" "
      />
      <label
        htmlFor={key}
        className={`
        peer-focus:border-t-1 peer-focus:border-l-1 peer-focus:top-1  
        peer-focus:border-r-1 peer-focus:rounded-full 

        ${value ? " border-t-1 border-l-1 border-r-1 rounded-full   ":""}
        absolute  text-gray-300  duration-300 transform -translate-y-4 scale-75 top-1  origin-[0] bg-white  px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 
        peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2  peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
      >
        {label}
      </label>
    </div>
  </>
)};

export default TextInput;
