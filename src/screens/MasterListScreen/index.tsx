/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import MenuBar from "../../components/MenuBar";
import { HiSquares2X2 } from "react-icons/hi2";
import { FaTableCells } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";
// import { Equipment } from "../../utils/MasterList";
import CardMasterList from "../../components/CardMasterList";
import TableMasterList from "../../components/TableMasterList";
import * as ExcelJS from "exceljs";
import { FiFilter } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import moment from "moment";
import CreateInput from "../../components/CreateInput";
import DateRangePicker from "../../components/DateRangePicker";
import RadioCheck from "../../components/RadioCheck";
import {
  api, apiLYM,
  config,
  urlLVL,
  urlLHG,
  urlLYV,
  urlLYM,
} from "../../utils/linkApi";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import CreateInputPagination from "../../components/CreateInputPagination";

const MasterListScreen = () => {
  const { t } = useTranslation();
  const DefautMode = localStorage.getItem("isDark");
  // const getDepartmentLine = localStorage.getItem("Department");
  const [DarkMode, setDarkMode] = useState<boolean>(
    DefautMode ? DefautMode === "true" : false
  );

  const factory = localStorage.getItem("Factory");

  const [list, setList] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [RowTable, setRowTable] = useState<any[]>([]);
  let urlImg = "";
  let linkAPI= "";
  if (factory === "LVL") {
    urlImg = urlLVL;
    linkAPI=api;
  } else if (factory === "LHG") {
    urlImg = urlLHG;
    linkAPI=api;

  } else if (factory === "LYM") {
    console.log(factory)
    urlImg = urlLYM;
    linkAPI=apiLYM;

  } else {
    urlImg = urlLYV;
    linkAPI=api;

  }
  const [newRowTable, setnewRowTable] = useState<any[]>([]);
  //#region Các state tìm kiếm gồm createSelect, Radio, DatePicker
  const [txtUniqueCode, settxtUniqueCode] = useState("");
  const [txtGroup, settxtGroup] = useState("");
  const [txtBuilding, settxtBuilding] = useState("");
  const [txtDepartmentLine, settxtDepartmentLine] = useState("");
  const [chxResult, setchxResult] = useState("");
  const [chxStatus, setchxStatus] = useState("");
  const [optUniqueCode, setOptUniqueCode] = useState<
    { label: string; value: string }[]
  >([]);
  const [optGroup, setOptGroup] = useState<{ label: string; value: string }[]>(
    []
  );
  const [optBuilding, setOptBuilding] = useState<
    { label: string; value: string }[]
  >([]);
  const [optDepartmentLine, setOptDepartmentLine] = useState<
    { label: string; value: string }[]
  >([]);
  const [dtpFromIncommingDate, setdtpFromIncommingDate] = useState<
    Date | null | undefined
  >();
  const [dtpToIncommingDate, setdtpToIncommingDate] = useState<
    Date | null | undefined
  >();
  const [dtpFromDateOfCalibration, setdtpFromDateOfCalibration] = useState<
    Date | null | undefined
  >();
  const [dtpToDateOfCalibration, setdtpToDateOfCalibration] = useState<
    Date | null | undefined
  >();
  const [dtpFromDateOfNextCalibration, setdtpFromDateOfNextCalibration] =
    useState<Date | null | undefined>();
  const [dtpToDateOfNextCalibration, setdtpToDateOfNextCalibration] = useState<
    Date | null | undefined
  >();

  const optionsRadio = [
    {
      value: "Valid",
      label: t("lblValid"),
      cusClass:
        "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
    },
    {
      value: "InValid",
      label: t("lblInValid"),
      cusClass:
        "text-red-500 peer-checked:bg-red-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-red-200",
    },
  ];
  const optionsReusltRadio = [
    {
      value: "PASS",
      label: t("lblPass"),
      cusClass:
        "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
    },
    {
      value: "FAIL",
      label: t("lblFail"),
      cusClass:
        "text-red-500 peer-checked:bg-red-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-red-200",
    },
  ];
  //#endregion
  //#region  function lọc lại các option tìm kiếm

  useEffect(() => {
    setOptUniqueCode(
      Array.from(new Set(newRowTable.map((item) => item.Unique_code))).map(
        (uniqueCode) => {
          return { label: uniqueCode, value: uniqueCode };
        }
      )
    );
    setOptGroup(
      Array.from(new Set(newRowTable.map((item) => item.Group))).map(
        (group) => {
          return { label: group, value: group };
        }
      )
    );

    setOptBuilding(
      Array.from(new Set(newRowTable.map((item) => item.Building))).map(
        (Building) => {
          return { label: Building, value: Building };
        }
      )
    );

    setOptDepartmentLine(
      Array.from(new Set(newRowTable.map((item) => item.Department_Line))).map(
        (departmentLine) => {
          return { label: departmentLine, value: departmentLine };
        }
      )
    );

    // setpageCount(Math.ceil(newRowTable.length / Number(itemsPerPage)));
    // setCurrentPage(0);
    const new_currentData = newRowTable.slice(
      0 * Number(itemsPerPage),
      (currentPage + 1) * Number(itemsPerPage)
    );

    setCurrentData(new_currentData);
    setpageCount(Math.ceil(newRowTable.length / Number(itemsPerPage)));
    setCurrentPage(0);

    // if(Math.ceil(newRowTable.length / itemsPerPage) > currentPage){
    // }
  }, [newRowTable]);
  //#endregion
  //#region function lọc dữ liệu
  useEffect(() => {
    const shouldReset =
      !txtUniqueCode &&
      !txtBuilding &&
      !txtGroup &&
      !txtDepartmentLine &&
      !chxResult &&
      !chxStatus &&
      !dtpFromIncommingDate &&
      !dtpToIncommingDate &&
      !dtpFromDateOfCalibration &&
      !dtpFromDateOfNextCalibration &&
      !dtpToDateOfCalibration &&
      !dtpToDateOfNextCalibration;

    if (shouldReset) {
      setnewRowTable(RowTable);
      return;
    }

    const filterRows = (
      item: any,
      condition: string,
      fieldValue: string | null
    ) => {
      if (fieldValue === null || fieldValue === "") {
        return true;
      }

      if (condition === "Valid") {
        const value = fieldValue === "Valid" ? "OK" : "";
        // console.log(item[condition], value);
        return item[condition] === value;
      } else if (condition === "Result_Company") {
        const value = fieldValue === "PASS" ? "OK" : "";
        // console.log(item[condition], value);

        return item[condition] === value;
      } else {
        return item[condition].includes(fieldValue);
      }
    };

    const filterRowsDate = (
      item: any,
      condition: string,
      fieldValue: {
        startDate: Date | null | undefined;
        endDate: Date | null | undefined;
      }
    ) => {
      if (!fieldValue) {
        return true;
      }

      let startDate = fieldValue.startDate
        ? new Date(fieldValue.startDate)
        : null;
      let endDate = fieldValue.endDate ? new Date(fieldValue.endDate) : null;
      if (!startDate && endDate) {
        startDate = endDate;
      }
      if (startDate && !endDate) {
        endDate = startDate;
      }

      const itemDate = new Date(item[condition]);

      return (
        startDate &&
        endDate &&
        moment(itemDate).format("YYYY/MM/DD") >=
          moment(startDate).format("YYYY/MM/DD") &&
        moment(itemDate).format("YYYY/MM/DD") <=
          moment(endDate).format("YYYY/MM/DD")
      );
    };
    const filteredRows = RowTable.filter((item) => {
      const isUniqueCodeMatched = filterRows(
        item,
        "Unique_code",
        txtUniqueCode
      );
      const isGroupMatched = filterRows(item, "Group", txtGroup);
      const isDepartmentLineMatched = filterRows(
        item,
        "Department_Line",
        txtDepartmentLine
      );
      const isBuildingMatched = filterRows(item, "Building", txtBuilding);
      const isStatusMatched = filterRows(item, "Valid", chxStatus);
      const isResultMatched = filterRows(item, "Result_Company", chxResult);

      const isImmingDateMatched =
        dtpFromIncommingDate || dtpToIncommingDate
          ? filterRowsDate(item, "Incomming_date", {
              startDate: dtpFromIncommingDate,
              endDate: dtpToIncommingDate,
            })
          : true;
      const isDateOfCalibrationMatched =
        dtpFromDateOfCalibration || dtpToDateOfCalibration
          ? filterRowsDate(item, "Date_Of_Calibration", {
              startDate: dtpFromDateOfCalibration,
              endDate: dtpToDateOfCalibration,
            })
          : true;

      const isDateOfNextCalibrationMatched =
        dtpFromDateOfNextCalibration || dtpToDateOfNextCalibration
          ? filterRowsDate(item, "Date_Of_Next", {
              startDate: dtpFromDateOfNextCalibration,
              endDate: dtpToDateOfNextCalibration,
            })
          : true;
      return (
        isUniqueCodeMatched &&
        isBuildingMatched &&
        isGroupMatched &&
        isDepartmentLineMatched &&
        isStatusMatched &&
        isResultMatched &&
        isImmingDateMatched &&
        isDateOfCalibrationMatched &&
        isDateOfNextCalibrationMatched
      );
    });

    setnewRowTable(filteredRows);
  }, [
    txtUniqueCode,
    txtBuilding,
    txtGroup,
    txtDepartmentLine,
    chxResult,
    chxStatus,
    dtpFromIncommingDate,
    dtpToIncommingDate,
    dtpFromDateOfCalibration,
    dtpFromDateOfNextCalibration,
    dtpToDateOfCalibration,
    dtpToDateOfNextCalibration,
  ]);
  //#endregion
  //#region Phân trang

  const [optionsPagination] = useState<any[]>([
    {
      value: "5",
      label: "5",
    },
    {
      value: "10",
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
    {
      value: "1000",
      label: "ALL",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState('20');
  const [currentData, setCurrentData] = useState<any[]>([]);
  // const itemsPerPage = 4;
  // const currentData = newRowTable.slice(
  //   currentPage * Number(itemsPerPage),
  //   (currentPage + 1) * Number(itemsPerPage)
  // );
  useEffect(() => {
    // console.log('setCurrentPage',0)
    const new_currentData = newRowTable.slice(
      0 * Number(itemsPerPage),
      (currentPage + 1) * Number(itemsPerPage)
    );

    setCurrentData(new_currentData);
    setpageCount(Math.ceil(newRowTable.length / Number(itemsPerPage)));
    setCurrentPage(0);
  }, [itemsPerPage]);

  const handlePageClick = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    const new_currentData = newRowTable.slice(
      Number(selectedPage.selected) * Number(itemsPerPage),
      (Number(selectedPage.selected) + 1) * Number(itemsPerPage)
    );
    // console.log(new_currentData);
    setCurrentData(new_currentData);
    setCurrentPage(selectedPage.selected);
  };
  //#endregion
  //#region Function reset lại giá trị tìm kiếm
  const resetValues = () => {
    settxtUniqueCode("");
    settxtGroup("");
    settxtBuilding("");
    settxtDepartmentLine("");

    setchxResult("");
    setchxStatus("");
    setdtpFromIncommingDate(null);
    setdtpToIncommingDate(null);
    setdtpFromDateOfCalibration(null);
    setdtpToDateOfCalibration(null);
    setdtpFromDateOfNextCalibration(null);
    setdtpToDateOfNextCalibration(null);
    setnewRowTable(RowTable);
  };
  const btnResetValues = () => {
    resetValues();
    // localStorage.setItem("Department", '');
  };
  //#endregion
  //#region Function tìm tất cả danh sách thiết bị
  const getDataDeviceList = () => {
    const url = linkAPI + "/api/Show_List";
    setIsLoading(true);
    const data = {
      Factory: factory,
    };
    axios
      .post(url, data, config)
      .then((response: any) => {
        resetValues();
        if (response.data !== null) {
          // console.log("data", response.data);
          const arr = response.data.map((item: any, index: number) => ({
            No: index + 1,
            Serial_Key: item.Device_Serial_Key,
            Equipment_Name: item.Device_Name,
            Unique_code: item.Unique_ID,
            Factory_code: item.Factory_ID,
            Group: item.Group_Name,
            Photo_for_reference:
              item.Image_Device !== "" && item.Image_Device !== null
                ? urlImg + item.Image_Device
                : "",
            Model: item.Model_Device,
            Device_Serial_Number: item.Device_Serial_Number,
            Brand: item.Device_Brand,
            Supplier: item.Supplier_Name,
            Incomming_date:
              item.Incoming_Date !== "1/1/1900 12:00:00 AM"
                ? moment(item.Incoming_Date).format("YYYY/MM/DD")
                : "",
            Use_Purpose_Machine_indication:
              item.User_Purpose_Machine_Indication,
            Range: item.Range,
            Building: item.Building,
            Department_Line: item.Line,
            Person_in_charge: item.Person_Charge,
            Frequency_follow_adidas_requirement: item.Internal_Current_Adidas,
            Current_Frequency: item.Internal_Current,
            Valid: item.Result,
            Frequency_follow_adidas_requirement2: item.External_Adidas,
            Certified_Calibration_Institute_Company:
              item.Certified_Calibration_Institute_Company,
            Date_Of_Calibration: moment(item.Date_Calibration).format(
              "YYYY/MM/DD"
            ),
            Result_Company: item.Status,
            Date_Of_Next: moment(item.Date_Next_Calibration).format(
              "YYYY/MM/DD"
            ),
            Remarky: item.Remark,
            Implementer_Id: item.Implementer_Id,
          }));

          setRowTable(arr);
          // setnewRowTable(arr)
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getDataDeviceList();
  }, []);
  const updateItems = () => {
    getDataDeviceList();
    // const filteredItems = newRowTable?.filter(
    //   (item) => item.Unique_code !== unique_ID
    // );
    // setnewRowTable(filteredItems);
  };
  useEffect(() => {
    // const DepartmentLine = localStorage.getItem("Department");

    // console.log('DepartmentLine', DepartmentLine)
    // settxtDepartmentLine(DepartmentLine !=null? DepartmentLine : '')
    setnewRowTable(RowTable);
  }, [RowTable]);
  //#endregion
  //#region Xuất excel
  async function imageUrlToBase64(url: string): Promise<string | null> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      return null;
    }
  }

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
    const data = [
      ["DEVICE-EQUIPMENT MASTER LIST"],
      [
        "No \n STT",
        "Unique code \n Mã số quản lý ",
        "Factory code \n Mã số tài sản",
        "Equipment Name \n Tên Thiết Bị",
        "Group \n Nhóm",
        "Photo for reference \n Hình ảnh tham khảo",
        "Model \n Dòng Thiết Bị",
        "Device Serial Number \n Số Serial Thiết Bị",
        "Brand \n Nhãn Hiệu",
        "Supplier \n Nhà Cung Ứng",
        "Incomming date \n Ngày Nhập Dụng Cụ Về",
        "Measurement indication \n Chỉ định đo lường",
        "",
        "Location \n Vị Trí Đặt",
        "",
        "Person in charge \n Người Phụ Trách",
        "Internal Calibration \n Hiệu chuẩn nội bộ",
        "",
        "Status \n Tình trạng",
        "",
        "External Calibration \n Hiệu chuẩn ngoài",
        "",
        "",
        "",
        "",
        "Remark \n Ghi chú",
      ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Use Purpose/ Machine indication \n Mục Đích Sử Dụng/Loại máy sử dụng",
        "Range \n Phạm Vi",
        "Building \n Xưởng",
        "Department- Line \n Đơn vị-Chuyền",
        "",
        "Frequency follow adidas requirement \n Tần suất theo adidas",
        "Current Frequency \n Tần suất",
        "VALID \n HỢP LỆ",
        "INVALID \n KHÔNG HỢP LỆ",
        "Frequency follow adidas requirement \n Tần suất theo adidas",
        "Certified Calibration Institute/Company \n Trung tâm Kiểm định",
        "Date Of Calibration \n Ngày hiệu chuẩn (YYYY/MM/DD)",
        "Result \n Kết quả",
        "Date Of Next Calibration \n Ngày hiệu chuẩn tiếp theo",
        "Remark \n Ghi chú",
      ],
      ...newRowTable.map((row, i) => {
        let result;
        if (row.Result_Company === null || row.Result_Company === "") {
          result = "";
        } else if (row.Result_Company === "OK") {
          result = "PASS";
        } else {
          result = "FAIL";
        }

        return [
          i + 1,
          row.Unique_code,
          row.Factory_code,
          row.Equipment_Name,
          row.Group,
          row.Photo_for_reference &&
            row.Photo_for_reference !== "" &&
            row.Photo_for_reference,
          row.Model,
          row.Device_Serial_Number,
          row.Brand,
          row.Supplier,
          row.Incomming_date !== null &&
          row.Incomming_date !== "" &&
          !isNaN(new Date(row.Incomming_date).getTime())
            ? row.Incomming_date
            : "",
          row.Use_Purpose_Machine_indication,
          row.Range,
          row.Building,
          row.Department_Line,
          row.Person_in_charge,
          row.Frequency_follow_adidas_requirement,
          row.Current_Frequency,
          row.Valid === "OK" ? "V" : row.Valid === "" ? "" : "",
          row.Valid === "OK" ? "" : row.Valid === "" ? "" : "V",
          row.Frequency_follow_adidas_requirement2,
          row.Certified_Calibration_Institute_Company,
          row.Date_Of_Calibration !== null &&
          row.Date_Of_Calibration !== "" &&
          !isNaN(new Date(row.Date_Of_Calibration).getTime())
            ? row.Date_Of_Calibration
            : "",
          result,
          row.Date_Of_Next !== null &&
          row.Date_Of_Next !== "" &&
          !isNaN(new Date(row.Date_Of_Next).getTime())
            ? row.Date_Of_Next
            : "",
          row.Remarky,
        ];
      }),
    ];
    const promises: any[] = [];
    data.forEach((row, rowIndex) => {
      const rowPromises = row.map(async (cellValue, columnIndex) => {
        const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1);
        const cellRow = worksheet.getRow(rowIndex + 1);
        if (rowIndex === 1) {
          const row = worksheet.getRow(rowIndex);
          row.eachCell((cell) => {
            cell.style = {
              font: {
                size: 36,
                bold: true,
                name: "Arial", // Font family, adjust as needed
              },
            };
          });
        }
        if (columnIndex === 5 && rowIndex > 2 && row[5] !== "") {
          const base64img = await imageUrlToBase64(row[5]);
          const image = await workbook.addImage({
            base64: base64img as string,
            extension: "png", // Replace with the actual image extension
          });
          cellRow.height = 100;
          cell.alignment = {
            wrapText: true,
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.addImage(image, {
            tl: { col: columnIndex, row: rowIndex },
            br: { col: columnIndex + 1, row: rowIndex + 1 },
            ext: { width: 95, height: 95 },
            editAs: "oneCell",
            preserveAspectRatio: true,
            aspectRatio: 1 / 1,
          } as any);
        } else {
          cell.value = cellValue;
          cell.alignment = { wrapText: false };
          cell.style = {
            font: {
              size: 13,
              name: "Arial", // Font family, adjust as needed
            },
          };
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
          if (columnIndex === 18 && rowIndex > 2 && row[18] === "V") {
            cell.style.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "008000" }, // Replace 'FFFF00' with your desired color code
            };
          }
          if (columnIndex === 19 && rowIndex > 2 && row[19] === "V") {
            cell.style.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FF0000" }, // Replace 'FFFF00' with your desired color code
            };
          }
        }
      });
      promises.push(...rowPromises);
    });

    await Promise.all(promises);

    const firstRow = worksheet.getRow(1);

    const secondRow = worksheet.getRow(2);

    for (let colIndex = 1; colIndex <= 26; colIndex++) {
      const cellhead = worksheet.getCell(2, colIndex);
      const cellText = cellhead.text as string;

      const cellhead2 = worksheet.getCell(3, colIndex);
      const cellText2 = cellhead2.text as string;

      const startIndex = cellText.indexOf("\n");
      const startIndex2 = cellText2.indexOf("\n");

      const textToBold = cellText.substring(0, startIndex);
      const textToRegula = cellText.substring(startIndex);

      const textToBold2 = cellText2.substring(0, startIndex2);
      const textToRegula2 = cellText2.substring(startIndex2);

      if (startIndex !== -1) {
        const formattedText: ExcelJS.RichText[] = [
          { text: textToBold, font: { name: "Arial", bold: true, size: 14 } },
          { text: textToRegula, font: { name: "Arial", size: 14 } },
        ];
        cellhead.value = { richText: formattedText };
      }
      if (startIndex2 !== -1) {
        const formattedText2: ExcelJS.RichText[] = [
          {
            text: textToBold2,
            font: { name: "Arial", bold: true, size: 14 },
          },
          { text: textToRegula2, font: { name: "Arial", size: 14 } },
        ];
        cellhead2.value = { richText: formattedText2 };
      }
      worksheet.getCell(2, colIndex).style.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE699" }, // Replace 'FFFF00' with your desired color code
      };
      worksheet.getCell(3, colIndex).style.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE699" }, // Replace 'FFFF00' with your desired color code
      };
    }

    firstRow.alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    };
    firstRow.height = 50;
    secondRow.height = 50;
    secondRow.alignment = {
      vertical: "middle", // Canh giữa dọc
      horizontal: "center", // Canh giữa ngang
      wrapText: true,
    };

    worksheet.mergeCells(`A1:Z1`);
    worksheet.mergeCells(`A2:A3`);
    worksheet.mergeCells(`B2:B3`);
    worksheet.mergeCells(`C2:C3`);
    worksheet.mergeCells(`D2:D3`);
    worksheet.mergeCells(`E2:E3`);
    worksheet.mergeCells(`F2:F3`);
    worksheet.mergeCells(`G2:G3`);
    worksheet.mergeCells(`H2:H3`);
    worksheet.mergeCells(`I2:I3`);
    worksheet.mergeCells(`J2:J3`);
    worksheet.mergeCells(`K2:K3`);
    worksheet.mergeCells(`L2:M2`);
    worksheet.mergeCells(`N2:O2`);
    worksheet.mergeCells(`Q2:R2`);
    worksheet.mergeCells(`S2:T2`);
    worksheet.mergeCells(`U2:Y2`);
    worksheet.mergeCells(`P2:P3`);
    worksheet.mergeCells(`Z2:Z3`);

    const columnWidths = [
      { column: 1, width: 5 },
      { column: 2, width: 15 },
      { column: 3, width: 15 },
      { column: 4, width: 60 },
      { column: 5, width: 15 },
      { column: 6, width: 20 },
      { column: 7, width: 20 },
      { column: 8, width: 20 },
      { column: 9, width: 20 },
      { column: 10, width: 20 },
      { column: 11, width: 20 },
      { column: 12, width: 20 },
      { column: 13, width: 20 },
      { column: 14, width: 20 },
      { column: 15, width: 30 },
      { column: 16, width: 30 },
      { column: 17, width: 20 },
      { column: 18, width: 20 },
      { column: 19, width: 20 },
      { column: 20, width: 20 },
      { column: 21, width: 20 },
      { column: 22, width: 20 },
      { column: 23, width: 20 },
      { column: 24, width: 20 },
      { column: 25, width: 20 },
      { column: 26, width: 20 },
    ];

    // Set column widths
    columnWidths.forEach((col) => {
      worksheet.getColumn(col.column).width = col.width;

      worksheet.getColumn(col.column).alignment = {
        wrapText: true,
        vertical: "middle",
        horizontal: "center",
      };
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Danh sách thiết bị Master List.xlsx";
      link.click();
    });
  };
  //#endregion

  return (
    <MenuBar
      isActive="list"
      onDarkMode={(darkMode: boolean | ((prevState: boolean) => boolean)) =>
        setDarkMode(darkMode)
      }
    >
      {/* #region khung Tìm kiếm */}
      <div
        className={` ${DarkMode ? "bg-gray-900" : "bg-gray-200"} ${
          isFilter ? "" : "hidden"
        } pb-2 mt-3 text-black mx-auto bg-gray-200 rounded-lg px-2`}
      >
        <div className="grid   grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div>
            <CreateInput
              label={t("lblUniqueCode")}
              options={optUniqueCode}
              value={txtUniqueCode}
              OnSelected={(value: any) => {
                settxtUniqueCode(value);
              }}
            />
          </div>
          <div>
            <CreateInput
              label={t("lblGroup")}
              options={optGroup}
              value={txtGroup}
              OnSelected={(value: any) => {
                settxtGroup(value);
              }}
            />
          </div>
          <div>
            <CreateInput
              label={t("lblBuilding")}
              options={optBuilding}
              value={txtBuilding}
              OnSelected={(value: any) => {
                settxtBuilding(value);
              }}
            />
          </div>
          <div>
            <CreateInput
              label={t("lblDepartment_Line")}
              options={optDepartmentLine}
              value={txtDepartmentLine}
              OnSelected={(value: any) => {
                // localStorage.setItem("Department", value!==null ? value : '');
                settxtDepartmentLine(value);
              }}
            />
          </div>

          <div className="">
            <DateRangePicker
              labelStart={t("lblIncommingDate")}
              labelEnd={t("lblIncommingDate")}
              onChangeDateStart={(date: any) => {
                setdtpFromIncommingDate(date);
              }}
              onChangeDateEnd={(date: any) => {
                setdtpToIncommingDate(date);
              }}
              selectsStart={dtpFromIncommingDate}
              selectsEnd={dtpToIncommingDate}
            />
          </div>
          <div>
            <DateRangePicker
              labelStart={t("lblDateOfCalibration")}
              labelEnd={t("lblDateOfCalibration")}
              onChangeDateStart={(date: Date | null) => {
                setdtpFromDateOfCalibration(date);
              }}
              onChangeDateEnd={(date: Date | null) => {
                setdtpToDateOfCalibration(date);
              }}
              selectsStart={dtpFromDateOfCalibration}
              selectsEnd={dtpToDateOfCalibration}
            />
          </div>
          <div>
            <DateRangePicker
              labelStart={t("lblDateOfNextCalibration")}
              labelEnd={t("lblDateOfNextCalibration")}
              onChangeDateStart={(date: any) => {
                setdtpFromDateOfNextCalibration(date);
              }}
              onChangeDateEnd={(date: any) => {
                setdtpToDateOfNextCalibration(date);
              }}
              selectsStart={dtpFromDateOfNextCalibration}
              selectsEnd={dtpToDateOfNextCalibration}
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            <RadioCheck
              names={"result"}
              item={optionsReusltRadio}
              OnChecked={(value: any) => {
                setchxResult(value);
                // console.log("result ", value);
              }}
              value={chxResult}
            />

            <RadioCheck
              names={"Status"}
              item={optionsRadio}
              OnChecked={(value: any) => {
                setchxStatus(value);
                // console.log("Status ", value);
              }}
              value={chxStatus}
            />
          </div>
        </div>

        <div className="gap-3  flex justify-center">
          <button
            className="bg-white px-3 py-2 rounded-full font-bold text-lg"
            onClick={getDataDeviceList}
          >
            {t("btnSearch")}
          </button>
          <button
            className="p-2 bg-white px-3 py-2 rounded-full font-bold text-lg"
            onClick={exportToExcel}
          >
            {t("btnExcel")}
          </button>
          <button
            onClick={btnResetValues}
            className="p-2 bg-white px-3 py-2 rounded-full font-bold text-lg"
          >
            {t("btnReset")}
          </button>
        </div>
      </div>
      {/* #region khung tùy chọn như chế độ hiển thị, filter, */}
      <div className="justify-end flex mb-2 mt-2">
        <div className="flex items-center mr-2 text-gray-400 text-xs font-bold">
          <CreateInputPagination
            label={""}
            options={optionsPagination}
            value={itemsPerPage}
            OnSelected={(value: any) => {
              setItemsPerPage(value);
            }}
          />
        </div>
        <div className="flex items-center mr-2 text-gray-400 text-xs font-bold">
          {t("lblTotal")}:{newRowTable.length}
        </div>
        <div
          onClick={() => {
            setIsFilter(!isFilter);
          }}
          className={` ${
            isFilter
              ? "bg-gray-300  rounded-xl text-gray-600 font-bold"
              : "text-gray-900"
          }  ${DarkMode ? "text-white" : "text-black"}   flex  items-center mr-2  px-2  text-xs font-bold cursor-pointer `}
        >
          <FiFilter className="text-2xl " />
        </div>

        <button
          className={` p-2 ${DarkMode ? "text-white" : "text-black"}  `}
          onClick={exportToExcel}
        >
          <SiMicrosoftexcel className="text-2xl" />
        </button>
        <button
          className={`p-2 ${DarkMode ? "text-white" : "text-black"}  ${
            list ? "bg-gray-300  rounded-xl" : ""
          } `}
          onClick={() => {
            setList(true);
          }}
        >
          {" "}
          <HiSquares2X2 className="text-2xl" />
        </button>
        <button
          className={` p-2 ${DarkMode ? "text-white" : "text-black"}  ${
            list ? "" : "bg-gray-300  rounded-xl"
          } `}
          onClick={() => {
            setList(false);
          }}
        >
          <FaTableCells className="text-2xl" />
        </button>
      </div>
      {/* #region khung hiển thị danh sách thiết bị */}
      {isLoading ? (
        <div className=" Loading">
          <LoadingPage />
        </div>
      ) : (
        <>
          {list ? (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1    xl:grid-cols-2 gap-5 py-3">
              <CardMasterList DarkMode={DarkMode} items={currentData} />
            </div>
          ) : (
            <TableMasterList
              items={currentData}
              DarkMode={DarkMode}
              updateItems={updateItems}
            />
          )}
          <div className="">
            <ReactPaginate
              previousLabel={t("btnPrev")}
              nextLabel={t("btnNext")}
              className="phantrang"
              breakLabel={"..."}
              pageCount={pageCount}
              forcePage={currentPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={`activePhantrang`}
            />
          </div>
        </>
      )}
    </MenuBar>
  );
};
export default MasterListScreen;
