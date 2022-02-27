import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { create } from './App'; 
import {useParams} from "react-router-dom"

function Details() {
 const {setMsg,search,topics,comments,re_comments} = useContext(create);
 //
 //
 //
 useEffect(()=>{
   if(localStorage.getItem("weiscan/forum_email")){
     const emailer = localStorage.getItem("weiscan.forum_email");
     setEmail(emailer)
   }
 },[])
  const[showComment,setShowComment]=useState(false)
  const {m_title} = useParams();
  const nShow=()=>{
    setShowComment(true)
  }
  const[allow_comment,setAllow_comment]=useState(false)
  const Comments=()=>{
setAllow_comment(true)
  }
    //comment,name,email
const new_Date =()=>{
  const date = new Date();
  const m_date = date.getDate();
  return m_date.toString();
}
const[comment,setComment]=useState("");
  const[names,setNames]=useState("");
  const[email,setEmail]=useState("");
  const handleSubmit=async(title,topic_name,topic_email,views)=>{
    const likes = views + 1;
    const data = {
      email:email,
      date:new_Date(),
      comment:comment,
      name:names,
      like:likes,
      m_title:title,
      t_name:topic_name,
      t_email:topic_email
    }
    //weiscanforum.herokuapp.com
    await axios.post("https://weiscanforum.herokuapp.com/comments",data).then((response)=>{
      setMsg([{type:"green",text:"Comment posted"}])
      localStorage.setItem("weiscan/forum_email",email)
    });
    await axios.post("https://emailsonboard.herokuapp.com/emails",{type:"forumSignUp",email:email}).then((response)=>{
         console.log(response.data)
        });
  }
  const handleLike=async(likes,id)=>{
       //weiscanforum.herokuapp.com
       //xl.like,m_title,xl.comment,xl.email,x.name

   const your_like = Number(likes) + 1;
   const to_string =your_like.toString();
   await axios.put(`https://weiscanforum.herokuapp.com/addLike/${to_string}/${id}`)
   .then((response)=>{
    setMsg([{type:"green",text:`You just liked a comment`}])

   })

  }

  const[seeComment,setSeeComment]=useState(false);
  const viewer_comments=()=>{
       setSeeComment(true);
  }
  //viewer_comments
  const[third_view,setThird_view]=useState(false)
  const handle_viewers_comment=()=>{
   setThird_view(true)
  }
  const[comment_two,setComment_two]=useState("");
  const[names_viewer,setNames_viewer]=useState("");
  const[email_viewer,setEmail_viewer]=useState("");
  const handleSubmit_two=async(namer,email,cu_name,cu_email,cu_date)=>{
    /* const email = req.body.name;
    const date = req.body.date;
    const comment =req.body.views;
    const name = req.body.topic;
    const m_title =req.body.m_title;
    const t_name = req.body.t_name;
    const t_email = req.body.t_email;
    const c_name = req.body.c_name;
    const c_email = req.body.c_email;
    const c_date = req.body.c_date;
    */
   
//x.name,x.email,xl.name,xl.email,xl.date
    const data = {
      email:email_viewer,
      date:new_Date(),
      comment:comment_two,
      name:names_viewer,
      m_title:m_title,
      t_name:namer,
      t_email:email,
      c_name:cu_name,
      c_email:cu_email,
      c_date:cu_date
    }
    await axios.post("https://weiscanforum.herokuapp.com/re-comment",data).then((response)=>{
      setMsg([{type:"green",text:"Comment posted"}])
      localStorage.setItem("weiscan/forum_email",email_viewer)

    });
    await axios.post("https://emailsonboard.herokuapp.com/emails",{type:"forum_recomment",email:email_viewer}).then((response)=>{
         console.log(response.data)
        });
  }
  //
  //
  /*
  const name = req.body.name;
    const date = req.body.date;
    const views =req.body.views;
    const topic = req.body.topic;
    const email =req.body.email;
    const m_title =req.body.m_title; */
 //
 //
 /*
  const email = req.body.name;
    const date = req.body.date;
    const comment =req.body.views;
    const name = req.body.topic;
    const like =req.body.email;
    const m_title =req.body.m_title;
    const t_name = req.body.t_name;
    const t_email = req.body.t_email;
    //
    //
    //
    const email = req.body.name;
    const date = req.body.date;
    const comment =req.body.views;
    const name = req.body.topic;
    const m_title =req.body.m_title;
    const t_name = req.body.t_name;
    const t_email = req.body.t_email;
    const c_name = req.body.c_name;
    const c_email = req.body.c_email;
    const c_date = req.body.c_date;
    //
    //
    const[topic_name,setTopic_name]=useState("");
const[topic_email,setTopic_email]=useState("");
const[comment_name,setComment_name]=useState("");
const[comment_email,setComment_email]=useState("");
const[comment_date,setComment_date]=useState("");
 */
   
     
  return (
    <div>
        
<div class="container">
<div class="navigate">
<span><a href="#" >My forums - forums</a>  <a href="#" >Random forums</a>  <a href="#" >Random Post</a></span>
</div>
<div class="topic-container">
</div>{
topics && topics.filter((lists)=>{
  if(search==""){return lists}else if(lists.name.toLowerCase().includes(search.toLowerCase())){return lists}
}).filter(x=>x.m_title == m_title).map(x=><div>
    <div class="head">
<div class="authors">Author</div>
<div class="content">Topic: post's title (Read 1258 Times)</div>
</div>
<div class="body">
<div class="authors">
<div class="username"><a href="#" >{x.name}</a></div>
<div>Role</div>
<img src="https://www.istockphoto.com/photo/3d-illustration-cartoon-ninja-boy-on-white-gm1292752342-387442721" alt="no img" />
<div>views: <u>{x.views}</u></div>
<div style={{"cursor":"pointer","color":"red"}}><span onClick={()=>nShow()}>View comments</span></div>
</div>
<div class="content">
{x.topic}<hr />
 Regards ...
 <div class="comment">
 <button onClick={()=>Comments()}>Comment</button>
 </div>
</div>
</div>
{
  allow_comment?<div>
     <div class="comment-area" id="comment-a">
       <input type="text" placeholder='Name' value={names} onChange={(e)=>setNames(e.target.value)}/>
       <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
<textarea name="comment" id="comment" placeholder="Comment here ..." value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
<input type="submit" id="" name="submit" value="submit"  onClick={()=>handleSubmit(m_title,x.name,x.email,x.views)}/>
</div>
  </div>:
  <div></div>
 
}
{
comments && comments.filter((lists)=>{
  if(search==""){return lists}else if(lists.name.toLowerCase().includes(search.toLowerCase())){return lists}
}).map(xl=><div>        
<div class="comments-container">
{showComment?<div>
  <div class="head">
<div class="authors">Author</div>
<div class="content">Comments</div>
</div>
  <div class="body">
<div class="authors">
<div class="AnotherUser"><a href="#" >{xl.name}</a></div>
<div>Role</div>
<img src="" alt="no img" />
<div>Like: <u>{xl.like}</u></div>
<a style={{"cursor":"pointer"}} onClick={()=>handle_viewers_comment()}>View comment</a>
</div>
<div class="content ">
{xl.comment}<br />
 <div class="comments">
 <input value="❤ Like" type="submit" onClick={()=>handleLike(xl.like,xl.id)}/><br/>
 <input value="comment" type="submit" onClick={()=>viewer_comments()} />
 { 
  seeComment ?<div>
    <div>
     <div class="comment-area" id="comment-a">
       <input type="text" placeholder='Name' value={names_viewer} onChange={(e)=>setNames_viewer(e.target.value)}/>
       <input type="email" placeholder='Email' value={email_viewer} onChange={(e)=>setEmail_viewer(e.target.value)} />
<textarea name="comment" id="comment" placeholder="Comment here ..." value={comment_two} onChange={(e)=>setComment_two(e.target.value)}></textarea>

<input type="submit"  name="submit" value="submit"  onClick={()=>handleSubmit_two(x.name,x.email,xl.name,xl.email,xl.date)}/>
</div>
  </div>
  </div>:
  <div></div> 
 }
 </div>
 <br/>
 <br/>
 {
 <div>
    {re_comments && re_comments.filter(el=> m_title == el.m_title
       && x.name == el.t_name
        && x.email == el.t_email 
        && xl.name == el.c_name
        && xl.email == el.c_email
        && xl.date == el.c_date
        ).map(el=><div>  
 {

 third_view ?<div>
  <div class="head">
<div class="authors">Author</div>
<div class="content">Comments</div>
</div>
  <div class="body">
<div class="authors">
<div class="AnotherUser"><a href="#" >{el.name}</a></div>
<div>Role</div>
<img src="" alt="no img" />
<div>Date: <u>{x.date}</u></div>
</div>
<div class="content ">
{x.comment}<br />
</div></div>
   </div>
   :
   <div>.</div>
   }
 
  </div>
   )}

   </div>
 }
 </div>
</div>
</div>:<div>
  </div>
  }

</div>
    </div>
    )}

 </div>
 )}


</div>

    </div>
  )
}

export default Details