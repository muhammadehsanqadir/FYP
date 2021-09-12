import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { DataTable} from "mdbreact";
import Footer from "../../components/Footer.js"

const colorBlack = {color:"black"};
const zeroPpadding = {padding: "0%"};


const contact_cols = [
    {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Message',
        field: 'msg',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Type',
        field: 'user',
        sort: 'asc',
        width: 150
    }
];

class ContactMessages extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      success:false,
      error:"",
     
    };


  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  async getMessages() {

    var arr = [];
    const URL = constants.SERVER_URL+"web/all_contact";
    const response = await fetch(URL);
    const data = await response.json();

    for( var i=0; i < data.length; i++ ){

        var name = data[i].name;
        var email = data[i].email;
        var msg = data[i].msg;
        var user = data[i].user;

        var obj = {
            name: name,
            email: email,
            msg: msg,
            user: this.Capitalize(user),
        };
        arr.push(obj);

    }

    this.setState({
      requests: arr
    });

  }
  componentDidMount() {
    this.getMessages();
  }


	render(){
        if(this.state.inboxCreated){
            return <Redirect to="/chats"/>
        }
        const all_messages = {
            columns: contact_cols,
            rows: this.state.requests
        }
        
            return(
                <div>
                <Header/>
                    <Switch>
                    {this.state.isOpen && (
                        <div class="main-content">
                        <div class="row">
                            <div class="col-12">
                            <section class="section">
                                <div class="section-body">
                                <div class="row">
                                    <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <dialog
                                                className="dialog"
                                                open
                                                onClick={this.handleShowDialog}
                                                >
                                                </dialog>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </section>
                            </div>
                        </div>
                        </div>
                    )}
                    <div class="main-content">
                        <div class="row">

                            <div class="col-12">
                                <section class="section">
                                <div class="section-header">
                                    <h1>All Messages</h1>
                                </div>
                                
                                <div class="row">
                                
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                                    <div class="card">
                                        <div class="card-header">
                                        <h4 style={colorBlack}>Message List</h4>
                                        </div>
                                        <div class="card-body">
                                        
                                        <div class="table-responsive">
                                            <DataTable striped bordered hover data={all_messages} style={{ color: "black" }}/>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>

                                </div>
                                <div class="section-body">
                                    <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                        <div class="card-body" style={zeroPpadding}>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </section>
                            </div>

                            
                        </div>

                    </div>

                    </Switch>
                    <Footer />
                </div>
            )
        }
	}
export default ContactMessages;