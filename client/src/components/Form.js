import styled from "styled-components";
import { useState } from "react";

const Form = () => {

    const [formData, setFormData] = useState({});

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
          body: JSON.stringify(formData)
        })
        .then(res=>res.json()).then((data)=>{
            console.log(data);
            console.log("formData", formData)
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
                            <input type="radio" value="Appetizer" id="Appetizer" name="foodType" required onChange={(e)=>handleChange(e.target.name, e.target.value)}/>
                            <label htmlFor="Appetizer">Appetizer</label><br/>
                        </Radio>
                        <Radio>
                            <input type="radio" value="main" id="main" name="foodType" onChange={(e)=>handleChange(e.target.name, e.target.value)}/>
                            <label htmlFor="main">main course</label><br/>
                        </Radio>
                        <Radio>
                            <input type="radio" value="Dessert" id="Dessert" name="foodType" onChange={(e)=>handleChange(e.target.name, e.target.value)}/>
                            <label htmlFor="Dessert">Dessert</label><br/>
                        </Radio>       
            </FlexType>

        <FlexTwo>
            <label htmlFor='name'>Title:</label>
            <input type="text" id='name' onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='person'>By:</label>
            <input type="text" id='person' onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='ingredients'>Ingredients:</label>
            <input type="text" id='ingredients' onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='address'>Address:</label>
            <input type="text" id='address' onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='about'>About this meal:</label>
            <input type="text" id='about' onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <button type='submit'>Post</button>
        </StyledForm>
  )
}


const StyledForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  font-size: 18px;
  border: 3px solid black;
  width: 400px;
  padding: 20px;
  padding-top: 40px;
  margin-bottom: 30px;
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
    border-radius: 5px;
    width: 150px;
    transition: background-color 0.3s,
                opacity 0.3s;
  }

    button:hover {
      background-color: yellow;
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
    }

`

const FlexTwo = styled.div`
  display: flex;
  justify-content: space-between;
  select {
    text-align: center;
    height: 29px;
    width: 258px;
    font-weight: bold;

    select > option{
      text-align: center;
    height: 29px;
    width: 258px;
    font-weight: bold;
    }
  }
  
`

export default Form