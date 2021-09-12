import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { DataTable} from "mdbreact";
import Footer from '../../components/Footer.js';


const blackColor = {color: "black", fontSize: "20px"};
const colorBlack = {color:"black"};
const bgColor    = {background: "#d5dcfc"};
const bgColor01  = {color: "#2c51ee"};
const bgColor001 = {color: "#2c51ee", fontSize: "12px"};
const zeroPpadding = {padding: "0%"};

const decoration = {textDecoration: 'none'};


const zakat_cols = [
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
      width: 150
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'asc',
    width: 100
  },
];


export default class Giver extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        isLoggedIn: true,
        success:false,
        error:"",
        
        zakat: [],
        total_zakat: 0,

        
        };


    }

    async getData() {

        const user_id = localStorage.getItem("user_id");
        const URL = constants.SERVER_URL+"web/donation_history/"+user_id;
        const response = await fetch(URL);
        const data = await response.json();

        var history_ref = data[0];
        var zakat_arr = [];
        var total_amount = 0;

        for( var i = 0; i < data.length; i++ ){
          var user_obj = {
            name: history_ref.reciever_name,
            contact: history_ref.reciever_contact,
            email: history_ref.reciever_email,
            amount: history_ref.amount,
          };
          total_amount = total_amount + parseInt(history_ref.amount);
          zakat_arr.push(user_obj);
        }

        this.setState({
          zakat: zakat_arr,
          total_zakat: total_amount
        });

    }

    componentDidMount() {
      this.getData();
    }

	  render(){
   
      const zakat_data = {
        columns: zakat_cols,
        rows: this.state.zakat
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

                          <div class="col-xl-12 col-lg-12">
                            <Link to="/" style={decoration}>
                              <div class="card">
                                <div class="card-body card-type-3">
                                  <div class="row">
                                    <div class="col-auto">
                                        <div class="card-circle text-white" style={bgColor}>
                                          <i class="fas fa-user" style={bgColor01}></i>
                                        </div>
                                    </div>
                                    <div class="col">
                                      <b style={bgColor001}>
                                        <p class="font-weight-bold mb-0">Total Zakat Donated</p>
                                      </b>
                                      <span class="font-weight-bold mb-0" style={blackColor}> PKR {this.state.total_zakat}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>

                        </div>
                        
                        <div class="row">
                        
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                            <div class="card">
                              <div class="card-header">
                                <h4 style={colorBlack}>Zakar History</h4>
                              </div>
                              <div class="card-body">
                                
                                <div class="table-responsive">
                                  <DataTable striped bordered hover data={zakat_data} />
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
