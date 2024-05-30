// TableFormat.js
import React from 'react';

const TableFormat = ({ sheetData }) => (
  <div>
    {sheetData.map((sheet, sheetIndex) => (
      <div key={sheetIndex}>
        <h4>Sheet: {sheet.name}</h4>
        <table>
          <tbody>
            {sheet.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

export default TableFormat;
