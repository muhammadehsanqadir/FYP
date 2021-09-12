import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { DataTable} from "mdbreact";
import Footer from "../../components/Footer.js";

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


const user_cols = [
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
    label: 'Type',
    field: 'type',
    sort: 'asc',
    width: 150
},
];

const request_cols = [
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
];


export default class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: true,
          success:false,
          error:"",
          
          requests: [],
          users: [],

          total_requests: 0,
          total_recievers: "...",
          total_givers: "..."
        };

    }

    Capitalize(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async getData() {

        var user_arr = [];
        var request_arr = [];

        const URL = constants.SERVER_URL+"admin/";
        const response = await fetch(URL);
        const data = await response.json();

        const giver_ref = data[0];
        const reciever_ref = data[1];
        const request_ref = data[2];

        // alert("Givers: "+giver_ref.length+"\nRecievers: "+reciever_ref.length);

        for( var i=0; i < giver_ref.length; i++ ){

            var user_obj = {
              name: giver_ref[i].name,
              contact: giver_ref[i].contact,
              email: giver_ref[i].email,
              address: giver_ref[i].address,
              type: this.Capitalize(giver_ref[i].type),
          };
          user_arr.push(user_obj);

        }

        for( var i=0; i < reciever_ref.length; i++ ){

            var user_obj = {
              name: reciever_ref[i].name,
              contact: reciever_ref[i].contact,
              email: reciever_ref[i].email,
              address: reciever_ref[i].address,
              type: this.Capitalize(reciever_ref[i].type),
          };
          user_arr.push(user_obj);

        }

        for( var i=0; i < request_ref.length; i++ ){

          var request_obj = {
            name: request_ref[i].user_name,
            contact: request_ref[i].user_contact,
            amount: request_ref[i].amount,
            address: request_ref[i].user_address,
          };
          request_arr.push(request_obj);

      }

        this.setState({
          users: user_arr,
          requests: request_arr,
          total_recievers: reciever_ref.length,
          total_givers: giver_ref.length,
          total_requests: request_ref.length
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
      const user_data = {
          columns: user_cols,
          rows: this.state.users
      }
      const request_data = {
        columns: request_cols,
        rows: this.state.requests
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
                          <h1>Dashboard</h1>
                        </div>
                        <div class="row">

                          <div class="col-xl-4 col-lg-6">
                            <Link to="/" style={decoration}>
                              <div class="card">
                                <div class="card-body card-type-3" style={fivePpadding}>
                                  <div class="row">
                                    <div class="col-auto">
                                        <div class="card-circle text-white" style={bgColor}>
                                          <i class="fas fa-user" style={bgColor01}></i>
                                        </div>
                                    </div>
                                    <div class="col">
                                      <b style={bgColor001}>
                                        <p class="font-weight-bold mb-0">Total Givers</p>
                                      </b>
                                      <span class="font-weight-bold mb-0" style={blackColor}>{ this.state.total_givers }</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>

                          <div class="col-xl-4 col-lg-6">
                            <Link to="/" style={decoration}>
                              <div class="card">
                                <div class="card-body card-type-3" style={fivePpadding}>
                                  <div class="row">
                                    <div class="col-auto">
                                        <div class="card-circle text-white" style={bgColor2}>
                                            <i class="fas fa-dollar-sign" style={bgColor02}></i>
                                        </div>
                                    </div>
                                    <div class="col">
                                      <b style={bgColor002}>
                                        <p class="font-weight-bold mb-0">Total Recievers</p>
                                      </b>
                                      <span class="font-weight-bold mb-0" style={blackColor}>{ this.state.total_recievers }</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div> 

                          <div class="col-xl-4 col-lg-6">
                            <Link to="/" style={decoration}>
                              <div class="card">
                                <div class="card-body card-type-3" style={fivePpadding}>
                                  <div class="row">
                                    <div class="col-auto">
                                        <div class="card-circle text-white" style={bgColor3}>
                                            <i class="fas fa-edit" style={bgColor03}></i>
                                        </div>
                                    </div>
                                    <div class="col">
                                      <b style={bgColor003}>
                                        <p class="font-weight-bold mb-0">Total Requests</p>
                                      </b>
                                      <span class="font-weight-bold mb-0" style={blackColor}>{ this.state.total_requests }</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>

                        </div>
                        
                        <div class="row">
                        
                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
                            <div class="card">
                              <div class="card-header">
                                <h4 style={colorBlack}>All Users</h4>
                              </div>
                              <div class="card-body">
                                
                                <div class="table-responsive">
                                  <DataTable striped bordered hover data={user_data} />
                                </div>
                                
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6">
                            <div class="card">
                              <div class="card-header">
                                <h4 style={colorBlack}>Recent Requests</h4>
                              </div>
                              <div class="card-body" >
                                
                                <div class="table-responsive">
                                    <DataTable striped bordered hover data={request_data} />
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