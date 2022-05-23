import {useState} from 'react'
import Link from 'next/link'
import { auth } from '../firebase'
import { getAuth, createUserWithEmailAndPassword ,updateProfile  } from "firebase/auth";

function signup() {
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    // console.log(auth)

    const handleSubmit = async (e)=>{
        e.preventDefault();


        try{
            const result = await createUserWithEmailAndPassword(auth,email, password);
            // console.log(result)
            await updateProfile(auth.currentUser,{
                displayName:name
            })
            M.toast({html: `welcome ${result.user.displayName}`,classes:"green"}) 
        }
        catch(err){
            M.toast({html:err,classes:"red"}) 
        }

        // createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //   // Signed in 
        //   const result = userCredential.user;
        //   result.displayName=name
        //   console.log(result)
        //   M.toast({html: `welcome ${result.displayName}`,classes:"green"}) 
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   M.toast({html: error.message,classes:"red"}) 
        // });

    }
  return (
    <div className="container center">
    <h3>Plase Signup!!</h3>
     <form onSubmit={(e)=>handleSubmit(e)}>
         <div className="input-field">
             <input type="text" placeholder="type your name" value={name} onChange={(e)=>setName(e.target.value)} />
             <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
             <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
         </div>
         <button type="submit" className="btn #fb8c00 orange darken-1">Signup</button>
        <Link href="/login"><a><h5>Already have an account</h5></a></Link>
     </form>
    
</div>
  )
}

export default signup