import React from 'react';
import "./css/login_style.css";
import { constants } from '../utils/constants';

import { Link, Redirect } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";

const login_btn = {
    background: "#fff",
    color: "#2f55d4",
    textDecoration: "none",
    padding: "0px 30px",
    textAlign: "center",
    fontSize: "16px",
    display: "inline-block",
    width: "100%",
    height:"50px",
    lineHeight: "45px",
    marginTop: "30px",
    border: "none",
};

const override = {
    display: "block",
    borderColor: "red",
    margin: "10%"
};


class Verification extends React.Component{

    constructor(props) {
		super(props);
		this.state = {
            isLoggedIn: false,
            email:"",
            otp:"",
            error: "",
            loading: false
        };
       
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    submitForm = (event) => {
        this.verifyOTP();
        event.preventDefault();
    }
    
    async verifyOTP(){
        this.setState({
            loading: true
        });
        const URL = constants.SERVER_URL+"users/verify_otp";

        var email = this.state.email;
        var otp = this.state.otp;

        if( (email === undefined || email === "") && (otp === undefined || otp === "") ){
            this.setState({
                error: "All fields are required",
                loading: false
            });
        }
        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: email,
                  otp: otp,
                })
            }; 
    
            const response = await fetch(URL, requestOptions);
            const data = await response.json();
    
            if(data[0].code === "success" && data[0].status === "active"){
               
                var token = data[0].token;
                localStorage.setItem("token", token);
                localStorage.setItem("user_id", data[0].id);
                localStorage.setItem("user_name", data[0].name);
                localStorage.setItem("user_type", data[0].type);
                this.setState({
                    isLoggedIn: true,
                    loading: false
                });
    
            }
            else if(data[0].code === "success" && data[0].status === "pending"){
               
                this.setState({
                    error: "Your profile is under review",
                    loading: false
                });
    
            }
            else if(data[0].code === "success" && data[0].status === "unverified"){
               
                this.setState({
                    error: "Please verify your account",
                    loading: false
                });
    
            }
            else if(data[0].code === "success" && data[0].status === "banned"){
               
                this.setState({
                    error: "Your profile is banned",
                    loading: false
                });
    
            }
            else if(data[0].code === "error"){
    
                this.setState({
                    error: data[0].message,
                    loading: false
                });
            }
        }

     
	}

    componentDidMount(){
        const email = localStorage.getItem("user_email");
        this.setState({
            email: email
        });
    }

    render(){

        if(this.state.isLoggedIn){
			return <Redirect to="/"/>
		}

        return(
            <div>
                <section class="w3l-login-6">
                    <div class="login-hny">
                    <div class="form-content">
                        <div class="form-right" style={{ background: "url('./assets/img/login_poster.png') no-repeat center" }}>
                        <div class="overlay">
                            <div class="grid-info-form" style={{ width: "100%" }}>
                            <div style={{ marginLeft: "40%", marginTop: "20%" }}>
                                <div class="row">
                                <div class="col-12">
                                    <img src="/assets/img/logo_black.png" style={{ float: "left", marginLeft: "5%" }} alt="" />
                                </div>
                                <div class="col-12">
                                    <div style={{ fontSize: "40px", float: "left", textAlign: "start", marginLeft: "5%", fontWeight: "bold" }}>
                                    <f style={{ color: "#0a4850" }}>Transparent</f> <f style={{ color: "#2f55d4" }}>Zakat Distribution.</f>
                                    <br/>
                                    </div>
                                </div>
                                </div>
                            
                            </div>
                            </div>
                        
                        </div>
                        </div>
                        <div class="form-left" style={{ background: "#2f55d4" }}>
                            <div class="middle">
                                <h4 style={{ color: "white" }}>Verification</h4>
                                <p style={{ color: "white" }}>PLease enter your OTP to verify your account.</p>
                            </div>
                            <hr/>
                            <form onSubmit={this.submitForm} class="needs-validation" novalidate="">
                                <div class="form-input">
                                    <label style={{ color: "white" }}>Email</label>
                                    <input type="email" name="email" placeholder=""value={this.state.email} onChange={this.onChange} required readOnly/>
                                </div>
                                <div class="form-input">
                                    <label style={{ color: "white" }}>OTP</label>
                                    <input type="number" name="otp" placeholder="" value={this.state.otp} onChange={this.onChange} required />
                                </div>

                                <div class="form-input" style={{ textAlign: "center" }}>
                                    <label style={{ color: "#ff0000", fontSize: "18px" }}>{this.state.error}</label>
                                </div>
                                {this.state.loading &&
                                    <div style={ { textAlign: "center" } }>
                                        <SyncLoader
                                            css={override}
                                            size={10}
                                            color={"#fff"}
                                            loading={this.state.loading}
                                        />
                                    </div>
                                }
                                {!this.state.loading &&
                                    <button type="submit" name="submit" class="btn" style={login_btn}>Verify</button>
                                }

                            </form>
                            
                        </div>
                        
                        
                    </div>
                    
                    </div>
                </section>

            </div>
        )

    }
}
export default Verification;