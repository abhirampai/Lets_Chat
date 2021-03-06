import { useState } from 'react'
import { sendMessage, isTyping } from 'react-chat-engine'
import { SendOutlined, PictureOutlined } from '@ant-design/icons'
const MessageForm = (props) => {
    const { chatId,creds } = props
    const [value,setValue] = useState('')
    const handleChange = (e) =>{

        setValue(e.target.value);
        isTyping(props, chatId)
    
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const text = value.trim();
        if(text.length>0) sendMessage(creds, chatId, { text });
        setValue('')
    }
    const handleUpload = (e) => {
        sendMessage(creds, chatId, {files: e.target.files, text: '' })
    }
    return (
        <div>
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
                className="message-input"
                placeholder="Send a Message ..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon"/>
                </span>
            </label>
            <input 
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none'}}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
        <div style={{textAlign:'center',marginTop:'5px'}}>
            <button className="w3-button w3-red w3-center w3-round-xxlarge" onClick={()=>{
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                window.location.reload();
            }}>
                Sign Out
            </button>
        </div>
        </div>
        )
}
export default MessageForm;