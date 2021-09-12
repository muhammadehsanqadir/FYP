import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { constants } from '../../utils/constants';
import axios from 'axios';
import Footer from "../../components/Footer.js"

const newImage = {height: "150px", width: "200px"}

class UserSettings extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      error:"",
      name: "",
      email: "",
      password: "",
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

async add_request (){
    this.setState({
        saving: true,
    });
  
    this.saveOtherDetails();
}

async saveOtherDetails(){
    this.setState({
        loading: true
    });
    const URL = constants.SERVER_URL+"users/update_profile";

    var id = localStorage.getItem("user_id");
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            name: name,
            email: email,
            password: password
        })
    }; 

    const response = await fetch(URL, requestOptions);
    const data = await response.json();

    if(data.code === "success"){
       
        localStorage.setItem("user_name", this.state.name);
        localStorage.setItem("user_email", this.state.email);
        localStorage.setItem("user_password", this.state.password);

        this.setState({
            loading: false,
            response: data.message,
            name: "",
            email: "",
            password: "",
        });

    }
    else if(data.code === "error"){

        this.setState({
            response: data.message,
            loading: false
        });
    }
 
}


async loadDetails () {
    const user_id = localStorage.getItem("user_id");
    var name = localStorage.getItem("user_name");
    var email = localStorage.getItem("user_email");
    var password = localStorage.getItem("user_password");
    var type = localStorage.getItem("user_type");


    this.setState({
        name: name,
        email: email,
        password: password,
        type: type
    });

}

componentDidMount() {
    this.loadDetails();
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
                        <h1> Profile Settings</h1>
                    </div>
                    <div class="section-body">
                        

                        <div class="col-12 col-md-12 col-lg-12">
                            <div class="card">
                                 <form novalidate="true" onSubmit={this.submitForm} enctype="multipart/form-data">

                                    <div class="card-header">
                                    <h4>Update Settings</h4>
                                    </div>
                                    <div class="card-body">
                                    
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Name</label>
                                            <div class="col-sm-9">
                                            <input type="text" name="name" value={this.state.name} class="form-control" onChange={this.onChange}/>
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
                                            <label class="col-sm-3 col-form-label">Password</label>
                                            <div class="col-sm-9">
                                            <input type="text" name="password" value={this.state.password} class="form-control" onChange={this.onChange}/>
                                            <div class="invalid-feedback">
                                                Please Enter Password
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
                                        <button type="submit" class="btn btn-primary">Save Changes</button>
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
export default UserSettings;