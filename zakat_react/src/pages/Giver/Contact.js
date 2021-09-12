import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { constants } from '../../utils/constants';
import axios from 'axios';
import Footer from "../../components/Footer.js"

const newImage = {height: "150px", width: "200px"}

class Contact extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      error:"",
      name: "",
      email: "",
      message: "",
      response:"",
      image: ""
    };
  }
onChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    });
}

submitForm = (event) => {
    this.add_request();
    event.preventDefault();
}

async add_request (image_url){
    this.setState({
        saving: true,
      });

      this.saveOtherDetails();
}

async saveOtherDetails(){
    this.setState({
        loading: true
    });
    const URL = constants.SERVER_URL+"web/contact";

    const user_id = localStorage.getItem("user_id");
    const type = localStorage.getItem("user_type");
    const name = this.state.name;
    const email = this.state.email;
    const message = this.state.message;


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: user_id,
            name: name,
            email: email,
            message: message,
            type: type
        })
    }; 

    const response = await fetch(URL, requestOptions);
    const data = await response.json();

    if(data.code === "success"){
       
        this.setState({
            loading: false,
            response: data.message,
            name: "",
            email: "",
            message: ""
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
}


	render(){
      return(
        <div>
            <Header/>
            <Switch>
            <div>
                <div class="main-content">
                <section class="section">
                    <div class="section-header">
                        <h1> Add New Request</h1>
                    </div>
                    <div class="section-body">
                        

                        <div class="col-12 col-md-12 col-lg-12">
                            <div class="card">
                                 <form novalidate="true" onSubmit={this.submitForm} enctype="multipart/form-data">

                                    <div class="card-header">
                                    <h4>Request Details</h4>
                                    </div>
                                    <div class="card-body">
                                    
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Name</label>
                                            <div class="col-sm-9">
                                            <input type="name" name="name" value={this.state.name} class="form-control" onChange={this.onChange}/>
                                            <div class="invalid-feedback">
                                                Please Enter Name
                                            </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Email</label>
                                            <div class="col-sm-9">
                                            <input type="email" name="email" value={this.state.email} class="form-control" onChange={this.onChange}/>
                                            <div class="invalid-feedback">
                                                Please Enter Email
                                            </div>
                                            </div>
                                        </div>


                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Message</label>
                                            <div class="col-sm-9">
                                            <input type="text" name="message" value={this.state.message} class="form-control" onChange={this.onChange}/>
                                            <div class="invalid-feedback">
                                                Please Enter Message
                                            </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label"></label>
                                            <div class="col-sm-9">
                                            <label class="col-sm-3 col-form-label" style={{ color: "black" }}>{this.state.response}</label>
                                            </div>
                                        </div>


                                    </div>


                                    <div class="card-footer text-right">
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                    </form>
                            </div>
                        </div>


                    </div>
                    </section>
                </div>
            </div>

            </Switch>
            <Footer />
        </div>
        )
    }
}
export default Contact;