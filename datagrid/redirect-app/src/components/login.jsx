import React , { useState }from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; // Import useCookies hook

//export default means dont need to include curly brackets while importing
//defaultly if imports the modules while importing
export default function Form(){
    //city,username-variables holds value
    //setcity-functions used to update
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(); // Use useCookies hook to access and set cookies


  
  
  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
  };



    const handlePhoneNumberChange = (event) => {
      let phoneNumber = event.target.value;
      // Ensure phone number is not longer than 10 characters
      if (phoneNumber.length > 10) {
        phoneNumber = phoneNumber.slice(0, 10);
      }
      setPhoneNumber(phoneNumber);
    };

  

 //handleSubmit function is used for handling form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (city.trim() === '' || username.trim() === '' ) {
      alert('Please enter all required fields');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    

    
  
      // Get the existing users array from cookies or create a new one if it doesn't exist
    const users = cookies.users || [];

    // Add the new user to the array
    users.push({ username, city, email, phoneNumber});

    // Set the updated users array in cookies
    setCookie('users', users, { path: '/' });

    console.log('Form submitted successfully');
    navigate('/submit', { state: { username,city, email, phoneNumber} });
  };


  const handleChange = (event) => {
    setCity(event.target.value);
    
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  

  

 
    
    return (
      <section class="container">
      <header>Registration Form</header>
      <form action="#" class="form" onSubmit={handleSubmit}>
        <div class="input-box">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" value={username}
        onChange={handleUsernameChange} />
        </div>

        <div class="input-box">
          <label>Email Address</label>
          <input type="text" placeholder="Enter email address" value={email}
          onChange={handleEmailChange}
          />
        </div>

        <div class="column">
          <div class="input-box">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" 
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            />
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
};


