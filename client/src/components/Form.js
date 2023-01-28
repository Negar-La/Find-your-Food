import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";
import { useAuth0 } from "@auth0/auth0-react";

const Form = () => {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { user } = useAuth0();

    const [pictureUrl, setPictureUrl] = useState("");
    const time = new Date();
    // console.log(time);

    const handleChange = (key, value) => {
        setFormData({
            ...formData, [key]: value
        })
        // console.log(key);
        // console.log(value);
    }
    // console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hi')
        fetch("/api/post-add", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({...formData, cook: user.nickname, cookEmail: user.email, foodPicture:pictureUrl, posted: time})
        })
        .then(res=>res.json()).then((data)=>{
            console.log(data);
            console.log("formData", formData)
            navigate('/');
        })
        .catch ((error)=>{
          console.log(error)
        })
    }

  return (
        <StyledForm onSubmit={handleSubmit}>
            <FlexType>
                    <p>Food Type</p>
                        <Radio>
                            <input type="radio" id="Appetizer" name="foodType" required onChange={(e)=>handleChange(e.target.name, e.target.id)} />
                            <label htmlFor="Appetizer">Appetizer</label><br/>
                        </Radio>
                        <Radio>
                            <input type="radio" id="Main course" name="foodType" onChange={(e)=>handleChange(e.target.name, e.target.id)}/>
                            <label htmlFor="Main course">Main course</label><br/>
                        </Radio>
                        <Radio>
                            <input type="radio" id="Dessert" name="foodType" onChange={(e)=>handleChange(e.target.name, e.target.id)}/>
                            <label htmlFor="Dessert">Dessert</label><br/>
                        </Radio>       
            </FlexType>

        <FlexTwo>
            <label htmlFor='name'>Title:</label>
            <input type="text" id='foodName' required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='price'>Price:</label>
            <input type="text" id='price' required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='ingredients'>Ingredients:</label>
            <input type="text" id='ingredients' required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='person'>By:</label>
            <p>{user.nickname[0].toUpperCase() + user.nickname.substring(1)} - Email: {user.email}</p>
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='phone'>Telephone:</label>
            <input type="number" id='phone' required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <Divider>
                  <Title>Location</Title>
                  <Liner />
                  <SelectOptions>
                    <P>Province</P>
                    <select name="province" required>
                        <option value="">-Select-</option>
                        <option value="quebec">Quebec</option>
                    </select>
                  </SelectOptions>
                  <SelectOptions>
                    <P>City</P>
                    <select name="city" required>
                        <option value="">-Select-</option>
                        <option value="montreal">Montreal</option>
                    </select>
                  </SelectOptions>
                    
                     <br/>  
                        <input type="number"  placeholder="Street number" name="stNum" required onChange={(e)=> handleChange(e.target.name, e.target.value)}/><br/>
                        <input type="text"  placeholder="Street name" name="stName" required onChange={(e)=> handleChange(e.target.name, e.target.value)}/><br/>        
                        <input type="text" pattern= "[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" placeholder="Postal code" name="postalCode" required onChange={(e)=> handleChange(e.target.name, e.target.value)}/>
        </Divider>
        <br></br>
        <FlexTwo>
            <label htmlFor='about'>About this meal:</label>
             <textarea required rows="5" cols="33" id="about" placeholder="Enter all details about this food" onChange={(e)=> handleChange(e.target.id, e.target.value)}></textarea>
        </FlexTwo>
        <FlexUpload>
          <label>Add photo:</label>
          <UploadWidget setPictureUrl={setPictureUrl} pictureUrl={pictureUrl}/>
        </FlexUpload>
        <button type='submit'>Post</button>
        </StyledForm>
  )
}


const StyledForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 80px;
  font-size: 18px;
  border: 3px solid purple;
  border-radius: 10px;
  width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  label {
    font-weight: bold;
    margin-right: 20px;
  }
  input {
    border: 1px solid gray;
    height: 25px;
    width: 250px;
    display: inline-block;
  }

  button {
    padding: 10px 16px;
    font-size: 18px;
    border-radius: 5px;
    width: 150px;
    background-color: #795E96;
    color: white;
    border: none;
    transition: background-color 0.3s,
                opacity 0.3s;
  }

    button:hover {
      cursor: pointer;
      background-color: var(--yellow);
      color: black;
    }
    button:active {
      opacity: 0.5;}
`

const FlexType = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Radio = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
        width: 50px;
    }`

const FlexTwo = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexUpload = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
`
const Liner = styled.div`
    height: 1px;
    background: #ccc;
    margin-bottom: 15px;
`;

const Divider = styled.div`
    box-shadow: 2px 1px 70px 1px rgba(184,178,184,1);
    padding: 10px 20px;
    min-width: 300px;
`;

const P=styled.p`
    font-weight: bold;
    padding-right: 10px;
    color: var(--primary-color);
    font-size: 17px;
    margin: 10px 0px;
`;

const SelectOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  select {
    height: 30px;
    border-radius: 13px;
  }
`

const Title=styled.span`
    font-weight: bold;
    font-size: 19px;
`;

export default Form