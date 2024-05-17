import React , { useState }from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 



export default function Form(){
    
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      phoneNumber: '',
      city: ''
    });

    
    
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  

 //handleSubmit function is used for handling form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (formData.city.trim() === '' || formData.username.trim() === '' ) {
      alert('Please enter all required fields');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }


    axios.post('http://localhost:8081/add_user', formData)
    .then((res) => {
      console.log(res);
      setFormData({
        username: '',
        email: '',
        phoneNumber: '',
        city: ''
      });
      navigate('/submit');
    })
    .catch((err) => console.log(err));
    
  };


    
    return (
      <section className="container">
      <header>Registration Form</header>
      <form action="POST" className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" value={formData.username}
        onChange={handleChange}
        name="username"
         />
        </div>

        <div className="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter email address" value={formData.email}
          onChange={handleChange}
          name="email" 
          />
        </div>

        <div className="column">
          <div className="input-box">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" 
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber" 
            />
          </div>
          <div className="input-box">
            <label>Birth Date</label>
            <input type="date" placeholder="Enter birth date" required />
          </div>
        </div>
        <div className="gender-box">
          <h3>Gender</h3>
          <div className="gender-option">
            <div className="gender">
              <input type="radio" id="check-male" name="gender" />
              <label htmlFor="check-male">male</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-female" name="gender" />
              <label htmlFor="check-female">Female</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-other" name="gender" />
              <label htmlFor="check-other">prefer not to say</label>
            </div>
          </div>
        </div>
        <div className="input-box address">
          <label>Address</label>
          <input type="text" placeholder="Enter street address" required />
          <div className="column">
            <div className="select-box">
              <select>
                <option hidden>Country</option>
                <option>America</option>
                <option>Japan</option>
                <option>India</option>
                <option>Nepal</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Enter your city"
              id="inputCity"
              value={formData.city}
            onChange={handleChange} 
            name="city"// Attach handleChange to onChange event
            />
          </div>
          <div className="column">
            <input type="text" placeholder="Enter your region" required />
          </div>
        </div>
        <button type="submit" >Submit</button> {/* Use type="submit" for submit button */}
      </form>
      
    </section>
          
    )
};
