import React , { useState }from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
//export default means dont need to include curly brackets while importing
//defaultly if imports the modules while importing
export default function Form(){
    //city,username-variables holds value
    //setcity-functions used to update
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');

  
  const navigate = useNavigate();


  

  

 //handleSubmit function is used for handling form submission
  const handleSubmit = (event) => {
    

    if (city.trim() === '') {
      alert('Please enter a city');
      return;
    }
    // If city field is not empty, you can proceed with form submission logic here
    console.log('Form submitted successfully');
    navigate('/submit',{ state: { username } });
    //pass the data in username to submit page

    
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };
  // it retrieves the value entered by the user in the input field.


 
    
    return (
      <section class="container">
      <header>Registration Form</header>
      <form action="#" class="form" onSubmit={handleSubmit}>
        <div class="input-box">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" value={username}
        onChange={(e) => setUsername(e.target.value)}  />
        </div>

        <div class="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter email address" 
          />
        </div>

        <div class="column">
          <div class="input-box">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter phone number" required />
          </div>
          <div class="input-box">
            <label>Birth Date</label>
            <input type="date" placeholder="Enter birth date" required />
          </div>
        </div>
        <div class="gender-box">
          <h3>Gender</h3>
          <div class="gender-option">
            <div class="gender">
              <input type="radio" id="check-male" name="gender" checked />
              <label for="check-male">male</label>
            </div>
            <div class="gender">
              <input type="radio" id="check-female" name="gender" />
              <label for="check-female">Female</label>
            </div>
            <div class="gender">
              <input type="radio" id="check-other" name="gender" />
              <label for="check-other">prefer not to say</label>
            </div>
          </div>
        </div>
        <div class="input-box address">
          <label>Address</label>
          <input type="text" placeholder="Enter street address" required />
          <div class="column">
            <div class="select-box">
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
              value={city}
              onChange={handleChange} // Attach handleChange to onChange event
            />
          </div>
          <div class="column">
            <input type="text" placeholder="Enter your region" required />
          </div>
        </div>
        <button type="submit" >Submit</button> {/* Use type="submit" for submit button */}
      </form>
      
    </section>
          
    )
}