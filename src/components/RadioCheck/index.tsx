interface RadioProps {
   
    item:Option[];
    OnChecked: (value: string | null) => void;
    value: string | undefined;
    names: string | undefined;
  }

  interface Option {
    value: string;
    label: string;
    cusClass:string;
  }
const RadioCheck: React.FC<RadioProps> = ({ item, OnChecked, value, names}) => {

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   
        OnChecked(event.target.value);

      };
  return (
    <>
      <ul className="grid w-full gap-2 md:grid-cols-2" >
      {item.map((radioItem) => (
          <li key={radioItem.value} >
            <input
              type="radio"
              id={`radio-${radioItem.value}`}
              name={names}
              value={radioItem.value}
              className={`hidden peer`}
              onChange={handleRadioChange}
              checked={value === radioItem.value}

              
            />
            <label
              htmlFor={`radio-${radioItem.value}`}
              className={`${radioItem.cusClass} inline-flex items-center justify-center  p-1.5 gap-4 border w-3/4 border-gray-200 rounded-lg cursor-pointer 
              text-center  shadow 
              ${value === radioItem.value ? '' : 'bg-white'}
                hover:text-gray-600 hover:bg-gray-100 `}
            >
              <div className={` items-center  ${value === radioItem.value ? 'text-white' : ''} text-center px-2 flex   `}>{radioItem.label}</div>
            </label>
          </li>
        ))}
     
       
      </ul>
    </>
  );
};

export default RadioCheck;
