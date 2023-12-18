interface RadioProps {
   
    item:Option[];
    OnChecked: (value: string | null) => void;
    value: string | undefined;
  }

  interface Option {
    value: string;
    label: string;
    cusClass:string;
  }
const RadioCheck: React.FC<RadioProps> = ({ item, OnChecked, value}) => {
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        OnChecked(event.target.value);
      };
  return (
    <>
      <ul className="grid w-full gap-2 md:grid-cols-2">
      {item.map((radioItem) => (
          <li key={radioItem.value}>
            <input
              type="radio"
              id={`radio-${radioItem}`}
              name={radioItem.value}
              value={value}
              className={`${radioItem.cusClass} hidden peer`}
              onChange={handleRadioChange}
              checked={value === radioItem.value}
              
            />
            <label
              htmlFor={`radio-${radioItem}`}
              className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer 
               peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 "
            >
              <div className="block">{radioItem.label}</div>
            </label>
          </li>
        ))}
        {/* <li>
          <input
            type="radio"
            id="hosting-small"
            name="hosting"
            value="hosting-small"
            className="hidden peer"
            required
          />
          <label
            htmlFor="hosting-small"
            className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 "
          >
            <div className="block">đâsdasdasd</div>
          </label>
        </li> */}
       
      </ul>
    </>
  );
};

export default RadioCheck;
