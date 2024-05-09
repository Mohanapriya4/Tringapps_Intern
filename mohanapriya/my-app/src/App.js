import logo from'./logo.svg';
import {BrowserRouter} from "react-router-dom"
import './App.css'
import { Route, Routes } from "react-router-dom";
import  Form  from "./components/login";
import Sub from "./components/submit";



function App() {
  return <Routes>
    <Route path="/" element={<Form />}  />
    <Route path="/submit" element={<Sub />}/>
  </Routes>
}

export default App;
