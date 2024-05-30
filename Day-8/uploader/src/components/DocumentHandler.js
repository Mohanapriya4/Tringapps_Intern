import mammoth from 'mammoth';

export const readDocumentFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const arrayBuffer = event.target.result;
    mammoth.extractRawText({ arrayBuffer: arrayBuffer })
      .then((result) => {
        const text = result.value;
        callback({ name: file.name, type: file.type, content: text });
      })
      .catch((err) => {
        console.error('Error extracting text:', err);
      });
  };
  reader.readAsArrayBuffer(file);
};
