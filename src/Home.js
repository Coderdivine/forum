import React, { useEffect, useState } from 'react'

function Home() {
  useEffect(()=>{
    window.location = "/forum";
  },[])
  return (
    <div>
      <h1>HOME</h1>
      <p>Welcome to Wescan blog !!!</p>
    </div>
  )
}

export default Home