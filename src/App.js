import logo from './logo.svg';
import './App.css';
import  { BrowserRouter as Router,Route,Link,Routes } from "react-router-dom"
import Home from './Home';
import Forum from './Forum';
import Details from './Details';
import Post from './Post';
import Signup from './Signup';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const create=createContext();
//
//
function App() {
  const[msg,setMsg]=useState([])
  const onClose=()=>{
    setMsg()
  }
  const[select,setSelect]=useState("");
  const checking_route=()=>{
    if(select){
      if(select == "general"){
     window.location = "/";
      }else if(select == "topics"){
        window.location = "/forum";

      }else if(select == "posts"){
        window.location = "/details";

      }
    }
  }
  useEffect(()=>{
    checking_route()
  },[select])
  const[search,setSearch]=useState("");
  const[nav_show,setNav_show]=useState(false);
  const show=()=>{
 setNav_show(true)
  }
  const hide=()=>{
    setNav_show(false)
  }
  //
  //
  //Data_one:general...
  const[generals,setGenerals]=useState([]);
  const[topics,setTopics]=useState([]);
  const[comments,setComments]=useState([]);
  const[re_comments,setRe_comments]=useState([]);
  const getGenerals=async()=>{
   await axios.get("http://localhost:9019/main-get")
   .then((response)=>{
     setGenerals(response.data)
     console.log(generals.email)
   })
  }
  const getTopics=async()=>{
    await axios.get("http://localhost:9019/topic-get")
    .then((response)=>{
      setTopics(response.data)
      console.log(topics)
        })
  
  }
  const getComment=async()=>{
    await axios.get("http://localhost:9019/comment-get")
    .then((response)=>{
      setComments(response.data)
      console.log(comments)
        })
    
  }
  const getRe_comment=async()=>{
    await axios.get("http://localhost:9019/re-comment-get")
    .then((response)=>{
      setRe_comments(response.data)
      console.log(re_comments)
    })
  }
  
  useEffect(()=>{
    getGenerals();
    getTopics();
    getComment();
    getRe_comment();
  },[])
  const[policy,setPolicy]=useState(false);
  const seePolicy=()=>{
       setPolicy(true)
  }
  const closePolicy=()=>{
    setPolicy(false)
  }
  return (
    <div>
    <Router>
      
      <create.Provider value={{setMsg,search,generals,topics,comments,re_comments}}>
      
<header>
<div class="navbar">
{
 nav_show ?<div>
    <nav class="navigation" id="nav">
<ul class="nav-list">
<span class="close-icon"  onClick={()=>hide()}>&times;<i class="fa fa-close"></i></span>
<li class="nav-items">
<a href=""><Link to={{pathname:`/`}}>Home</Link></a>
</li>
<li class="nav-items">
<a href=""><Link to={{pathname:`/forum`}}>Forum</Link></a>
</li>

<li class="nav-items">
<a href=""><Link to={{pathname:`/post`}}>Post</Link></a>
</li>
<li class="nav-items">
<a href=""><Link to={{pathname:`/signup`}}>Sign Up</Link></a>
</li>
</ul>
</nav>

  </div>:<div>
  <a href="#" class="bar-icon" onClick={()=>show()} >
  <i class="fa fa-bars">&#9776;</i></a>
<div class="brand">My Forum</div>
  </div>
}

</div>
<div>

  {
    msg?
    <div>
     { msg.map(({type,text})=>
     <div>
       {type !== "red" ?<div 
         style={{"padding":"12px 12px","textAlign":"center","border":"3px solid green","borderRadius":"12px","margin":"3px"}}
       ><p style={{color:"green",fontSize:"20px"}}>{text}</p> <span style={{color:"green",fontSize:"20px",textAlign:"left",cursor:"pointer"
       }} onClick={()=>onClose()}>&times;</span></div>:<div  style={{"padding":"12px 12px","textAlign":"center","border":"3px solid red","borderRadius":"12px","margin":"3px"}}><p style={{color:"red",fontSize:"20px"}}>{text}</p>
       <span style={{color:"red",fontSize:"20px",textAlign:"left",cursor:"pointer"
       }}  onClick={()=>onClose()}>&times;</span></div>}
     </div>
     )}
    </div>
    :
    <div></div>
  }
</div>
<div class="search-box">
<div class="">
  {select}
<select onChange={(e)=>{
  const selected = e.target.value;
  setSelect(selected);
}}>
<option value="general">General</option>
<option value="topics">Topics</option>
<option value="posts">Posts</option>
</select>
<input type="text" name="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search ..." />
<button>Auto search</button>
</div>
</div>
</header>
  <Routes>
    <Route path="/" exact component={Home}/>
    <Route path="/forum" component={Forum}/>
    <Route path="/details/:m_title/" component={Details}/>
    <Route path="/post" component={Post}/>
    <Route path="/signup" component={Signup}/>
  </Routes>
<div>
 
<div class="note">
<span>
   <i><img className='img' src='./img/Cool.jpg'/></i>&nbsp; 0 Engagement Topic<br />
</span>
<span>
<i><img className='img' src='./img/Warm.jpg'/></i>&nbsp; Low Engagement Topic<br />
</span>
<span>
<i><img className='img' src='./img/Fires.jpg'/></i>&nbsp; Popular Engagement Topic<br />
</span>
<span>
<i><img className='img' src='./img/Thunder.jpg'/></i>&nbsp; High Engagement Topic<br />
</span>

</div>

{
  policy
  ?
  <div>
       <header id="p" class="header-p" onClick={()=>closePolicy()}>Privacy policy.</header>
 
<div class="container-p">
<p>
Welcome to wescan forum Privacy and Policy <br/>
Here are some of the information we collect before participating in your forum.
</p>
</div>
<div class="container-p">
<p>
Sign up section:<br />
This section allows user to become a part of wescan forum community.<br/> We collect users details e.g name,email and phone number to keep track of wescan users.<br/> Note this section is optional for client who want to comment on any post, but to be able to post a topic he/she needs to sign-up. 
</p>
</div>
<div class="container-p">
<p>
Comment section:<br />
In any post any user around the world can come to wescan forum to comment without signing up.<br /> Before a user comment on a post he needs to fill his email address when commenting on a post. 
</p>
</div>
<div class="container-p">
<p>
Contact us section:<br/>
Any user who wishes to contact us can go to your contact section. Here are the information we collect:<br />
1.Name: keep track of the user,<br/>
2. Email: to give user feedback,<br />
3. Phone number: to give user feedback,<br />
4. Message: user message.
</p>
</div>
  </div>
  :
  <div>
    <header id="p" class="header-p" onClick={()=>seePolicy()}> Privacy policy.</header>

  </div>
}
</div>
<footer>
<span>&copy; Weiscan Blog. | All right Reserved</span>
</footer>

</create.Provider>

</Router>
</div>
  );
}

export default App;
