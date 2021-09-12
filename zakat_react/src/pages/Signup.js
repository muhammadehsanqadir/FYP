import React from 'react';
import "./css/login_style.css";
import { constants } from '../utils/constants';

import { Link, Redirect } from 'react-router-dom';
import SyncLoader from "react-spinners/SyncLoader";

import PasswordStrengthBar from 'react-password-strength-bar';

// import{ init } from 'emailjs-com';
import * as emailjs from "emailjs-com";

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


class Signup extends React.Component{

    constructor(props) {
		super(props);
		this.state = {
            isLoggedIn: false,
            isRegistered: false,
            name: "",
            email:"",
            password:"",
            contact: "",
            address: "",
            register_as: "giver",
            error: "",
            score: "",
            loading: false
        };
		this.checkLogin();
       
    }

    

    generateOTP = () => {
        return Math.random().toString().substring(2, 6);
    }

    checkLogin = () => {

        var token = localStorage.getItem("token");
		if(token === null || token === ""){
			this.setState({
                isLoggedIn: false
            });
		}
        else {
            this.setState({
                isLoggedIn: true
            });
        }

    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    submitForm = (event) => {
        this.performLogin();
        event.preventDefault();
    }

    fillForm = (event) => {
        if(event.target.name === "admin"){
            this.setState({
                email: "admin@admin.com",
                password: "admin"
            });
        }
        else if(event.target.name === "reciever"){
            this.setState({
                email: "reciever@reciever.com",
                password: "reciever"
            });
        }
        else if(event.target.name === "giver"){
            this.setState({
                email: "giver@giver.com",
                password: "giver"
            });
        }

    }
    
    async performLogin(){
        this.setState({
            loading: true
        });
        const URL = constants.SERVER_URL+"users/";

        var name = this.state.name;
        var email = this.state.email;
        var password = this.state.password;
        var contact = this.state.contact;
        var address = this.state.address;
        var type = this.state.register_as;

        var score = this.state.score;

        const OTP = this.generateOTP();

        if(score < 2){
            this.setState({
                error: "Please choose a strong password",
                loading: false
            });
        }

        else if( (name === undefined || name === "") && 
        (email === undefined || email === "") && 
        (password === undefined || password === "") && 
        (contact === undefined || contact === "") && 
        (address === undefined || address === "") && 
        (type === undefined || type === "") ){
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
                    name: name,
                    email: email,
                    password: password,
                    contact: contact,
                    address: address,
                    type: type,
                    otp: OTP
                })
            }; 
    
            const response = await fetch(URL, requestOptions);
            const data = await response.json();
    
            if(data.code === "success"){
                this.setState({
                    isRegistered: true,
                    loading: false,
                });
                emailjs.send("service_mt8p11g","template_c799lhr",{
                    from_name: "Zakaat",
                    to_name: name,
                    otp: OTP,
                    to_email: email,
                    }, "user_H1RRy4jCXuVWDIoGyd1YG");
            }
            else if(data.code === "error"){
    
                this.setState({
                    error: data.message,
                    loading: false
                });
            }
        }
     
	}

    render(){

        if(this.state.isLoggedIn){
			return <Redirect to="/"/>
		}
        else if( this.state.isRegistered ){
            return <Redirect to="/auth"/>
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
                                <h4 style={{ color: "white" }}>Sign Up</h4>
                                <p style={{ color: "white" }}>Register yourself</p>
                            </div>
                            <hr/>
                            <form onSubmit={this.submitForm} class="needs-validation" novalidate="">
                                <div class="form-input">
                                    <label style={{ color: "white" }}>Name</label>
                                    <input type="text" name="name" placeholder=""value={this.state.name} onChange={this.onChange} required />
                                </div>
                                <div class="form-input">
                                    <label style={{ color: "white" }}>Email</label>
                                    <input type="email" name="email" placeholder=""value={this.state.email} onChange={this.onChange} required />
                                </div>
                                <div class="form-input">
                                    <label style={{ color: "white" }}>Password</label>
                                    <input type="password" name="password" placeholder="" value={this.state.password} onChange={this.onChange} required />
                                    <PasswordStrengthBar password={this.state.password} onChangeScore = {
                                        ((score)=>{

                                            this.setState({
                                                score: score
                                            });
    
                                        })
                                    } />
                                </div>
                                <div class="form-input">
                                    <label style={{ color: "white" }}>Contact</label>
                                    <input type="text" name="contact" placeholder=""value={this.state.contact} onChange={this.onChange} required />
                                </div>
                                <div class="form-input">
                                    <label style={{ color: "white" }}>Address</label>
                                    <input type="text" name="address" placeholder=""value={this.state.address} onChange={this.onChange} required />
                                </div>
                                <div class="form-input">
                                    <label style={{ color: "white" }}>Register as</label>
                                    <select onChange={this.onChange} name="register_as" class="form-control">
                                        <option value="giver">Giver</option>
                                        <option value="reciever">Reciever</option>
                                    </select>
                                </div>

                                <div class="form-input" style={{ textAlign: "center" }}>
                                    <label style={{ color: "red", fontSize: "18px" }}>{this.state.error}</label>
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
                                    <button type="submit" name="submit" class="btn" style={login_btn}>Register</button>
                                }

                                <div class="form-input" style={{ marginTop: "10%", textAlign: "center" }}>
                                    <label style={{ color: "white" }}>- OR -</label>
                                </div>

                                <div class="form-input" style={{ marginTop: "10%", textAlign: "center" }}>
                                    <Link to="/auth" style={{ width: "100%" }}>
                                        <button class="btn btn-primary" style={{ background: "#72A0D5", color: "#fff", width: "100%" }}>Login</button>
                                    </Link>
                                </div>

                            </form>
                            
                        </div>
                        
                        
                    </div>
                    
                    </div>
                </section>

            </div>
        )

    }
}
export default Signup;