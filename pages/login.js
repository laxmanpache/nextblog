import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log(email);
    // console.log(password);
    try{
        const result = await signInWithEmailAndPassword(auth,email, password);
        M.toast({html: `welcome ${result.user.displayName}`,classes:"green"}) 
        router.push("/")
    }
    catch(err){
        M.toast({html:err,classes:"red"}) 
    }
   
 

//     signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const result = userCredential.user;
//     // console.log(result.user.displayName)
//     console.log(result)
//    

//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   
//   });
  };
  return (
    <>
      <div>
        <div className="container center">
          <h3>Plase Login!!</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/*  */}
            <div className="input-field">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/*   */}
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/*  */}
            </div>
            <button type="submit" className="btn #fb8c00 orange darken-1">
              Login
            </button>
            {/* <Link href=""><a><h5>Dont Have a account</h5></a></Link> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
