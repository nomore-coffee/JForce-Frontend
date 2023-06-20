import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedAdmin = (props) => {
    const {Component} = props 
    const navigate = useNavigate()
    useEffect(()=>{
      checkToken()
    },[])
    const checkToken =()=>{
        let token = localStorage.getItem("token")
        let role = localStorage.getItem("role")
        if(!token || role!=='admin'){
            navigate("/")
        }
    }
  return (
    <div>
      <Component />
    </div>
  )
}

export default ProtectedAdmin
