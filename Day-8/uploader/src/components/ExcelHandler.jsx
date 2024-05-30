import React from 'react';
import * as XLSX from 'xlsx';
import TableFormat from './TableFormat'; 

export const readExcelFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const binaryString = event.target.result;
    const workbook = XLSX.read(binaryString, { type: "binary" });
    const sheetNames = workbook.SheetNames;
    const sheetData = [];

    sheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      sheetData.push({ name: sheetName, data: jsonData });
    });

    callback({ name: file.name, type: file.type, content: <TableFormat sheetData={sheetData} /> }); 
  };

  reader.readAsBinaryString(file);
};
