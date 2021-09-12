import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { DataTable} from "mdbreact";
import ImageComponent from "../../components/ImageComponent";
import Footer from "../../components/Footer.js"


const blackColor = {color: "black", fontSize: "20px"};
const colorBlack = {color:"black"};
const bgColor    = {background: "#d5dcfc"};
const bgColor01  = {color: "#2c51ee"};
const bgColor001 = {color: "#2c51ee", fontSize: "12px"};

const bgColor2   = {background: "#D1F4E8"};
const bgColor02  = {color: "#1CC78D"};
const bgColor002 = {color: "#1CC78D", fontSize: "12px"};

const bgColor3   = {background: "#FCD3D5"};
const bgColor03  = {color: "#F0202D"};
const bgColor003 = {color: "#F0202D", fontSize: "12px"};

const fivePpadding = {padding: "5%"};
const onePpadding = {padding: "1%"};
const zeroPpadding = {padding: "0%"};

const decoration = {textDecoration: 'none'};


const request_cols = [
    {
      label: 'Image',
      field: 'image',
      sort: 'asc',
      width: 150
    },
    {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Contact Number',
        field: 'contact',
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
        label: 'Amount',
        field: 'amount',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 150
    },
    {
      label: 'Reason',
      field: 'reason',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 150
    },
    {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 150
    },
];

class Request extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      success:false,
      error:"",
    
      requests: [],
      users: [],

      total_requests: 0,
      total_users: 0,
      total_zakat: 0,

      inboxCreated: false,
      isOpen: false,

      current_image: ""

     
    };


  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async updateStatus (para, e) {
    
    const URL = constants.SERVER_URL+"admin/update_request";
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: para.id,
          status: para.status,
        })
    }; 

    const response = await fetch(URL, requestOptions);
    const data = await response.json();

    this.adminData();


  }

  async adminData() {

    var arr = [];
    const URL = constants.SERVER_URL+"web/admin_requests";
    const response = await fetch(URL);
    const data = await response.json();

    for( var i=0; i < data.length; i++ ){

      var accept_parameter = {
        id: data[i]._id,
        status: "accept"
      };
      var reject_parameter = {
        id: data[i]._id,
        status: "reject"
      };

      var check = <button className="btn btn-info" onClick={ this.updateStatus.bind(this, accept_parameter) }>
        <i class="fa fa-check" style={{ color: "green" }}></i>
      </button>
      var reject = <button className="btn btn-info" onClick={ this.updateStatus.bind(this, reject_parameter) }>
        <i class="fa fa-ban" style={{ color: "red" }}></i>
      </button>
      var adminActionGrid = <div class="grid-container">
        <div class="grid-item">
          {check} &ensp;&ensp; {reject}
        </div>
      </div>;

      var image = <img src={ data[i].image } alt={data[i].reason} style={{ width: "80px", height: "80px" }}/>

      if( data[i].status === "pending"){
        var adminActionGrid = <div class="grid-container">
              <div class="grid-item">
                {check} &ensp;&ensp; {reject}
              </div>
            </div>;
      }
      else if( data[i].status === "accept"){
        var adminActionGrid = <div class="grid-container">
              <div class="grid-item">
                {reject}
              </div>
            </div>;
      }else if( data[i].status === "reject"){
        var adminActionGrid = <div class="grid-container">
              <div class="grid-item">
                {check}
              </div>
            </div>;
      }

      var request_obj = {
        image: image,
        name: data[i].user_name,    
        email: data[i].user_email,
        contact: data[i].user_contact,
        address: data[i].user_address,
        amount: data[i].amount,
        reason: data[i].reason,
        status: this.Capitalize(data[i].status)+"ed",
        action: adminActionGrid,
      };
      arr.push(request_obj);

    }



    this.setState({
      requests: arr,
    });

  }

  handleShowDialog = (image, e) => {
    this.setState({ isOpen: !this.state.isOpen, current_image: image });
  };

  async otherData() {

    var arr = [];

    const URL = constants.SERVER_URL+"web/requests";
    const response = await fetch(URL);
    const data = await response.json();

    for( var i=0; i < data.length; i++ ){

      var chat = <button className="btn btn-info" onClick={this.createInbox.bind(this, data[i].requester, data[i].user_name)}>
        <i class="fa fa-comment" ></i>
      </button>
      var donate = <Link to={"/payment-method/"+data[i].amount+"/"+data[i]._id} className="btn btn-info">
        <i class="fa fa-dollar-sign"></i>
      </Link>
      var actionGrid = <div class="grid-container">
          <div class="grid-item">
            {chat} &ensp;&ensp; {donate}
          </div>
        </div>;

    var image = <img src={ data[i].image } alt={data[i].reason} style={{ width: "80px", height: "80px" }} onClick={this.handleShowDialog.bind(this,data[i].image)}/>

     
      var request_obj = {
        image: image,
        name: data[i].user_name,    
        email: data[i].user_email,
        requester: data[i].requester,
        contact: data[i].user_contact,
        address: data[i].user_address,
        amount: data[i].amount,
        reason: data[i].reason,
        status: this.Capitalize(data[i].status)+"ed",
        action: actionGrid,
      };
      arr.push(request_obj);

    }



    this.setState({
      requests: arr,
    });

  }

  async createInbox(id, name, e) {

    const my_id = localStorage.getItem("user_id");
    const my_name = localStorage.getItem("user_name");

    const URL = constants.SERVER_URL+"users/create_inbox/"+my_id+"/"+my_name+"/"+id+"/"+name;
    const response = await fetch(URL);
    const data = await response.json();

    if( data.code === "success" ){
      this.setState({
        inboxCreated: true
      });
    }

  }



  componentDidMount() {
    const user_type = localStorage.getItem("user_type");
    if( user_type === "admin" ){
      this.adminData();
    }
    else {
      this.otherData();
    }
  }


	render(){
    if(this.state.inboxCreated){
			return <Redirect to="/chats"/>
		}
		// else{
      const request_data = {
          columns: request_cols,
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
                                        <img
                                          className="image"
                                          src={ this.state.current_image }
                                          onClick={this.handleShowDialog}
                                          alt="no image"
                                        />
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
                          <h1>All Requests</h1>
                        </div>
                        
                        <div class="row">
                        
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                            <div class="card">
                              <div class="card-header">
                                <h4 style={colorBlack}>Requests List</h4>
                              </div>
                              <div class="card-body">
                                
                                <div class="table-responsive">
                                  <DataTable striped bordered hover data={request_data} style={{ color: "black" }}/>
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
export default Request;