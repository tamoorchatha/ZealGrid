import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from './firebase/auth'
import { login, logout } from "./features/authSlice";
import Signin from "./pages/Signin";
function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).finally(()=>setLoading(false))
  })

  

  return !loading ? (
    <div>
      <Signin />
    </div>
  ): <div>loading...</div>
}

export default App
