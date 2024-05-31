import Papa from 'papaparse';

export const readCSVFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = () => {
    const content = Papa.parse(reader.result, { header: true });
    callback({ name: file.name, content: content.data });
  };
  reader.readAsText(file);
};
