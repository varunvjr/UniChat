import React,{useEffect,useState} from 'react'
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from "../firebase"
import {useAuth} from "../contexts/AuthContext"
import axios from 'axios'
const Chats = () => {
    const history=useHistory();
    const {user}=useAuth();
    const [loading,setLoading]=useState(true);
    const getFile=async(url)=>{
        const res=await fetch(url);
        const data=await res.blob()
        return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    }
    useEffect(()=>{
        if(!user){
            history.push("/");
            return
        }
        console.log("email",user.photoURL)
        axios.get('https://api.chatengine.io/users',{
            headers:{
                "project-id":"0615880f-cbba-43e1-b02f-e5239f9cfc2b",
                "user-name":user.email,
                "user-secret":user.uid
            }
        }).then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata=new FormData();
            formdata.append('email',user.email);
            formdata.append('username',user.displayName);
            formdata.append('secret',user.uid);
            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar',avatar,avatar.name)
                    axios.post('https://api.chatengine.io/users/me',formdata,{headers:{"private-key":"c00bda99-076f-4307-b215-11ad5212f063"}})
                })
                .then(()=>setLoading(false))
                .catch((err)=>{console.log(err)})
        })
        console.log("User",user.displayName)
    },[user,history]);
    const handleLogout=async(e)=>{
        await auth.signOut();
        history.push("/");
    }
    if(!user||loading)
        return "Loading...."
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    UniChat
                </div>
                <div className='logout-tab' onClick={handleLogout}>
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh-66px)"
                projectId="0615880f-cbba-43e1-b02f-e5239f9cfc2b"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats
