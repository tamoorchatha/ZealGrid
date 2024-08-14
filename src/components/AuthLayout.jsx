import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';



export default function Protected({children, authentication=true}) {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(()=>{
    if(authentication && authStatus !== authentication){
      navigate('/signin')
    }else if(!authentication && authStatus !== authentication){
      navigate('/')
    }
    setLoader(false)
  },[authStatus,navigate,authentication])

  return loader ? <h1>Loading ...</h1> : <>{children}</>
}

Protected.propTypes = {
  children: PropTypes.node,
  authentication: PropTypes.bool,
}