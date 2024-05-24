import {useState} from "react"
import axios from "axios";
import './App.css';

function App() {
  const[files,setFiles] = useState(null)
  //reference,updating func
  const[progress, setProgress] = useState({started:false, pc:0})
  //2 properties:1.whether the upload has started or not
  //2.progress complete
  const[msg,setMsg]=useState(null)
function handleUpload(){
  if(!files)
    {
      setMsg("No file selected");
      return;
    }
    const fd = new FormData();
    for(let i=0;i<files.length;i++){
      fd.append(`fine${i+1}`,files[i]);
    }
    
    setMsg("Uploading...")

    setProgress(prevstate=>{
      return{...prevstate, started:true}
    }
      )

    axios.post('http://httpbin.org/post',fd,{
      onUploadProgress: (progressEvent) => {setProgress(prevState =>{
        return {...prevState, pc: progressEvent.progress*100}
      })},
      headers: {
        "Custom-Header":"value",
      }
    })
    .then(res => {
      setMsg("Upload successful")
      console.log(res.data)
    })
    .catch(err =>{
      setMsg("Upload failed")
      console.error(err)
    });


}

  return (
    <div className="App">
     <h1>uploading files in react</h1>
     <input onChange={(e)=>{setFiles(e.target.files)}}type= "file" />
     <button onClick={ handleUpload }>Upload</button>
     {progress.started && <progress max="100" value={progress.pc}></progress>}
     {msg && <span>{msg}</span>}
    </div>
  );
}

export default App;
