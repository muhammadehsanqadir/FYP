import React from 'react';
import { constants } from '../utils/constants';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from './../components/Header.js';
import { DataTable} from "mdbreact";

import Giver from './Dashboards/Giver_Dashboard';
import Reciever from './Dashboards/Reciever_Dashboard';
import Admin from './Dashboards/Admin_Dashboard';


class Dashboard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      success:false,
      error:"",
    
     user_type: ""

     
    };


  }

  checkStatus = () => {
		var token = localStorage.getItem("token");
		var s_user_type = localStorage.getItem("user_type");

		if(token === null || token === ""){
		  this.setState({
			isLoggedIn: false,
		  });
		}
		else{
		  this.setState({
			user_type: s_user_type,
			isLoggedIn: true,
		  });	
		}
	}

  componentDidMount() {
    this.checkStatus();

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
              <div>
                {this.state.user_type === "admin" ? <Admin/> : this.state.user_type === "reciever" ? <Reciever/> : this.state.user_type === "giver" ? <Giver/> : <div></div>}
              </div>
            </Switch>
        </div>
        )
  }

}
export default Dashboard;