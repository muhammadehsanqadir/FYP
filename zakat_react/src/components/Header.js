import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { constants } from '../utils/constants';


const width300px = {width: "300px"};
const onePxMarginTop = {marginTop: "1px"}
const btnColor = {backgroundColor: "#2c50ee"};

class Header extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
		  isLoggedIn: true,
		  success:false,
		  user_type: "",
		  query: ""
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

	queryChange = (event) => {
		if(event.target.value === ""){
		  this.setState({error: "Please Enter Query to Search"});
		}
		else{
		  this.setState({error: ""});
		}  
		this.setState({query: event.target.value});
	}


	handleLogout = (e) => {
		e.preventDefault();
		localStorage.setItem("token", "");
		localStorage.setItem("token", null);
		localStorage.removeItem("token");
		
		// alert("Logged Out");
		this.setState({
			isLoggedIn: false
		});
		// return <Redirect to="/auth"/>;
	}
	
	componentWillMount(){
		this.checkStatus();
	}

	render(){
		if(!this.state.isLoggedIn){
			return <Redirect to="/auth"/>
		}
		else{
			return(
				<div>
					<div class="navbar-bg"></div>
						<nav class="navbar navbar-expand-lg main-navbar">
						<div class="form-inline mr-auto">
								<ul class="navbar-nav mr-3">
								<li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg collapse-btn"><i class="fas fa-bars"></i></a></li>
									<li>
										<div class="input-group" style={width300px}>
										<input type="text" name="search" class="form-control" value={this.state.query} placeholder="Search ..." onChange={this.queryChange}/>
										<div class="input-group-btn" style={onePxMarginTop}>
											{this.state.query !== "" ?
												<Link to={"/search-redirect/"+this.state.query} class="btn btn-primary btn-icon" style={btnColor}>
													<i class="fas fa-search"></i>
												</Link>
												:
												<button class="btn btn-primary btn-icon" style={btnColor}>
													<i class="fas fa-search"></i>
												</button>
											}
										</div>
										</div>
									</li>
									
								</ul>
							</div>
							
							

						</nav>
						
						<div class="main-sidebar sidebar-style-2">
							<aside id="sidebar-wrapper">
							<div class="sidebar-brand">
							<	Link to="/">
								<img alt="image" src="/assets/img/logo_white.png" class="header-logo" style={{ width: "100%" }}/>
								</Link>
							</div>
							<ul class="sidebar-menu">
								<li class="menu-header"></li>

								<li>
									<Link class="nav-link" to="/">
										<i class="fas fa-signal"></i>
										<span>Dashboard</span>
									</Link>
								</li>

								{/* --------------------------- ADMIN --------------------------- */}

								{this.state.user_type === "admin" ?
								<li>
								<Link class="nav-link" to="/users">
									<i class="fas fa-users"></i>
									<span>All Users</span>
								</Link>
								</li>: ""
								}
								{this.state.user_type === "admin" ?
									<li>
									<Link class="nav-link" to="/requests">
										<i class="fas fa-comments"></i>
										<span>All Requests</span>
									</Link>
									</li>: ""
								}
								{this.state.user_type === "admin" ?
									<li>
										<Link class="nav-link" to="/contacts">
											<i class="fas fa-comments"></i>
											<span>Contact Messages</span>
										</Link>
									</li>: ""
								}

								{/* --------------------------- GIVER --------------------------- */}

								{this.state.user_type === "giver" ?
									<li>
										<Link class="nav-link" to="/requests">
											<i class="fa fa-user"></i>
											<span>All Requests</span>
										</Link>
									</li>: ""
								}

								{this.state.user_type === "giver" ?
									<li>
									<Link class="nav-link" to="/donation-history">
										<i class="fas fa-history"></i>
										<span>Donation History</span>
									</Link>
									</li>: ""
								}

								{this.state.user_type === "giver" ?
									<li>
										<Link class="nav-link" to="/chats">
											<i class="fas fa-comments"></i>
											<span>Inbox</span>
										</Link>
									</li>: ""
								}

								{this.state.user_type !== "admin" ?
									<li>
										<Link class="nav-link" to="/contact">
											<i class="fas fa-comments"></i>
											<span>Contact Admin</span>
										</Link>
									</li>: ""
								}

								<li>
									<Link class="nav-link" to="/settings">
										<i class="fas fa-cog"></i>
										<span>Settings</span>
									</Link>
								</li>
								

								{/* --------------------------- RECIEVER --------------------------- */}

								{this.state.user_type === "reciever" ?
									<li>
										<Link class="nav-link" to="/add-request">
											<i class="fa fa-edit"></i>
											<span>Add Request</span>
										</Link>
									</li>: ""
								}

								{this.state.user_type === "reciever" ?
									<li>
										<Link class="nav-link" to="/chats">
											<i class="fa fa-comments"></i>
											<span>Inbox</span>
										</Link>
									</li>: ""
								}

								<hr/>



								<li style={{ paddingLeft: "2%" }}>
									<Link class="nav-link" to="/zakat-calculator">
										<i class="fa fa-calculator"></i>
										<span>Zakat Calculator</span>
									</Link>
								</li>


								<hr/>



								<li style={{ paddingLeft: "2%" }}>
									<a href="javascript:;" class="nav-link"  onClick={this.handleLogout}>
										<i class="fa fa-sign-out-alt"></i>
										<span>Logout</span>
									</a>
								</li>

							</ul>
							</aside>
						</div>
				</div>
				)
		}
	}
}
export default Header;