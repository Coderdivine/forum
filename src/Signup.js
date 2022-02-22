import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { create } from './App';


function Signup() {
    const[email,setEmail]=useState("");
    const[names,setNames]=useState("");
    const[phone,setPhone]=useState("");
    const[password,setPassword]=useState("");
    const[c_password,setC_password]=useState("");
    const[select,setSelect]=useState("");
    const[topic,setTopic]=useState("");
    const[content,setContent]=useState("");
    const {setMsg,generals,topics} = useContext(create);
    const[signup,setSignup]=useState(true);
    const new_Date =()=>{
        const date = new Date();
        const m_date = date.getDate();
        return m_date.toString();
      }
    const handleSignUp=async(e)=>{
        e.preventDefault();
       
        const data = {
            name:names,
            email:email,
            phone:phone,
            password:password,
            c_password:c_password,
            date:new_Date()
        }
        if(names == "" && email == "" && phone == ""){
       await axios.post("https://weiscanforum.herokuapp.com/signup",data)
        .then((response)=>{
            setMsg([
                {
                    type:"green",
                    text:"Sign Up successful !"
                }
            ]);
            setSignup(false);

        })
    }else{
        setMsg([{
            type:"red",
            text:"Please enter a valid information !"
        }])
    }
    await axios.post("https://emailsonboard.herokuapp.com/emails",{type:"forumSignUp",email:email}).then((response)=>{
         console.log(response.data)
        });
    }
    const[login,setLogin]=useState(true);
    const handle_Login=(e)=>{
        setLogin(true);
    }
    const handleSign_up=(e)=>{
        setLogin(false)
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        await axios.get(`https://weiscanforum.herokuapp.com/login/${names}/${password}`).then((response)=>{ 
                     setSignup(false)
        })
    }
    const handlePost=async()=>{
        const data={
            name:names,
            email:email,
            topic:topic,
            content:content,
            m_title:select,
            date:new_Date()
        }
        await axios.post("https://weisacnforum.herokuapp.com/topic",data)
        .then((response)=>{
            setMsg([{
                type:"green",
                text:"Posted !"
            }])
        })
        await axios.post("https://emailsonboard.herokuapp.com/emails",{type:"forumPost",email:email}).then((response)=>{
         console.log(response.data)
        });
    }
    const validates=()=>{
        if(password == c_password){
            setMsg([{
                type:"green",
                text:"Password match"
            }])
        }else{
            setMsg([{
                type:"red",
                text:"password does not match"
            }])
        }
    }
    useEffect(()=>{
        if(password !== "" && c_password !== ""){
            validates()
        }
    },[password,c_password])
  return (
    <div>
       <div className="signup">
           {
               signup
               ?
               <div>{!login?<div>
         <h1>Signup Page</h1>
        <hr/>
       <input type="text" placeholder='Name' value={names} onChange={(e)=>setNames(e.target.value)}/>
       <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
<input name="comment" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
<input type="text" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
<input type="text" placeholder="Confirm Password" value={c_password} onChange={(e)=>setC_password(e.target.value)}/>
<input type="click" name="submit" value="Sign Up" style={{"cursor":"pointer"}} onClick={(e)=>handleSignUp(e)} readOnly/>
<span onClick={(e)=>handle_Login(e)} style={{"cursor":"pointer","color":"green"}}>Login instead </span>
               </div>:
               <div>
               <h1>Login Page</h1>
        <hr/>
       <input type="text" placeholder='Username' value={names} onChange={(e)=>setNames(e.target.value)}/>
       <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
<input type="click" name="submit" value="Sign Up" style={{"cursor":"pointer"}} onClick={(e)=>handleLogin(e)} readOnly/>
<span onClick={(e)=>handleSign_up(e)} style={{"cursor":"pointer","color":"green"}}>Signup instead</span>
                   </div>
                   }
                    
               </div>
               :
               <div>
                    <h1>Post Topic</h1>
        <hr/>
       <input type="text" placeholder='Name' value={names} onChange={(e)=>setNames(e.target.value)}/>
       <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
{
    generals && generals.map(x=>
    <div>
<select onChange={(e)=>{
    const selected = e.target.value;
    setSelect(selected)
}}>
    <option>{x.title}</option>
</select>
    </div>)
}
<input type="click" name="submit" value="Sign Up" style={{"cursor":"pointer"}} onClick={(e)=>handlePost(e)} readOnly/>
               </div>
           }
       </div>
    
  
    </div>
  )
}

export default Signup