import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import UploadWidget from "./UploadWidget";

const UpdateForm = () => {

    const [pictureUrl, setPictureUrl] = useState("");
    const {postId} = useParams();
    console.log(postId);
    const [updatePost, setUpdatePost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/get-post/${postId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
                setUpdatePost(data.data);
              console.log(data.data);
            }    
        })  
            .catch((error) => {
                return error;
              });
      }, []);

      const handleChange = (key, value) => {
        setUpdatePost({
            ...updatePost, [key]: value
        })
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/update-post/${postId}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatePost)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data.data);
            window.location.reload();
        })
        .catch((error) => {
            window.alert(error);
        })
        navigate('/myPosts')
    }

  return (
    <StyledForm onSubmit={handleSubmit}>
        {updatePost &&
        <>
 <FlexType>
                    <p>Food Type</p>
                        <Radio>
                            <input type="radio" checked={updatePost.foodType === "Appetizer" ? true : false} id="Appetizer" name="foodType" required onChange={(e)=>handleChange(e.target.name, e.target.id)} />
                            <label htmlFor="Appetizer">Appetizer</label><br/>
                        </Radio>
                        <Radio>
                            <input type="radio" checked={updatePost.foodType === "Main course" ? true : false} id="Main course" name="foodType" onChange={(e)=>handleChange(e.target.name, e.target.id)}/>
                            <label htmlFor="Main course">Main course</label><br/>
                        </Radio>
                        <Radio>
                            <input type="radio" checked={updatePost.foodType === "Dessert" ? true : false} id="Dessert" name="foodType" onChange={(e)=>handleChange(e.target.name, e.target.id)}/>
                            <label htmlFor="Dessert">Dessert</label><br/>
                        </Radio>       
            </FlexType>

        <FlexTwo>
            <label htmlFor='name'>Title:</label>
            <input type="text" id='name' value={updatePost.name} required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='person'>By:</label>
            <input type="text" id='person' value={updatePost.person}  required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='price'>Price:</label>
            <input type="text" id='price' value={updatePost.price}  required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <br></br>
        <FlexTwo>
            <label htmlFor='ingredients'>Ingredients:</label>
            <input type="text" id='ingredients' value={updatePost.ingredients}  required onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
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
                        <option value="montreal" >Montreal</option>
                    </select>
                  </SelectOptions>
                    
                     <br/>  
                        <input type="number"  placeholder="Street number" name="stNum" value={updatePost.stNum}  required onChange={(e)=> handleChange(e.target.name, e.target.value)}/><br/>
                        <input type="text"  placeholder="Street name" name="stName" value={updatePost.stName} required onChange={(e)=> handleChange(e.target.name, e.target.value)}/><br/>        
                        <input type="text" pattern= "[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" placeholder="Postal code" name="postalCode" value={updatePost.postalCode} required onChange={(e)=> handleChange(e.target.name, e.target.value)}/>
        </Divider>
        <br></br>
        <FlexTwo>
            <label htmlFor='about'>About this meal:</label>
            <input type="text" id='about' value={updatePost.about} onChange={(e)=> handleChange(e.target.id, e.target.value)}  />
        </FlexTwo>
        <FlexUpload>
          <label>Add photo:</label>
          <UploadWidget setPictureUrl={setPictureUrl} pictureUrl={pictureUrl}/>
        </FlexUpload>
        <button type='submit'>Post</button>
        </>
 
        }
        </StyledForm>
  )
}

const StyledForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 80px;
  font-size: 18px;
  border: 3px solid black;
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
    border-radius: 5px;
    width: 150px;
    transition: background-color 0.3s,
                opacity 0.3s;
  }

    button:hover {
      cursor: pointer;
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

export default UpdateForm