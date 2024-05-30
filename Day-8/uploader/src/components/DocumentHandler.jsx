export const readTextFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target.result;
    callback({ name: file.name, type: file.type, content: text });
  };
  reader.readAsText(file);
};
