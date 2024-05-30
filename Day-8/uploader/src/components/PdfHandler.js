import * as pdfjsLib from 'pdfjs-dist/webpack';

export const extractTextFromPDF = async (arrayBuffer) => {
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    textContent.items.forEach((item) => {
      text += item.str + "\n";
    });
  }
  return text;
};

export const readPDFFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = async (event) => {
    const pdfText = await extractTextFromPDF(event.target.result);
    callback({ name: file.name, type: file.type, content: pdfText });
  };
  reader.readAsArrayBuffer(file);
};
