/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMonth, getYear } from "date-fns";

import DatePicker from "react-datepicker";
import { Portal } from "react-overlays";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
interface DatePickerProps {
  labelStart: string;
  labelEnd: string;
  onChangeDateStart: (value: Date | null) => void;
  onChangeDateEnd: (value: Date | null) => void;

  selectsStart: any;
  selectsEnd: any;
}

const DateRangePicker: React.FC<DatePickerProps> = ({
  labelStart,
  labelEnd,
  onChangeDateStart,
  onChangeDateEnd,
  selectsStart,
  selectsEnd,
}) => {
  const CalendarContainer = ({ children }: any) => {
    const el = document.getElementById("calendar-portal");
    return <Portal container={el}>{children}</Portal>;
  };
  const years = Array.from(
    { length: getYear(new Date()) - 1999 },
    (_, index) => 2007 + index
  );
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

  const handleChangeTime = (dates:  Date | null) => {

    onChangeDateStart(dates);
  };
  const handleChangeTime2 = (dates: Date| null) => {
 
    onChangeDateEnd(dates);
    
  };

  return (
    <>
      <div className="relative ">
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
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="btn  px-3 py-1 bg-blue-300 rounded-lg  "
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(Number(value))}
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

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="btn  px-3 py-1 bg-blue-300 rounded-lg  "
              >
                {">"}
              </button>
            </div>
          )}
          popperContainer={CalendarContainer}
          popperPlacement="bottom-end"
          enableTabLoop={false}
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
          calendarClassName="calender-custom-position"
          placeholderText={labelStart +' (YYYY/MM/DD)'}
          dateFormat="yyyy/MM/dd"
          className="  block  text-center border p-2.5 w-full 
         text-gray-900  rounded-xl shadow  peer
           bg-white  
           "
          selected={selectsStart}
          selectsStart
          startDate={selectsStart}
          endDate={selectsEnd}
          onChange={(value: any) => handleChangeTime(value)}
        />
        
        
        {selectsStart ? (<label
          className="relative text-left w-fit flex  text-red-900  duration-300 transform  border-t-1  rounded-lg  
      -translate-y-4 scale-75 -top-10    origin-[0] bg-white  px-2  mb-0 w-fit 

      
      truncate text-ellipsis w-11/12 lg:w-fit  xl:w-fit  flex  
      
      rtl:peer-focus:translate-x-1/4 
      rtl:peer-focus:left-auto 
      start-0 border-X"
        >
          {labelStart}
        </label>) : ( <label className=" ">&ensp;</label>)}
      </div>
      <div className="relative">
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
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="btn  px-3 py-1 bg-blue-300 rounded-lg  "
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(Number(value))}
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

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="btn  px-3 py-1 bg-blue-300 rounded-lg  "
              >
                {">"}
              </button>
            </div>
          )}
          popperContainer={CalendarContainer}
          popperPlacement="bottom-end"
          enableTabLoop={false}
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
          calendarClassName="calender-custom-position"
          placeholderText= {labelEnd+' (YYYY/MM/DD)'}
          dateFormat="yyyy/MM/dd"
          className="  block  text-center border p-2.5 w-full 
         text-gray-900  rounded-xl shadow  peer
           bg-white  
           "
          selected={selectsEnd}
          selectsEnd
          startDate={selectsStart}
          endDate={selectsEnd}
          minDate={selectsStart}
          onChange={(value: any) => handleChangeTime2(value)}
        />
         {selectsEnd ? (<label
          className="relative text-left w-fit flex  text-red-900  duration-300 transform  border-t-1  rounded-lg  
      -translate-y-4 scale-75 -top-10    origin-[0] bg-white  px-2  mb-0 w-fit 

      
      truncate text-ellipsis w-11/12 lg:w-fit  xl:w-fit  flex  
      
      rtl:peer-focus:translate-x-1/4 
      rtl:peer-focus:left-auto 
      start-0 border-X"
        >
          {labelEnd}
        </label> ) : ( <label className=" ">&ensp;</label>)}
      </div>
    </>
  );
};
export default DateRangePicker;
