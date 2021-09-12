import React from 'react';
import { constants } from '../../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import Footer from "../../components/Footer.js"

const zeroPpadding = {padding: "0%"};

class Payment extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      error: "",
      isPaid: false,
      name: "",
      number: "",
      expiry: "",
      cvc: "",

      total_amount: "0",
      requester_id: ""
    };
  }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    submitForm = (event) => {
        var name = this.state.name;
        var number = this.state.number;
        var expiry = this.state.expiry;
        var cvc = this.state.cvc;

        if( (name === "" || name === undefined) && (number === "" || number === undefined) && (expiry === "" || expiry === undefined) && (cvc === "" || cvc === undefined)  ){
            this.setState({
                error: "All fields are required"
            });
        }
        else {
            this.donate_money();
        }
        event.preventDefault();
    }

    async donate_money(){
        this.setState({
            loading: true
        });
        const URL = constants.SERVER_URL+"web/add_donation";
    
        var user_id = localStorage.getItem("user_id");;
        var amount = this.state.amount;

        var giver_id = user_id;
        var request_id = this.state.requester_id;
        var amount = this.state.total_amount;
    
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                giver_id: giver_id,
                request_id: request_id,
                amount: amount,
            })
        }; 
    
        const response = await fetch(URL, requestOptions);
        const data = await response.json();
    
        if(data.code === "success"){
           
            this.setState({
                loading: false,
                response: data.message,
                amount: "",
                isPaid: true
            });
    
        }
        else if(data.code === "error"){
    
            this.setState({
                response: data.message,
                loading: false
            });
        }
     
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
        if(this.state.isPaid){
			return <Redirect to="/"/>
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
                          <h1>Enter Payment Information</h1>
                        </div>
                        
                        <div class="row">
                        
                          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                            <div class="card">
                                <form novalidate="true" onSubmit={this.submitForm}>
                                    <div class="card-header">
                                    </div>
                                    <div class="card-body">

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Total Amount</label>
                                            <div class="col-sm-9">
                                                <input type="number" name="total_amount" value={this.state.total_amount} class="form-control" onChange={this.onChange}/>
                                            </div>
                                        </div>
                                            
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Name on Card</label>
                                            <div class="col-sm-9">
                                                <input type="name" name="name" value={this.state.name} class="form-control" onChange={this.onChange}/>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Card Number</label>
                                            <div class="col-sm-9">
                                                <input type="text" name="number" value={this.state.number} class="form-control" onChange={this.onChange}/>
                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <div className="col-sm-6">
                                                <label class="col-sm-3 col-form-label" style={{ color: "black" }}>Card Expiry</label>
                                                <div class="col-sm-9">
                                                    <input type="month" name="expiry" value={this.state.expiry} class="form-control" onChange={this.onChange}/>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <label class="col-sm-3 col-form-label" style={{ color: "black" }}>CVC</label>
                                                <div class="col-sm-9">
                                                    <input type="number" name="cvc" value={this.state.cvc} class="form-control" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            

                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label"></label>
                                            <div class="col-sm-9">
                                            <label class="col-sm-3 col-form-label" style={{ color: "red" }}>{this.state.error}</label>
                                            </div>
                                        </div>


                                    </div>

                                    <div class="card-footer text-right">
                                        <button type="submit" class="btn btn-success"><i className="fa fa-credit-card"></i>&ensp;Pay Now</button>
                                    </div>
                                </form>
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
export default Payment;