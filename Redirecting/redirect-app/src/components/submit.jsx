import React from "react";
import { useLocation } from 'react-router-dom';


export default function Sub(){
    const location = useLocation();
    //access the data from username
  const { username } = location.state;
    

    return(<div>
        
        Thanks for submitting
        <h1>Hello, {username}</h1>
        </div>)
}