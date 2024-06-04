export const readAudioFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    console.log("Audio File Content:", content); // Debugging log
    callback({ name: file.name, type: file.type, content });
  };
  reader.readAsDataURL(file); 
};
  