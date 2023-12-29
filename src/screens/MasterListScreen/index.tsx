/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import MenuBar from "../../components/MenuBar";
// import { FaCheck } from "react-icons/fa6";
import { HiSquares2X2 } from "react-icons/hi2";
import { FaTableCells } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";
import { Equipment } from "../../utils/MasterList";
import CardMasterList from "../../components/CardMasterList";
import TableMasterList from "../../components/TableMasterList";

import * as ExcelJS from "exceljs";
import { FiFilter } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import moment from "moment";
import CreateInput from "../../components/CreateInput";
import DateRangePicker from "../../components/DateRangePicker";
import RadioCheck from "../../components/RadioCheck";
import { api, config } from "../../utils/linkApi";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
// import LoadingPage from "../../components/loadingPage";

const MasterListScreen = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [RowTable, setRowTable] = useState<Equipment[]>([]);

  const [newRowTable, setnewRowTable] = useState<Equipment[]>([]);

  const exportToExcel = () => {
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
        return [
          i + 1,
          row.Unique_code,
          row.Factory_code,
          row.Equipment_Name,
          row.Group,

          row.Photo_for_reference,
          row.Model,
          row.Device_Serial_Number,
          row.Brand,
          row.Supplier,
          row.Incomming_date,
          row.Use_Purpose_Machine_indication,
          row.Range,
          row.Building,
          row.Department_Line,
          row.Person_in_charge,
          row.Frequency_follow_adidas_requirement,
          row.Current_Frequency,
          row.Valid === "Valid" ? "V" : "",
          row.Valid === "Valid" ? "" : "V",
          row.Frequency_follow_adidas_requirement2,
          row.Certified_Calibration_Institute_Company,
          row.Date_Of_Calibration,
          row.Result_Company,
          row.Date_Of_Next,
          row.Remarky,
        ];
      }),
    ];

    data.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1);
        const cellRow = worksheet.getRow(rowIndex + 1);
        if (rowIndex === 1) {
          const row = worksheet.getRow(rowIndex);
          row.eachCell((cell) => {
            cell.style = {
              font: {
                size: 36,
                bold: true,
                name: "Calibri", // Font family, adjust as needed
              },
            };
          });
        }
        if (columnIndex === 5 && rowIndex > 2 && row[5] !== "") {
          const image = workbook.addImage({
            base64: row[5] as string,
            extension: "jpeg", // Replace with the actual image extension
          });
          cellRow.height = 120;
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
          } as any);
        } else {
          cell.value = cellValue;
          cell.alignment = { wrapText: false };
          cell.style = {
            font: {
              size: 13,
              name: "Calibri", // Font family, adjust as needed
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
    });

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
          { text: textToBold, font: { name: "Calibri", bold: true, size: 14 } },
          { text: textToRegula, font: { name: "Calibri", size: 14 } },
        ];
        cellhead.value = { richText: formattedText };
      }
      if (startIndex2 !== -1) {
        const formattedText2: ExcelJS.RichText[] = [
          {
            text: textToBold2,
            font: { name: "Calibri", bold: true, size: 14 },
          },
          { text: textToRegula2, font: { name: "Calibri", size: 14 } },
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

  const DefautMode = localStorage.getItem("isDark");
  const [DarkMode, setDarkMode] = useState<boolean>(
    DefautMode ? DefautMode === "true" : false
  );
  const [list, setList] = useState<boolean>(true);

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

  const { t } = useTranslation();

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
      value: "Pass",
      label: t("lblPass"),
      cusClass:
        "text-green-500  peer-checked:bg-green-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-lime-200",
    },
    {
      value: "Fail",
      label: t("lblFail"),
      cusClass:
        "text-red-500 peer-checked:bg-red-500   peer-checked:ring-offset-2 peer-checked:ring peer-checked:ring-red-200",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState<>([]));
  const [pageCount, setpageCount] = useState(0);
  const itemsPerPage = 6;

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
        return item[condition] === fieldValue;
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
        (building) => {
          return { label: building, value: building };
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

    setpageCount(Math.ceil(newRowTable.length / itemsPerPage));
    setCurrentPage(0);
    // if(Math.ceil(newRowTable.length / itemsPerPage) > currentPage){
    // }
  }, [newRowTable]);
  const currentData = newRowTable.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageClick = (selectedPage: {
    selected: SetStateAction<number>;
  }) => {
    setCurrentPage(selectedPage.selected);
  };
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

  const getDataDeviceList = () => {
    const url = api + "/api/ShowDevice/Show_List";
    setIsLoading(true);
    const data = {};
    axios
      .post(url, data, config)
      .then((response: any) => {
        if (response.data !== null) {
          const arr = response.data.map((item: any, index: number) => ({
            No: index + 1,
            Serial_Key: item.device_Serial_Key,
            Equipment_Name: item.device_Name,
            Unique_code: item.unique_ID,
            Factory_code: item.factory_ID,
            Group: item.name_Group,
            Photo_for_reference: item.image_Device,
            Model: item.model_Device,
            Device_Serial_Number: item.device_Serial_Number,
            Brand: item.device_Brand,
            Supplier: item.supplier_Name,
            Incomming_date: moment(item.delivery_Date).format("YYYY/MM/DD"),
            Use_Purpose_Machine_indication: item.use_Purpose_Machine_Indication,
            Range: item.range,
            Building: item.building,
            Department_Line: item.department,
            Person_in_charge: item.person_Charge,
            Frequency_follow_adidas_requirement: item.iC_Frequency_Adidas,
            Current_Frequency: item.frequency,
            Valid: item.status_Device,
            Frequency_follow_adidas_requirement2: item.eC_Frequency_Adidas,
            Certified_Calibration_Institute_Company: item.person_Calibration,
            Date_Of_Calibration: moment(item.date_Calibration).format(
              "YYYY/MM/DD"
            ),
            Result_Company: item.result,
            Date_Of_Next: moment(item.date_Next_Calibration).format(
              "YYYY/MM/DD"
            ),
            Remarky: item.note_Device,
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
  useEffect(() => {
    setnewRowTable(RowTable);
  }, [RowTable]);
  return (
    <MenuBar
      isActive="list"
      onDarkMode={(darkMode: boolean | ((prevState: boolean) => boolean)) =>
        setDarkMode(darkMode)
      }
    >
      {/* tim kiếm */}
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
              }}
              value={chxResult}
            />

            <RadioCheck
              names={"Status"}
              item={optionsRadio}
              OnChecked={(value: any) => {
                setchxStatus(value);
              }}
              value={chxStatus}
            />
          </div>
        </div>

        <div className="gap-3  flex justify-center">
          <button className="bg-white px-3 py-2 rounded-full font-bold text-lg">
          {t('btnSearch')}
          </button>
          <button
            className="p-2 bg-white px-3 py-2 rounded-full font-bold text-lg"
            onClick={exportToExcel}
          >
            {t('btnExcel')}
          </button>
          <button
            onClick={resetValues}
            className="p-2 bg-white px-3 py-2 rounded-full font-bold text-lg"
          >
            {t('btnReset')}
          </button>
        </div>
      </div>

      {/* chọn chế độ hiển thị */}
      <div className="justify-end flex mb-2 mt-2">
        <div className="flex items-center mr-2 text-gray-400 text-xs font-bold">
          {t('lblTotal')} {newRowTable.length} / {RowTable.length}
        </div>
        <div
          onClick={() => {
            setIsFilter(!isFilter);
          }}
          className={` ${
            isFilter
              ? "bg-gray-300  rounded-xl text-gray-600 font-bold"
              : "text-gray-900"
          }  flex  items-center mr-2  px-2  text-xs font-bold cursor-pointer `}
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
            <TableMasterList items={currentData} DarkMode={DarkMode} />
          )}
          <div className="">
            <ReactPaginate
              previousLabel={t('btnPrev')}
              nextLabel={t('btnNext')}
              className=" phantrang"
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"activePhantrang"}
            />
          </div>
        </>
      )}
    </MenuBar>
  );
};

export default MasterListScreen;
