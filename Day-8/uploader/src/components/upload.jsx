// Upl.js
import React, { useState } from 'react';
import { readPDFFile } from './PdfHandler';
import { readImageFile } from './ImageHandler';
import { readDocumentFile } from './DocumentHandler';
import { readExcelFile } from './ExcelHandler';

function Upl() {
  const [files, setFiles] = useState(null);
  const [msg, setMsg] = useState(null);
  const [fileContents, setFileContents] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (!files) {
      setMsg('No file selected');
      return;
    }

    setMsg('Uploading...');
    displayFileContents();
  };

  const displayFileContents = () => {
    const contents = [];
    files.forEach((file) => {
      if (file.type === 'application/pdf') {
        readPDFFile(file, (content) => handleFileRead(content, contents));
      } else if (file.type.startsWith('image/')) {
        readImageFile(file, (content) => handleFileRead(content, contents));
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        readExcelFile(file, (content) => handleFileRead(content, contents));
      } else {
        readDocumentFile(file, (content) => handleFileRead(content, contents));
      }
    });
  };

  const handleFileRead = (content, contents) => {
    contents.push(content);
    if (contents.length === files.length) {
      setMsg('Upload successful');
      setFileContents(contents);
    }
  };

  return (
    <div>
      <h1>Uploading Files in React</h1>
      <input onChange={handleFileChange} type="file" multiple />
      <button onClick={handleUpload}>Upload</button>
      {msg && <span>{msg}</span>}
      <div>
        <h2>File Contents:</h2>
        {fileContents.map((file, index) => (
          <div key={index}>
            <h3>{file.name}</h3>
            {file.type === 'application/pdf' ? (
              <pre>{file.content}</pre>
            ) : file.type.startsWith('image/') ? (
              <img src={file.content} alt={file.name} width="200" />
            ) : file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
              file.content.map((sheet, sheetIndex) => (
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
              ))
            ) : (
              <pre>{file.content}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upl;
