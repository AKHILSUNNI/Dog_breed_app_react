import React, { useState,useEffect } from "react";
import axios from "axios";

function Dogapp() {
  const [breed, setBreed] = useState([]);
  const [name,setName] = useState("affenpinscher")
  const [subbreed, setSubbreed] = useState([]);
  const [subname,setSubname] = useState("")
  const [images, setImages] = useState([]);

  useEffect(() => {
     axios
    .get("https://dog.ceo/api/breeds/list/all")
    .then(res => {
      for(var a in res.data.message){
        breed.push(a)
        setBreed(prev => [...breed])
       }
    })

  },[])

  

const api = (ev) => {
  axios
   .get(`https://dog.ceo/api/breed/${name}/list`)
   .then(res => {
    for(var b in res.data.message){
      setSubname(res.data.message[0])
      subbreed.push(res.data.message[b])
      setSubbreed(prev => [...subbreed])
    }
   })
}

const change = (ev) => {
   ev.preventDefault()
   setName(ev.target.value) 
   setSubbreed([])
   setSubname("")
   setImages([])
}

const subChange = (ev) => {
  ev.preventDefault()
  setSubname(ev.target.value)
  setImages([])
}

const image = (ev) =>{
  ev.preventDefault()
  if(subbreed.length === 0){
    axios
    .get(`https://dog.ceo/api/breed/${name}/images`)
    .then(res =>{
      for(var i in res.data.message){
        images.push(res.data.message[i])
        setImages((prev) => [...images])
      }
    })}
  else{
      axios
    .get(`https://dog.ceo/api/breed/${name}/${subname}/images`)
    .then(res =>{
      for(var i in res.data.message){
        images.push(res.data.message[i])
        setImages((prev) => [...images])
        console.log(subname)
      }
    })}
}
  
return (
  <div >
    <form onSubmit = {image}>
      <select className ="app" onChange= {change} onClick ={api}>
        {breed.map((item) => {
            return <option value={item}>{item}</option>
        })}
      </select>
      {
        (subbreed.length === 0)? ("") :
          (<select className ="apps" onChange = {subChange} >
            {subbreed.map((item) => {
                return <option value={item}>{item}</option>
            })}
          </select>)
      }
      <button className ="button">Get Image</button>
    </form>
    <div className ="image">
      {
        images.map((item) =>{
          console.log((item))
          return <img src = {item} />
        })
      }
    </div>
  </div>
 );
}

export default Dogapp;
