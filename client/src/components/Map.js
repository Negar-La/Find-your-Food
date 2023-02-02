import { useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    } from "@react-google-maps/api";
import { useRef, useState } from "react";
import styled from "styled-components";
import {AiOutlineClear} from 'react-icons/ai'
  
  
  const Map = ({onCloseFunc, center}) => {
    // console.log(center) //[45.477215, -73.662711]
//convert array to object with custom keys:
const [lat, lng] = center;
const object = { lat, lng};
    // console.log(object);

    //used to make sure the google map is loaded
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");

  
    const originRef = useRef();
    // const destinationRef = useRef(object)


    const calculateRoute = async () => {
      if (originRef.current.value === '') {
        return alert("Please provide origin address");
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: object,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }

    const clearRoute = () => {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      // destinationRef.current.value = ''
    }

    // If you remove Strict Mode from your app, the markers should appear!!
  
      if (!isLoaded) {
          return <h1>...Loading</h1>
      }
    return (
      <Wrapper>
        <Content>
          <Flex>
            <div>
              <Autocomplete>
                  <Input type='text' placeholder='Where are you?' ref={originRef} />
              </Autocomplete>
            </div>
            <div>
              <Btn1  onClick={calculateRoute}> Calculate Route </Btn1>
              <Btn  onClick={clearRoute}>Clear <AiOutlineClear style={{marginLeft: '5px', marginBottom: '-2px'}}/> </Btn>
            </div>
            <FlexRow>
              <Title1>Distance: <span>{distance}</span></Title1>
              <Title>Duration: <span>{duration}</span></Title>
            </FlexRow>
          </Flex>

          <GoogleMap center= {object} zoom={15} mapContainerStyle={{border: '1px solid var(--darkblue)', width: '100%', height: '100%'}}> 
                <Marker position={object} />
                {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
          </GoogleMap>   
          <Button onClick={onCloseFunc}>close</Button>
        </Content>
      </Wrapper>
    )
  }
  
  
  const Wrapper = styled.div`
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
  `;
  const Content = styled.div`
    border: 2px solid purple;
    background: white;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 90%;
    width: 80%;
    padding: 20px;
  `;

  const Flex = styled.div`
    background-color: #795E96;
    padding: 20px;
    margin-bottom: 5px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `

const FlexRow = styled.div`
  display: flex;
  text-align: end;
`

  const Input = styled.input`
    margin-bottom: 20px;
    border-radius: 15px;
    width: 250px;
    height: 36px;
    padding-left: 15px;
    border: none;
    background-color: var(--background);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  `
  const Btn1 = styled.button`
  border: none;
  font-size: 16px;
  border-radius: 15px;
  padding: 10px 2px;
  margin-right: 25px;
  margin-bottom: 15px;
  width: 150px;
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s,
              opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`
const Btn = styled.button`
border: none;
font-size: 16px;
border-radius: 15px;
padding: 10px 2px;
margin-bottom: 15px;
width: 150px;
background-color: var(--background);
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
cursor: pointer;
transition: background-color 0.3s,
            opacity 0.3s;
&:hover {
  background-color: var(--yellow);
}
&:active {
  opacity: 0.3;
}
`

const Title1 = styled.div`
  font-size: 20px;
  color: white;
  font-weight: bold;
  line-height: 1.2;
  margin-right: 45px;
  span {
    font-weight: 400;
  }
`
const Title = styled.div`
  font-size: 20px;
  color: white;
  font-weight: bold;
  line-height: 1.2;
  span {
    font-weight: 400;
  }
`

  const Button = styled.button`
    background: #795E96;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 10px 16px 8px;
    text-transform: uppercase;
    margin: 8px;
    width: 120px;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;
  
  export default Map