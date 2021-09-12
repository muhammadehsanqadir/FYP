import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { DataTable} from "mdbreact";
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


const giver_cols = [
  {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
  },
  {
      label: 'Contact Number.',
      field: 'contact',
      sort: 'asc',
      width: 150
  },
  {
      label: 'Email',
      field: 'email',
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
    label: 'Action',
    field: 'action',
    sort: 'asc',
    width: 150
  },
];

const reciever_cols = [
  {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
  },
  {
      label: 'Contact Number.',
      field: 'contact',
      sort: 'asc',
      width: 150
  },
  {
      label: 'Email',
      field: 'email',
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

class Users extends React.Component{

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

     
    };


  }


  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async updateStatus (para, e) {
    // alert("Status: "+para.status+"\nID: "+para.id);
    const URL = constants.SERVER_URL+"users/update_status";
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

    // alert(data.message);
    this.getData();


  }

  async getData() {

    var givers_arr = [];
    var recievers_arr = [];

    const URL = constants.SERVER_URL+"admin/users";
    const response = await fetch(URL);
    const data = await response.json();

    const giver_ref = data[0];
    const reciever_ref = data[1];

    for( var i=0; i < giver_ref.length; i++ ){

      var givers_obj = {
          name: giver_ref[i].name,
          contact: giver_ref[i].contact,
          email: giver_ref[i].email,
          address: giver_ref[i].address,
          action: this.Capitalize(giver_ref[i].status),
      };
    givers_arr.push(givers_obj);

  }

  for( var i=0; i < reciever_ref.length; i++ ){

    var accept_parameter = {
      id: reciever_ref[i]._id,
      status: "active"
    };
    var reject_parameter = {
      id: reciever_ref[i]._id,
      status: "banned"
    };

    var check = <button className="btn btn-info" onClick={ this.updateStatus.bind(this, accept_parameter) }>
      <i class="fa fa-check" style={{ color: "green" }}></i>
    </button>
    var reject = <button className="btn btn-info" onClick={ this.updateStatus.bind(this, reject_parameter) }>
      <i class="fa fa-ban" style={{ color: "red" }}></i>
    </button>
    var actionGrid = <div class="grid-container">
        <div class="grid-item">
          {check} &ensp;&ensp; {reject}
        </div>
      </div>;

    var recievers_obj = {
      name: reciever_ref[i].name,
      contact: reciever_ref[i].contact,
      email: reciever_ref[i].email,
      address: reciever_ref[i].address,
      status: this.Capitalize(reciever_ref[i].status),
      action: actionGrid,
    }; 
    recievers_arr.push(recievers_obj);

  }


    this.setState({
      givers: givers_arr,
      recievers: recievers_arr,
    });

  }



componentDidMount() {
   this.getData();
}


	render(){
    // if(!this.state.isLoggedIn){
		// 	return <Redirect to="/auth"/>
		// }
		// else{
      const giver_data = {
          columns: giver_cols,
          rows: this.state.givers
      }

      const reciever_data = {
        columns: reciever_cols,
        rows: this.state.recievers
    }
     
      return(
        <div>
        <Header/>
            <Switch>
            <div class="main-content">
                <div class="row">

                  <div class="col-12">
                      <section class="section">
                        <div class="section-header">
                          <h1>All Givers</h1>
                        </div>
                        
                        <div class="row">
                        
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                            <div class="card">
                              <div class="card-header">
                                <h4 style={colorBlack}>Givers List</h4>
                              </div>
                              <div class="card-body">
                                
                                <div class="table-responsive">
                                  <DataTable striped bordered hover data={giver_data} style={{ color: "black" }}/>
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


                  <div class="col-12">
                      <section class="section">
                        <div class="section-header">
                          <h1>All Recievers</h1>
                        </div>
                        
                        <div class="row">
                        
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                            <div class="card">
                              <div class="card-header">
                                <h4 style={colorBlack}>Recievers List</h4>
                              </div>
                              <div class="card-body">
                                
                                <div class="table-responsive">
                                  <DataTable striped bordered hover data={reciever_data} style={{ color: "black" }}/>
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
export default Users;