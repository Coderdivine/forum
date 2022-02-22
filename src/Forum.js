import React, { useContext } from 'react'
import { create } from './App';
import {Link} from 'react-router-dom';

function Forum() {
  const {generals,search} =useContext(create)
  /*
   const name = req.body.name;
   const des = req.body.des;
    const date = req.body.date;
    const title =req.body.title;
     */

  const mapp_generals = generals && generals.filter((lists)=>{
    if(search==""){return lists}else if(lists.title.toLowerCase().includes(search.toLowerCase())){return lists}
  }).map(x=><div>
<div class="subforum-row">
<div class="subforum-icon subforum-column center">
<img className='img' src='./img/Thunder.png' alt={x.title}/>
</div>
<div class="subforum-desc subforum-column">
<h1><a href="#"><Link to={{pathname:`/details/${x.title}`}}>{x.title}</Link></a></h1>
<p><Link to={{pathname:`/details/:${x.title}`}}>{x.des}</Link></p>
</div>
<div class="subforum-stats subforum-column center">
<span> 24 Posts | 15 topics</span>
</div>
<div class="subforum-info subforum-column">
<a href="" >Last post</a> by <a href="" >{x.name}</a>
<br />
on <small>{x.date}</small>
</div>

</div>
    </div>);
  return (
    <div>
        
<div class="container">
<div class="subforum">
<div class="subforum-title">
<h1>General Information</h1>
</div>
{mapp_generals}{/*
<div class="subforum-row">
<div class="subforum-icon subforum-column center">
<i class="fa fa-car"></i>
</div>
<div class="subforum-desc subforum-column">
<h1><a href="">Description title</a></h1>
<p>Description Content: just type any thing here for the first time then later on you can put ur email addresd to get notifications abt ur post and coment here in my forum. </p>
</div>
<div class="subforum-stats subforum-column center">
<span> 24 Posts | 15 topics</span>
</div>
<div class="subforum-info subforum-column">
<a href="" >Last post</a> by <a href="" >JustAUser</a>
<br />
on <small> 22 Dec 2021</small>
</div>

</div>

<hr class="subforum-divider" />
<div class="subforum-row">
<div class="subforum-icon subforum-column center">
<img className='img' src='./img/Thunder.jpg' alt=" just an img"/>
</div>
<div class="subforum-desc subforum-column">
<h1><a href="">Description title</a></h1>
<p>Description Content: just type any thing here for the first time then later on you can put ur email addresd to get notifications abt ur post and coment here in my forum. </p>
</div>
<div class="subforum-stats subforum-column center">
<span> 24 Posts | 15 topics</span>
</div>
<div class="subforum-info subforum-column">
<a href="" >Last post</a> by <a href="" >JustAUser</a>
<br />
on <small> 22 Dec 2021</small>
</div>

</div>
<hr class="subforum-divider" />

<div class="subforum-row">
<div class="subforum-icon subforum-column center">
<img className='img' src='./img/Thunder.jpg' alt=" just an img"/>
</div>
<div class="subforum-desc subforum-column">
<h1><a href="">Description title</a></h1>
<p>Description Content: just type any thing here for the first time then later on you can put ur email addresd to get notifications abt ur post and coment here in my forum. </p>
</div>
<div class="subforum-stats subforum-column center">
<span> 24 Posts | 15 topics</span>
</div>
<div class="subforum-info subforum-column">
<a href="" >Last post</a> by <a href="" >JustAUser</a>
<br />
on <small> 22 Dec 2021</small>
</div>

</div>
*/}
<hr class="subforum-divider" />


<div class="forum-info">
<div class="chart">
MY FORUM - STATS &nbsp; <i>chart</i>
</div>
<div>
 <span><u>5,000</u> in <u>6,456</u> Topics by <u>45,500</u>Users</span><br />
 </div>
 </div>
 
 </div>
 
 </div>
    </div>
  )
}

export default Forum;