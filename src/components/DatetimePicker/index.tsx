import { getMonth, getYear } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Portal } from "react-overlays";
import "react-datepicker/dist/react-datepicker.css";
interface DatePickerProps {
 label:string;
}

const DatetimePicker: React.FC<DatePickerProps> = ({label}) => {

  const CalendarContainer = ({ children }:any) => {
    const el = document.getElementById("calendar-portal");
    return <Portal container={el} >{children}</Portal>;
  };
  const years = Array.from({ length: getYear(new Date()) - 1999 }, (_, index) => 2007 + index);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [startDate, setStartDate] = useState(new Date());




  return (
    <>
 <label  className="relative text-left w-fit flex  text-red-900  duration-300 transform  border-t-1 border-l-1 border-r-1 rounded-full bg-gray-100 shadow-md shadow-gray-300 
      -translate-y-4 scale-75 top-6 z-10   origin-[0] bg-white  px-2 
 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
      peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 
      rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 border-X"
      >
        {label}
      </label>
      <DatePicker 
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
          
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="btn  px-3 py-1 bg-blue-300 rounded-lg  ">
              {"<"}
            </button>
            <select
              value={getYear(date)}
              onChange={
                ({ target: { value } }) => changeYear(Number(value))
              }
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="btn  px-3 py-1 bg-blue-300 rounded-lg  ">
              {">"}
            </button>
          </div>
        )}
        popperContainer={CalendarContainer} popperPlacement="bottom-end"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 0],
            },
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true, 
            },
          },
        ]}
        placeholderText='YYYY/MM/DD'  
        dateFormat="yyyy/MM/dd" className='block   text-center border p-2.5 w-full 
        text-sm text-gray-900 bg-transparent rounded-xl shadow-md 
        appearance-none   bg-white flex
          peer '
        selected={startDate} onChange={(date: any) => setStartDate(date)} />

     
    </>
  );
}
export default DatetimePicker;

