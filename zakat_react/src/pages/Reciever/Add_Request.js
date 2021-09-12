import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';
import { constants } from '../../utils/constants';
import axios from 'axios';
import Footer from "../../components/Footer.js"

const newImage = {height: "150px", width: "200px"}

class AddRequest extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      error:"",
      amount: "",
      reason: "",
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

onImageChange = (event) => {
    this.setState({
      driver_image: event.target.files[0]
    });
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          image: e.target.result,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

uploadImage(img) {
    let body = new FormData()
    body.set('key', 'bf623b93451083944c9316f0c60e9c41')
    body.append('image', img)

    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })
  }

async add_request (image_url){
    this.setState({
        saving: true,
      });
  
      this.uploadImage(this.state.driver_image)
      .then(resp => {
  
        this.saveOtherDetails(resp.data.data.display_url);
  
      })
}

async saveOtherDetails(image_url){
    this.setState({
        loading: true
    });
    const URL = constants.SERVER_URL+"users/add_request";

    var user_id = localStorage.getItem("user_id");;
    var amount = this.state.amount;
    var reason = this.state.reason;


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: user_id,
            amount: amount,
            reason: reason,
            image: image_url
        })
    }; 

    const response = await fetch(URL, requestOptions);
    const data = await response.json();

    if(data.code === "success"){
       
        this.setState({
            loading: false,
            response: data.message,
            amount: "",
            reason: "",
            image: ""
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
                                            <label class="col-sm-3 col-form-label">Amount Needed</label>
                                            <div class="col-sm-9">
                                            <input type="number" name="amount" value={this.state.amount} class="form-control" onChange={this.onChange}/>
                                            <div class="invalid-feedback">
                                                Please Enter Amount Needed
                                            </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Reason</label>
                                            <div class="col-sm-9">
                                            <input type="text" name="reason" value={this.state.reason} class="form-control" onChange={this.onChange}/>
                                            <div class="invalid-feedback">
                                                Please Enter Reason
                                            </div>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <div class="col-sm-4"></div>
                                            <div class="col-sm-4" style={{ marginTop: "5%" }}>
                                                <img style={newImage} src={this.state.image} alt="" id="image"/> <br/> <br/>
                                                <input type="file" name="image" class="form-control" required="" accept="image/*" onChange={this.onImageChange}/>
                                                <div class="invalid-feedback">
                                                    Please Select Image
                                                </div>
                                            </div>
                                            <div class="col-sm-4"></div>
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
export default AddRequest;