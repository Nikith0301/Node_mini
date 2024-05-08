// import React,{useState} from 'react'

// export default function Geo() {

//     const[input,setInput]=useState("");

// function handleChange(){

//     setInput()
// }

//   return (
//     <>
//     <p>Enter your Roll No.</p>
//     <input value={input}  onChange={handleChange}/>
    
//     </>
//   )
// }



import React,{useState,useEffect} from 'react'
import axios from"axios"
export default function Geo() {

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => setLocation(position.coords),
          (error) => console.error(error) // Handle error gracefully
        );
      } else {
        setLocation({ error: 'Geolocation not supported' });
      }
    };
  
    getLocation();
  }, []); // Run useEffect only once after mount


function handleSend(){
  if (location) {
    const sendLocation = async () => {
      try {
        // const response = await axios.post('http://localhost:3002/api/location', location);
        const trail={latitude:location.latitude,longitude:location.latitude,accuracy:location.accuracy}
const obj=await axios.post('http://localhost:3002/api/location', trail);


        console.log('Location sent:', trail); // Handle successful response

      } catch (error) {
        console.error('Error sending location:', error); // Handle error
      }
    };
  
    sendLocation();
  }
}





  return (
    <div>
      {location ? (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        <button onClick={handleSend}>Send location</button>

        </>
      ) : (
        <>
         <p>{location?.error || 'Fetching location...'}</p>
         <p>Ohmy god What is happening wow</p>
        </>
        

      )}
    </div>
  );
}
