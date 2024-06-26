export const readVideoFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      callback({ name: file.name, type: file.type, content });
    };
    reader.readAsDataURL(file); // Use readAsDataURL for video files
  };
  