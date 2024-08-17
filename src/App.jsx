import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from './firebase/auth'
import { login, logout } from "./features/authSlice";
import { useNavigate } from "react-router-dom";

import Signin from "./pages/Signin"

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        const serializeData = {
          uid: userData.uid,
          email: userData.email,
        }
        dispatch(login({userData: serializeData}))
        navigate('/getStarted')
      }else{
        dispatch(logout())
      }
    }).finally(()=>setLoading(false))
  })

  

  return !loading ? (
    <div>
      <Signin />
    </div>
  ): null

}

export default App
