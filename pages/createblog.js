import React from 'react'


import {useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {storage,db} from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';

function createblog({user}) {
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [image,setImage] = useState(null)
    const [url,setUrl] = useState('')



    useEffect(()=>{
        if(url){

           
                 addDoc(collection(db, "blogs"), {
                    title,
                    body,
                    imageUrl:url,
                    postedBy:user.uid,
                    createdAt:serverTimestamp()
                }).then((result)=>{
                    // console.log("Document written with ID: ", user.id);
                    M.toast({html: 'Blog Created',classes:"green"}) 
                }).catch((err)=>{
                    // console.error("Error adding document: ", err);
                    M.toast({html:'error creating blog',classes:"red"}) 
                })
            

        }
    },[url])


    const SubmitDetails = ()=>{
        if (!title || !body || !image){
            M.toast({html: 'please add all the fields',classes:"red"})    
            return
        }
        const storageRef = ref(storage, `image/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
    //    var uploadTask = storage.ref().child().put(image)

    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    if(progress == '100') M.toast({html: 'Image Uploaded',classes:"green"}) 
  
  }, 
  (error) => {
    // Handle unsuccessful uploads
    M.toast({html: error.message,classes:"red"}) 
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //   console.log('File available at', downloadURL);
      setUrl(downloadURL)
    });
  }
);
}

  return (
    <div className="input-field rootdiv">
    <h3>Create A Blog !!</h3>
    <input
    type="text"
    value={title}
    placeholder="Title"
    onChange={(e)=>setTitle(e.target.value)}
    
    />
    <textarea
     type="text"
     value={body}
     placeholder="body"
     onChange={(e)=>setBody(e.target.value)}
    
    />
     <div className="file-field input-field">
        <div className="btn #fb8c00 orange darken-1">
            <span>File</span>
            <input type="file"  onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
        </div>
     </div>
     <button className="btn #fb8c00 orange darken-1" onClick={()=>SubmitDetails()}>Submit Post</button>

     <style jsx>
         {`
         
         .rootdiv{
             margin:30px auto;
             max-width:600px;
             padding:20px;
             text-align:center;
         }
         `}
     </style>

</div>
  )
}

export default createblog