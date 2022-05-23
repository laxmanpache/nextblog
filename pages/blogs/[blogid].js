import React, { useState } from 'react'

import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router'
import { addDoc } from "firebase/firestore"; 
import {  getDocs, onSnapshot, startAfter } from "firebase/firestore"; 
import { collection, query, where } from "firebase/firestore";
 export default function BlogePage(props) {
    // console.log(props.blogdata)
    const [myComment,setMyComment] = useState('')
    const router = useRouter()
    const {blogid}=router.query;

//   console.log(pid.blogid)

    const makeCommet = async ()=>{

           console.log(blogid)
        // const docRef = doc(db, 'blogs', pid);
        alert('hello')
        if(blogid){
            alert('hello')
            alert(blogid)
            const citiesRef = collection(db, 'blogs');
            // const docRef=collection(db,'blogs',blogid);
            const cref=collection(citiesRef, blogid)
             const data = doc(db, "blogs", blogid, "comment")
            // console.log(docRef)
            // const docref= new setDoc(doc(cref, 'comment'), {
            //     comment: myComment,
            //     type: 'bridge',
            //     id:'bgid'
            // })
        //   const docRef=  await addDoc(collection(db, "blogs",blogid), {
        //         comment: myComment,
        //         name: "laxman",
               
        //       });

    // const createDoc = await setDoc(docRef, {comment : myComment});

        }
        // const bookRef = collection(db ,"blogs")  
         
        // db.collection("blogs").collection(pid.blogid).document({comment:'sdds'})
        // const createDoc = await setDoc(docRef, {comment : myComment});
        // const q= collection(db,'blogs').doc(pid).collection('comments').add({
        //     text:myComment,
        //          name:props.user.displayName
        // })
       
        // await db.collection('blogs').doc(blogid).collection('comments').add({
        //      text:myComment,
        //      name:user.displayName
        //  })
        // const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        // setAllComments(commentQuery.docs.map(docSnap=>docSnap.data()))

     }
    // const [blog, setBlog] = useState({})
    // setBlog(props.blogdata)

  return (

    <div>
            <div className="container center">
            <h2>{props.blogdata.title}</h2>
            <h5>Created On - {new Date(props.blogdata.createdAt).toDateString()}</h5>
            <img src={props.blogdata.imageUrl} alt={props.blogdata.title} />
            <p>{props.blogdata.body}</p>

            {props.user?
            <>
            <div className="input-field">
                <input type="text" 
                placeholder="add a comment" 
                value={myComment} 
                onChange={(e)=>setMyComment(e.target.value)}/>
            </div>
            <button className="btn #fb8c00 orange darken-1" onClick={()=>makeCommet()}>Make comment</button>
            </>
            :<h3>please login to make comments</h3>
          } 
            
            <hr />
            <div className="left-align">

                {/* {allCommentsBlog.map(item=>{
                    return <h6 key={item.name}><span>{item.name}</span> {item.text}</h6>
                })} */}
            </div>

            <style jsx global>
                {`
                span{
                    font-weight:500;
                }
                body{
                    color:orange
                }
                img{
                    width:100%;
                    max-width:500px;
                }
                `}
            </style>
            
        </div>
    </div>
  )
}

export async function getServerSideProps({params:{blogid}}) {

   let blogdata;
    
    const q = query(collection(db, "blogs"));

const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
   if(doc.id===blogid){
    blogdata={...doc.data(),
        createdAt:doc.data().createdAt.toMillis(),
        id:doc.id
       };
   }
});
return { props : {blogdata} }
  }
  