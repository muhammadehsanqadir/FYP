import React from 'react';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from '../cam/ActionProvider';
import MessageParser from '../cam/MessageParser';
import config from '../cam/config';
import {Button, Collapse} from 'react-bootstrap';
import "./chatbot.css"
class Footer extends React.Component{
	constructor() {
		super();
	
		// Initial state
		this.state = { open: false };
	  }
	
	  toggle() {
		this.setState({
		  open: !this.state.open
		});
	  }
	render(){
		return(
<div>
        	
        <div id="demo" className={"collapse bot" + (this.state.open ? " in" : "")}>
        	<div className="app-chatbot-container">
				<Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
          	</div>
			  
        </div>
		<Button  className="app-chatbot-button" onClick={this.toggle.bind(this)}>
			<svg viewBox="0 0 640 512" class="app-chatbot-button-icon"><path d="M192,408h64V360H192ZM576,192H544a95.99975,95.99975,0,0,0-96-96H344V24a24,24,0,0,0-48,0V96H192a95.99975,95.99975,0,0,0-96,96H64a47.99987,47.99987,0,0,0-48,48V368a47.99987,47.99987,0,0,0,48,48H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a47.99987,47.99987,0,0,0,48-48V240A47.99987,47.99987,0,0,0,576,192ZM96,368H64V240H96Zm400,48a48.14061,48.14061,0,0,1-48,48H192a48.14061,48.14061,0,0,1-48-48V192a47.99987,47.99987,0,0,1,48-48H448a47.99987,47.99987,0,0,1,48,48Zm80-48H544V240h32ZM240,208a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,240,208Zm160,0a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,400,208ZM384,408h64V360H384Zm-96,0h64V360H288Z"></path></svg>
    </Button>	
		


		<footer class="main-footer">
				<div class="footer-left">
					Copyright &copy; 2021 <div class="bullet"></div><b>Transparent Zakat Distribution</b>
				</div>
				<div class="footer-right">
				</div>
		</footer>


</div>
			)
	}
}
export default Footer;