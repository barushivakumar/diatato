import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Header from "../Header/header";
import Sidebar from "../Sidemenu/Sidebar";
import { connect } from 'react-redux';
import { Upload,message, Button } from "antd";
import axios from "axios";
import { hover } from "@testing-library/user-event/dist/hover";
const AdminProfile = () => {
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
      const [gender,setGender] = useState('');
      const [FirstName,setFirstName] = useState('');
      const [LastName,setLastName] = useState('');
      const [CurrentAddress,setCurrentAddress] = useState('');
      const [Village,setvillage] = useState('');
      const [Mandal,setMandal] = useState('');
      const [City,setCity] = useState('');
      const [State,setState] = useState('');
      const [Country,setCountry] = useState('');
      const [Pincode,setPincode] = useState('');

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
            if(response.data.userProfile.gender != null){
              setGender(response.data.userProfile.gender)
            }
 
            if(response.data.userProfile.mobile != null){
             setNumber(response.data.userProfile.mobile)
            }
 
            if(response.data.userProfile.current_address != null){
             setCurrentAddress(response.data.userProfile.current_address)
            }
            
             if(response.data.userProfile.current_town != null){
               setvillage(response.data.userProfile.current_town)
             }
 
             if(response.data.userProfile.current_mandal != null){
               setMandal(response.data.userProfile.current_mandal)
             }
 
             if(response.data.userProfile.current_city != null){
               setCity(response.data.userProfile.current_city)
             }
 
             if(response.data.userProfile.current_state != null){
               setState(response.data.userProfile.current_state)
             }
             
 
             if(response.data.userProfile.current_country != null){
               setCountry(response.data.userProfile.current_country)
             }
 
             if(response.data.userProfile.current_pincode != null){
               setPincode(response.data.userProfile.current_pincode)
             }
 
             if(response.data.userProfile.permanent_address != ''){
                 setNotSameAddress(true)
                 document.getElementById('addresssameCheckbox').checked = true
             }
 
             if(response.data.userProfile.permanent_address != null){
               setPermanentAddress(response.data.userProfile.permanent_address)
             }
             if(response.data.userProfile.permanent_town != null){
               setPermanentVill(response.data.userProfile.permanent_town)
             }
             if(response.data.userProfile.permanent_mandal != null){
               setPermanentMandal(response.data.userProfile.permanent_mandal)
             }
             if(response.data.userProfile.permanent_city != null){
               setPermanentCity(response.data.userProfile.permanent_city)
             }
             if(response.data.userProfile.permanent_state != null){
               setPermanentState(response.data.userProfile.permanent_state)
             }
             if(response.data.userProfile.permanent_country != null){
               setPermanentCountry(response.data.userProfile.permanent_country)
             }
 
             if(response.data.userProfile.permanent_pincode != null){
               setPermanentPincode(response.data.userProfile.permanent_pincode)
             }
             
          } catch (error) {
            await console.error(error);
            // window.alert("Can't Assign Same Track Name")
          }
        }
        fetchServicesData();
       
       
      }, [1]);

  
      const [error, setError] = useState("");

     
  return (
   <>
     <Header/>
        <div className="app d-flex " style={{position:'absolute',width:'100%',height:'calc(100vh - 120px)'}}>
          <Sidebar/>
          <div className="componentContainer" style={{height:'93%'}}>
            <div>
                <h3>
                    Profile
                </h3>
            </div>
       <div className="ComponentInnerContainer" style={{padding:'20px'}} >
        <form>
            <div className="d-flex align-items-center mb-3 justify-content-center">
            {/* <Upload style={inputStyle} 
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader d-flex align-items-center "
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
                <input disabled className="mr-5" value={FirstName}
                          style={inputStyle} type="text" placeholder="First Name" />
                <input  disabled style={inputStyle} value={LastName}
                           type="text" placeholder="Last Name" />
            </div>
            <div className="d-flex align-items-center mb-3">
            <input disabled className="mr-5" style={inputStyle} value={number}
                           type="text" placeholder="Number" />

                          <select disabled style={inputStyle} value={gender}
                          >

                            <option selected disabled>Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                          </select>

</div>

            <div className="d-flex align-items-center mb-3">
                <input disabled  style={BiginputStyle} value={CurrentAddress}
                           type="text" placeholder="Current Address" />
                
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled className="mr-5" value={Village}
                           style={inputStyle} type="text" placeholder="Village/Town" />
                <input disabled style={inputStyle} value={Mandal}
                           type="text" placeholder="Mandal/Taluk" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled className="mr-5" value={City}
                           style={inputStyle} type="text" placeholder="City" />
                <input disabled style={inputStyle} value={State}
                          type="text" placeholder="State" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled className="mr-5" value={Country}
                           style={inputStyle} type="text" placeholder="Country" />
                <input disabled style={inputStyle} value={Pincode}
                           type="text" placeholder="Pincode" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled id="addresssameCheckbox" type="checkbox" onClick={AddressNotSame} /> Tick if current address and permanent address are different
            </div>
            {
                NotSameAddress === true &&
                <>
                
                <div className="d-flex align-items-center mb-3">
                <input disabled value={PermanentAddress}
                           style={BiginputStyle} type="text" placeholder="Permanent Address" />
                
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled className="mr-5" value={PermanentVill}
                           style={inputStyle} type="text" placeholder="Village/Town" />
                <input disabled style={inputStyle} value={PermanentMandal}
                           type="text" placeholder="Mandal/Taluk" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled className="mr-5" value={PermanentCity}
                           style={inputStyle} type="text" placeholder="Country" />
                <input disabled style={inputStyle} value={PermanentState}
                           type="text" placeholder="State" />
            </div>
            <div className="d-flex align-items-center mb-3">
                <input disabled className="mr-5" value={PermanentCountry}
                           style={inputStyle} type="text" placeholder="Country" />
                <input disabled style={inputStyle} value={PermanentPincode}
                           type="text" placeholder="Pincode" />
            </div>
                </>
            }
            <div className="mb-5">
                <Link to="/EditAdminProfile" style={{...ButtoninputStyle,textDecoration:'none',textAlign:'center',color:'white'}} type="submit" className="buttonUI ">Edit Property</Link>
            </div>
            
        </form>
        
       
       </div>
     </div>
        </div>
     
   </>
  );
}


export default connect() (AdminProfile);