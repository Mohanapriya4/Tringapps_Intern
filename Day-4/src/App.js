import { Route, Routes } from "react-router-dom";
import './App.css';
import  Form  from "./components/login";
import Sub from "./components/submit";



function App() {
  return <Routes>
  <Route path="/" element={<Form />}  />
  <Route path="/submit" element={<Sub />}/>
</Routes>

}

export default App;
