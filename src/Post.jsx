import React, { useEffect, useState } from 'react'
import axios from "axios";

function Post() {
   const[names,setNames]=useState("");
   const[title,setTitle]=useState("");
   const[des,setDes]=useState('');
   useEffect(()=>{
      window.location = "/signup"
   },[])
   const getDate=()=>{
      const dates = new Date();
      const m_date = dates.getDate();
      return m_date;
 }
   //htps://wescandatabase.herokuapp.com/main
const handlePost= async(e)=>{
   e.preventDefault();
 const datas = {
      name:names,date:getDate(),title:title,des:des
   }
  await axios.post("https://wescanforum.herokuapp.com/main",datas)
   .then((response)=>{
      alert("Successfully posted new general infomation")
   });
  /* await axios.post("https://emailsonboard.herokuapp.com/emails",{type:"forumSignUp",email:email}).then((response)=>{
         console.log(response.data)
        });*/
}

  return (
    <div>
        
<div class="container">
   <div className='boxes'>
      <form onSubmit={(e)=>handlePost(e)}>
         <input type="text" placeholder='Name' value={names} onChange={(e)=>setNames(e.target.value)}/>
         <input type="text" placeholder='Description' value={des} onChange={(e)=>setDes(e.target.value)}/>
         <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
         <span>{getDate()}</span>
         <button type="submit">Post general info</button>
      </form>
   </div>
   </div>

    </div>
  )
}

export default Post