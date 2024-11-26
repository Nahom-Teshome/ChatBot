import React from 'react'
import { GrSend } from "react-icons/gr";
import '../index.css'

export default function Chat(){
    const [query, setQuery] = React.useState()
    const [response, setResponse] = React.useState()
    const [conversation, setConversation] = React.useState([])
    const lastestElement = React.useRef()
    async function handleSubmit(e){
        e.preventDefault()
       const res = await fetch('/api/chat/query',{
        method:'POST',
        body:JSON.stringify({query:query}),
        headers:{
            'Content-Type':'application/json'
        }
       }) 

    const data = await res.json()
    console.log('this is data: ', data.response)
    setResponse(data.response)
    setConversation(prev =>{
        return[...prev,{
            user: query,
            bot: data.response
        }]
    })
}
    React.useEffect(()=>{
        if(lastestElement.current){
            lastestElement.current.scrollIntoView({behavior:'smooth'})
        }
    },[conversation])
console.log("query : ", query)
    return(
        <div className="container">
            <div className="conversation">
                    {(response || query) && conversation.map((convo,ind)=>{return (
                        <div key={ind}
                        ref={ind===conversation.length -1?lastestElement : null }>
                            <div className="query">{convo.user}</div>
                            <div className="response">{convo.bot}</div>
                        </div>)
                        })}
                </div>
            <form onSubmit={handleSubmit} className="form-chat">
                <textarea className="form-textarea" onChange={(e)=>{setQuery(e.target.value)}}></textarea>
                <button className="form-btn"><GrSend /></button>
            </form>
        </div>
    )
}