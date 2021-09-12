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


class PaymentMethod extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      total_amount: 0,
      requester_id: ""
    };
  }

  componentDidMount() {
      const { match: { params } } = this.props;
      var amount = params.amount;
      var id = params.id;
      this.setState({
          total_amount: amount,
          requester_id: id
      });
  }


	render(){
    // if(!this.state.isLoggedIn){
		// 	return <Redirect to="/auth"/>
		// }
		// else{
     
      return(
        <div>
        <Header/>
            <Switch>
            <div class="main-content">
                <div class="row">

                  <div class="col-12">
                      <section class="section">
                        <div class="section-header">
                          <h1>Choose Payment Method</h1>
                        </div>
                        
                        <div class="row">
                        
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                            <div class="card">
                              <div class="card-header">
                              </div>
                              <div class="card-body">
                                
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-4">
                                        <Link to={"/payment/"+this.state.total_amount+"/"+this.state.requester_id}>
                                          <img src="/assets/img/payments/easypaisa.png" alt="" style={{ width: "335px", height: "150px" }}/>
                                        </Link>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-4">
                                      <Link to={"/payment/"+this.state.total_amount+"/"+this.state.requester_id}>
                                        <img src="/assets/img/payments/jazzcash.jpg" alt="" style={{ width: "335px", height: "150px" }}/>
                                      </Link>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-4">
                                      <Link to={"/payment/"+this.state.total_amount+"/"+this.state.requester_id}>
                                        <img src="/assets/img/payments/stripe.jpg" alt="" style={{ width: "335px", height: "150px" }}/>
                                      </Link>
                                    </div>

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
export default PaymentMethod;