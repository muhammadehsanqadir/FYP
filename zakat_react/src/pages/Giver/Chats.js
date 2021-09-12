import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { DataTable} from "mdbreact";

import Giver from '../Dashboards/Giver_Dashboard';
import Reciever from '../Dashboards/Reciever_Dashboard';
import Admin from '../Dashboards/Admin_Dashboard';
import Footer from "../../components/Footer.js"
import Footer from "../../components/Footer.js"


class Chats extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      success:false,
      error:"",
    
     user_type: ""

     
    };


  }

  componentDidMount() {
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
                            </div>
                            <div class="m-b-20">
                                <div id="chat-scroll">
                                <ul class="chat-list list-unstyled m-b-0">
                                    <li class="clearfix active">
                                    {/* <img src="/assets/img/users/user-4.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">William Smith</div>
                                        <div class="status">
                                        <i class="material-icons offline">fiber_manual_record</i>
                                        left 7 mins ago </div>
                                    </div>
                                    </li>
                                    <li class="clearfix ">
                                    {/* <img src="assets/img/users/user-1.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">Martha Williams</div>
                                        <div class="status">
                                        <i class="material-icons offline">fiber_manual_record</i>
                                        online </div>
                                    </div>
                                    </li>
                                    <li class="clearfix">
                                    {/* <img src="assets/img/users/user-2.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">Joseph Clark</div>
                                        <div class="status">
                                        <i class="material-icons online">fiber_manual_record</i>
                                        online </div>
                                    </div>
                                    </li>
                                    <li class="clearfix">
                                    {/* <img src="assets/img/users/user-3.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">Nancy Taylor</div>
                                        <div class="status">
                                        <i class="material-icons online">fiber_manual_record</i>
                                        online </div>
                                    </div>
                                    </li>
                                    <li class="clearfix">
                                    {/* <img src="assets/img/users/user-4.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">Margaret Wilson</div>
                                        <div class="status">
                                        <i class="material-icons online">fiber_manual_record</i>
                                        online </div>
                                    </div>
                                    </li>
                                    <li class="clearfix">
                                    {/* <img src="assets/img/users/user-5.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">Joseph Jones</div>
                                        <div class="status">
                                        <i class="material-icons offline">fiber_manual_record</i>
                                        left 30 mins ago </div>
                                    </div>
                                    </li>
                                    <li class="clearfix">
                                    {/* <img src="assets/img/users/user-1.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">Jane Brown</div>
                                        <div class="status">
                                        <i class="material-icons offline">fiber_manual_record</i>
                                        left 10 hours ago </div>
                                    </div>
                                    </li>
                                    <li class="clearfix">
                                    {/* <img src="assets/img/users/user-2.png" alt="avatar" /> */}
                                    <div class="about">
                                        <div class="name">Eliza Johnson</div>
                                        <div class="status">
                                        <i class="material-icons online">fiber_manual_record</i>
                                        online </div>
                                    </div>
                                    </li>
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
                            {/* <img src="assets/img/users/user-1.png" alt="avatar" /> */}
                            <div class="chat-about">
                                <div class="chat-with">Maria Smith</div>
                                <div class="chat-num-messages">2 new messages</div>
                            </div>
                            </div>
                        </div>
                        <div class="chat-box" id="mychatbox">
                            <div class="card-body chat-content">
                                
                                <div class="chat-item chat-left" >
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
                                </div>


                            </div>
                            <div class="card-footer chat-form">
                            <form id="chat-form">
                                <input type="text" class="form-control" placeholder="Type a message" />
                                <button type="button" class="btn btn-primary">
                                <i class="far fa-paper-plane"></i>
                                </button>
                            </form>
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