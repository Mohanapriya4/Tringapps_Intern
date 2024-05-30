export const readImageFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      callback({ name: file.name, type: file.type, content: event.target.result });
    };
    reader.readAsDataURL(file);
  };
  