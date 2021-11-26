import React from 'react';
import './AccessDenied.css'

const Message = (props) => (
    <div style={{ background: "white", borderRadius: '5px', padding: '0 10px', width:"30%", marginLeft:"35%"}}>
        <p style={{color:'black'}}><strong>{props.user}</strong> says:</p>
        <p style={{color:'black'}}>{props.message}</p>
    </div>
);

export default Message;