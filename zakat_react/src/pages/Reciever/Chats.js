import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import Footer from "../../components/Footer.js"

// import io  from "socket.io-client";
// var socket = io.connect(constants.SOCKET_URL);

import { socket } from '../../Service/Socket';

class Chats extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      success:false,
      error:"",
    
     user_type: "",

     recipients: [],
     messages: [],
     
     message: "",
     my_userid: "",

     current_chat_id: "",
     current_recipient_id: "",
     current_recipient_name: ""

     
    };


  }

    async getInbox (id){
        var arr = [];

        const URL = constants.SERVER_URL+"users/get_inbox/"+id;
        const response = await fetch(URL);
        const data = await response.json();

        for( var i=0; i < data.length; i++ ){
            
            if( id === data[i].user_one ){
                var request_obj = {
                    chat_id: data[i]._id,
                    recipient_id: data[i].user_two,
                    recipient_name: data[i].user_two_name,    
                };
            }
            else {
                var request_obj = {
                    chat_id: data[i]._id,
                    recipient_id: data[i].user_one,
                    recipient_name: data[i].user_one_name,    
                };
            }
            arr.push(request_obj);

        }

        if( arr.length > 0 ){
            this.setState({
                recipients: arr,
                current_chat_id: arr[0].chat_id,
                current_recipient_name: arr[0].recipient_name,
                current_recipient_id: arr[0].recipient_id,
            });
            this.getMessages(arr[0].chat_id);
        }
        else {
            this.setState({
                recipients: arr,
            });
        }



    }

    async getOnClickMessages (id, rec_name, rec_id, e){

    var arr = [];

    const my_id = localStorage.getItem("user_id");
    const my_name = localStorage.getItem("user_name");

    const URL = constants.SERVER_URL+"users/get_messages/"+id;
    const response = await fetch(URL);
    const data = await response.json();

    for( var i=0; i < data.length; i++ ){
        
        if( my_id === data[i].reciever ){
        var request_obj = {
            sender: data[i].sender,
            sender_name: this.state.current_recipient_name,
            reciever: my_id,
            reciever_name: my_name,
            message: data[i].message,
            status: data[i].status,
            class_name: "chat-left"
            };
        }
        else {
        var request_obj = {
            reciever: data[i].sender,
            reciever_name: this.state.current_recipient_name,
            sender: my_id,
            sender_name: my_name,
            message: data[i].message,
            status: data[i].status,
            class_name: "chat-right"
            };
        }
        arr.push(request_obj);

    }


    this.setState({
        messages: arr,
        current_chat_id: id,
        current_recipient_id: rec_id,
        current_recipient_name: rec_name,
    });

    }

    async getMessages (id){

    var arr = [];

    const my_id = localStorage.getItem("user_id");
    const my_name = localStorage.getItem("user_name");

    const URL = constants.SERVER_URL+"users/get_messages/"+id;
    const response = await fetch(URL);
    const data = await response.json();

    for( var i=0; i < data.length; i++ ){
        
        if( my_id === data[i].reciever ){
        var request_obj = {
            sender: data[i].sender,
            sender_name: this.state.current_recipient_name,
            reciever: my_id,
            reciever_name: my_name,
            message: data[i].message,
            status: data[i].status,
            class_name: "chat-left"
            };
        }
        else {
        var request_obj = {
            reciever: data[i].sender,
            reciever_name: this.state.current_recipient_name,
            sender: my_id,
            sender_name: my_name,
            message: data[i].message,
            status: data[i].status,
            class_name: "chat-right"
            };
        }
        arr.push(request_obj);

    }

    this.setState({
        messages: arr,
    });

    }

    async sendMessage(e){
        this.setState({
            loading: true
        });
        const URL = constants.SERVER_URL+"users/add_message";

        const sender_id = localStorage.getItem("user_id");
        const reciever_id = this.state.current_recipient_id;
        var message = this.state.message;
        var chat_id = this.state.current_chat_id;


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                sender_id: sender_id,
                reciever_id: reciever_id,
                msg: message
            })
        }; 

        const response = await fetch(URL, requestOptions);
        const data = await response.json();

        if(data.code === "success"){
            socket.emit("new_message", "");
            this.setState({
                loading: false,
                message: ""
            });

            this.getMessages(chat_id);

        }
        else if(data.code === "error"){

            this.setState({
                response: data.message,
                loading: false
            });
        }

    }

    valueChange = (event) => {
        if(event.target.value === ""){
        this.setState({error: "Please Enter Value"});
        }
        else{
        this.setState({error: ""});
        }
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {

        socket.on("got_new_message", data => {
			this.getMessages(this.state.current_chat_id);
		});

        const my_id = localStorage.getItem("user_id");
        this.setState({
            my_userid: my_id
        });
        this.getInbox(my_id);   
    }

	render(){
      return(
        <div>
        <Header/>
            <Switch>
            <div class="main-content">
                <section class="section">
                <div class="section-header">
                    <h1>Chat</h1>
                </div>
                <div class="section-body">
                    <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                        <div class="card">
                        <div class="body">
                            <div id="plist" class="people-list">
                            <div class="chat-search">
                                {/* <input type="text" class="form-control" placeholder="Search..." /> */}
                                <h4 style={{ color: "black" }}>Inbox</h4>
                                <hr/>
                            </div>
                            <div class="m-b-20">
                                <div id="chat-scroll">
                                <ul class="chat-list list-unstyled m-b-0">
                                    {this.state.recipients.map(item =>
                                        <li className="clearfix" style={{ padding: "5%", borderBottom: "1px solid lightgrey" }} onClick={this.getOnClickMessages.bind(this, item.chat_id, item.recipient_name, item.recipient_id)}>
                                            <img src="https://i.imgur.com/ZgBPUDU.png" alt="avatar" />
                                            <div class="about">
                                                <div class="name">
                                                    <b>{ item.recipient_name }</b>
                                                </div>
                                                <div class="status">
                                                    <i class="material-icons offline">fiber_manual_record</i>
                                                    Online
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
                        <div class="card">
                        <div class="chat">
                            <div class="chat-header clearfix">
                                <img src="https://i.imgur.com/ZgBPUDU.png" alt="avatar" />
                                <div class="chat-about">
                                    <div class="chat-with"> { this.state.current_recipient_name } </div>
                                    <div class="chat-num-messages">
                                        <i class="material-icons online">fiber_manual_record</i>
                                        Online
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="chat-box" id="mychatbox">
                            <div class="card-body chat-content" style={{ overflow: "auto", outline: "none" }}>

                            { this.state.messages.map(item =>

                                <div className={"chat-item "+item.class_name} >
                                    <img src="https://i.imgur.com/ZgBPUDU.png" alt="avatar" />
                                    <div class="chat-details">
                                        <div class="chat-time" style={{ color: "black" }}> <b>{item.sender_name}</b> </div>
                                        <div class="chat-text">{item.message}</div>
                                        {/* <div class="chat-time">08:07</div> */}
                                    </div>
                                </div>
                                
                            )}
                                
                                {/* <div class="chat-item chat-left" >
                                    <div class="chat-details">
                                        <div class="chat-text">Hi, How are you?!</div>
                                        <div class="chat-time">08:07</div>
                                    </div>
                                </div>

                                <div class="chat-item chat-right" >
                                    <div class="chat-details">
                                        <div class="chat-text">Hi, I am fine!</div>
                                        <div class="chat-time">08:07</div>
                                    </div>
                                </div> */}


                            </div>
                            <div class="card-footer chat-form">
                            <div id="chat-form">
                                <input type="text" class="form-control" name="message" value={this.state.message} placeholder="Type a message" onChange={this.valueChange}/>
                                <button type="button" class="btn btn-primary" onClick={this.sendMessage.bind(this)}>
                                <i class="far fa-paper-plane"></i>
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
            </Switch>
            <Footer />
        </div>
        )
  }

}
export default Chats;