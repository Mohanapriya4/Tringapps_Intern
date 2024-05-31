import mammoth from 'mammoth';

export const readWordFile = (file, callback) => {
  const reader = new FileReader();

  reader.onload = async (event) => {
    const arrayBuffer = event.target.result;
    try {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      callback({ name: file.name, type: file.type, content: result.value });
    } catch (error) {
      console.error('Error reading Word file:', error);
      callback({ name: file.name, type: file.type, content: 'Error reading file' });
    }
  };

  reader.readAsArrayBuffer(file);
};
