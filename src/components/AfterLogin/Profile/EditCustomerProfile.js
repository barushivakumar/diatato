import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Header from "../Header/header";
import Sidebar from "../Sidemenu/Sidebar";
import { connect } from 'react-redux';
import { Upload,message, Button } from "antd";
import axios from "axios";
const EditCustomerProfile = () => {
    const inputStyle={
        border:'2px solid gray',
        borderRadius:'5px',
        width:'45%',
        height:'40px'
      }
      const BiginputStyle={
        border:'2px solid gray',
            borderRadius:'5px',
            width:'94.5%',
            height:'40px'
      }
      
      const ButtoninputStyle={
        border:'2px solid gray',
        borderRadius:'5px',
        width:'45%',
        height:'40px',
        float:'right'
      }

      const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };
      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };
      const [loading, setLoading] = useState(false);
      const [imageUrl, setImageUrl] = useState('');
      const handleChange = (info) => {
        console.log(info)
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
          });
        }
      };
      const uploadButton = (
        <div>
          
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      );
      const [NotSameAddress, setNotSameAddress] = useState(Boolean);
      function AddressNotSame(e){
        setNotSameAddress(e.target.checked)
      }
      const ProfilePic = useRef(null);

      const [number,setNumber] = useState('');
      const [FirstName,setFirstName] = useState('');
      const [LastName,setLastName] = useState('');
      const [CurrentAddress,setCurrentAddress] = useState('');
      const [Village,setvillage] = useState('');
      const [Mandal,setMandal] = useState('');
      const [City,setCity] = useState('');
      const [State,setState] = useState('');
      const [Country,setCountry] = useState('');
      const [Pincode,setPincode] = useState('');
      const [gender,setGender] = useState('');


      const [PermanentAddress,setPermanentAddress] = useState('');
      const [PermanentVill,setPermanentVill] = useState('');
      const [PermanentMandal,setPermanentMandal] = useState('');
      const [PermanentCity,setPermanentCity] = useState('');
      const [PermanentState,setPermanentState] = useState('');
      const [PermanentCountry,setPermanentCountry] = useState('');
      const [PermanentPincode,setPermanentPincode] = useState('');
      useEffect(() => {
        setFirstName(localStorage.getItem("userFirstName"))
        setLastName(localStorage.getItem("userLastName"))
        setNumber(localStorage.getItem("userNumber"))
        async function fetchServicesData() {
          const userid = localStorage.getItem("userID");
          const validToken = localStorage.getItem("loginToken");
          const obj={
            'user_id':userid
          }
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_URL}/user/get-user-profile/${userid}`,
              
              {
                headers: {
                  Authorization: "Bearer " + validToken,
                },
              }
            );
        
            await console.log(response.data,"Profile Data",response.data.userProfile.permanent_address);
            setGender(response.data.userProfile.gender)
            setNumber(response.data.userProfile.mobile)
            setCurrentAddress(response.data.userProfile.current_address)
            setvillage(response.data.userProfile.current_town)
            setMandal(response.data.userProfile.current_mandal)
            setCity(response.data.userProfile.current_city)
            setState(response.data.userProfile.current_state)
            setCountry(response.data.userProfile.current_country)
            setPincode(response.data.userProfile.current_pincode)
            if(response.data.userProfile.permanent_address != ''){
                setNotSameAddress(true)
                document.getElementById('addresssameCheckbox').checked = true
            }
            setPermanentAddress(response.data.userProfile.permanent_address)
            setPermanentVill(response.data.userProfile.permanent_town)
            setPermanentMandal(response.data.userProfile.permanent_mandal)
            setPermanentCity(response.data.userProfile.permanent_city)
            setPermanentState(response.data.userProfile.permanent_state)
            setPermanentCountry(response.data.userProfile.permanent_state)
            setPermanentPincode(response.data.userProfile.permanent_pincode)
            
          } catch (error) {
            await console.error(error);
            // window.alert("Can't Assign Same Track Name")
          }
        }
        fetchServicesData();
       
       
      }, [1]);
      const [error, setError] = useState("");
      
      async function ProfileFunction(e){
        e.preventDefault();
          // console.log(imageUrl,number,FirstName,LastName,CurrentAddress,Village,Mandal,
          // City,State,Country,Pincode,PermanentAddress,PermanentVill,
          // PermanentMandal,PermanentCity,PermanentState,PermanentCountry,PermanentPincode)
const userEmail = localStorage.getItem("userEmail")
            const obj = {
              gender:gender,
              profile_image:"imageUrl",
              mobile:number,
               current_address:CurrentAddress,
               current_town:Village,
               current_mandal:Mandal,
               current_city:City,
               current_state:State,
               current_country:Country,
               current_pincode:Pincode,
               permanent_address:PermanentAddress,
               permanent_town:PermanentVill,
               permanent_mandal:PermanentMandal,
               permanent_city:PermanentCity,
               permanent_state:PermanentState,
               permanent_country:PermanentCountry,
               permanent_pincode:PermanentPincode

            };
            console.log(obj);
            const validToken = localStorage.getItem("loginToken");
            const userid = localStorage.getItem("userID");
            try {
              const response = await axios.put(
                `${process.env.REACT_APP_URL}/user/edit-user-profile/${userid}`,
                obj,
                {
                  headers: {
                    Authorization: "Bearer " + validToken,
                  },
                }
              );
              console.log(response);
              window.location.href="/Profile"
              
            } catch (error) {
              console.log(error);
            }


      }
  return (
   <>
     <Header/>
        <div className="app d-flex " style={{position:'absolute',width:'100%',height:'calc(100vh - 120px)'}}>
          <Sidebar/>
          <div className="componentContainer" style={{height:'93%'}}>
            <div>
                <h3>
                  Edit Profile
                </h3>
            </div>
       <div className="ComponentInnerContainer" style={{padding:'20px'}} >
        <form onSubmit={ProfileFunction}>
            <div className="d-flex align-items-center justify-content-center mb-3">
            {/* <Upload style={inputStyle} 
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader d-flex align-items-center justify-content-center"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
              height:'100%',
              borderRadius:'50%'
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload> */}
                
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled className="mr-5" value= {localStorage.getItem("userEmail")}
                          style={inputStyle} type="text" placeholder="First Name" />
               
            </div>
            <div className="d-flex align-items-center mb-3">
                <input  disabled className="mr-5" value={FirstName}
                           style={inputStyle} type="text" placeholder="First Name" />
                <input disabled style={inputStyle} value={LastName}
                          type="text" placeholder="Last Name" />
            </div>
            <div className="d-flex align-items-center mb-3">
            <input className="mr-5" style={inputStyle} value={number}  onChange={(e) => {
                            setNumber(e.target.value)
                            setError('')
                          }}
                           type="text" placeholder="Number" />

                          <select style={inputStyle} value={gender}  onChange={(e) => {
                            setGender(e.target.value)
                            setError('')
                          }}
                          >

                            <option selected disabled>Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                          </select>

</div>
            <div className="d-flex align-items-center mb-3">
                <input  style={BiginputStyle} value={CurrentAddress}
                          onChange={(e) => {
                            setCurrentAddress(e.target.value)
                            setError('')
                          }} type="text" placeholder="Current Address" />
                
            </div>
            <div className="d-flex align-items-center mb-3">
                <input className="mr-5" value={Village}
                          onChange={(e) => {
                            setvillage(e.target.value)
                            setError('')
                          }} style={inputStyle} type="text" placeholder="Village/Town" />
                <input style={inputStyle} value={Mandal}
                          onChange={(e) => {
                            setMandal(e.target.value)
                            setError('')
                          }} type="text" placeholder="Mandal/Taluk" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input className="mr-5" value={City}
                          onChange={(e) => {
                            setCity(e.target.value)
                            setError('')
                          }} style={inputStyle} type="text" placeholder="City" />
                <input style={inputStyle} value={State}
                          onChange={(e) => {
                            setState(e.target.value)
                            setError('')
                          }} type="text" placeholder="State" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input className="mr-5" value={Country}
                          onChange={(e) => {
                            setCountry(e.target.value)
                            setError('')
                          }} style={inputStyle} type="text" placeholder="Country" />
                <input style={inputStyle} value={Pincode}
                          onChange={(e) => {
                            setPincode(e.target.value)
                            setError('')
                          }} type="text" placeholder="Pincode" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input  id="addresssameCheckbox" type="checkbox" onClick={AddressNotSame} /> Tick if current address and permanent address are different
            </div>
            {
                NotSameAddress === true &&
                <>
                
                <div className="d-flex align-items-center mb-3">
                <input value={PermanentAddress}
                          onChange={(e) => {
                            setPermanentAddress(e.target.value)
                            setError('')
                          }} style={BiginputStyle} type="text" placeholder="Permanent Address" />
                
            </div>
            <div className="d-flex align-items-center mb-3">
                <input className="mr-5" value={PermanentVill}
                          onChange={(e) => {
                            setPermanentVill(e.target.value)
                            setError('')
                          }} style={inputStyle} type="text" placeholder="Village/Town" />
                <input style={inputStyle} value={PermanentMandal}
                          onChange={(e) => {
                            setPermanentMandal(e.target.value)
                            setError('')
                          }} type="text" placeholder="Mandal/Taluk" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input className="mr-5" value={PermanentCity}
                          onChange={(e) => {
                            setPermanentCity(e.target.value)
                            setError('')
                          }} style={inputStyle} type="text" placeholder="City" />
                <input style={inputStyle} value={PermanentState}
                          onChange={(e) => {
                            setPermanentState(e.target.value)
                            setError('')
                          }} type="text" placeholder="State" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input className="mr-5" value={PermanentCountry}
                          onChange={(e) => {
                            setPermanentCountry(e.target.value)
                            setError('')
                          }} style={inputStyle} type="text" placeholder="Country" />
                <input style={inputStyle} value={PermanentPincode}
                          onChange={(e) => {
                            setPermanentPincode(e.target.value)
                            setError('')
                          }} type="text" placeholder="Pincode" />
            </div>
                </>
            }
            <div className="mb-5">
                <button style={ButtoninputStyle} type="submit" className="buttonUI ">Save</button>
            </div>
            
        </form>
        
       
       </div>
     </div>
        </div>
     
   </>
  );
}


export default connect() (EditCustomerProfile);