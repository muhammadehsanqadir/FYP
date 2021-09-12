import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from '../../components/Header.js';


class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            success:false,
            error:"",
            user_type: "",
            query: "",
            found: false,
            page_name: ""
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
        this.searching (s_user_type);
    }

    searching (user_type) {
        const { match: { params } } = this.props;
        this.setState({
            query: params.q,
            loading: false
        });

        if( user_type === "reciever" ){
            if( params.q.toLowerCase().includes('dashboard') ){
                this.setState({
                    found: true,
                    page_name: "/"
                });
            }
            if( params.q.toLowerCase().includes('donation') ){
                this.setState({
                    found: true,
                    page_name: "/add-request"
                });
            }
            else if( params.q.toLowerCase().includes('chat') || params.q.toLowerCase().includes('inbox') ){
                this.setState({
                    found: true,
                    page_name: "/chats"
                });
            }
            else if( params.q.toLowerCase().includes('zakat') || params.q.toLowerCase().includes('calculator') ){
                this.setState({
                    found: true,
                    page_name: "/zakat-calculator"
                });
            }
        }
        else if( user_type === "giver" ){
            if( params.q.toLowerCase().includes('dashboard') ){
                this.setState({
                    found: true,
                    page_name: "/"
                });
            }
            else if( params.q.toLowerCase().includes('donation') || params.q.toLowerCase().includes('requests') || params.q.toLowerCase().includes('request') ){
                this.setState({
                    found: true,
                    page_name: "/requests"
                });
            }
            else if( params.q.toLowerCase().includes('history') ){
                this.setState({
                    found: true,
                    page_name: "/donation-history"
                });
            }
            else if( params.q.toLowerCase().includes('chat') || params.q.toLowerCase().includes('inbox') ){
                this.setState({
                    found: true,
                    page_name: "/chats"
                });
            }
            else if( params.q.toLowerCase().includes('zakat') || params.q.toLowerCase().includes('calculator') ){
                this.setState({
                    found: true,
                    page_name: "/zakat-calculator"
                });
            }
        }
        else if( user_type === "admin" ){
            if( params.q.toLowerCase().includes('dashboard') ){
                this.setState({
                    found: true,
                    page_name: "/"
                });
            }
            if( params.q.toLowerCase().includes('users') || params.q.toLowerCase().includes('user') ){
                this.setState({
                    found: true,
                    page_name: "/users"
                });
            }
            else if( params.q.toLowerCase().includes('requests') || params.q.toLowerCase().includes('request') ){
                this.setState({
                    found: true,
                    page_name: "/requests"
                });
            }

            else if( params.q.toLowerCase().includes('zakat') || params.q.toLowerCase().includes('calculator') ){
                this.setState({
                    found: true,
                    page_name: "/zakat-calculator"
                });
            }
            else if( params.q.toLowerCase().includes('settings') || params.q.toLowerCase().includes('profile') ){
                this.setState({
                    found: true,
                    page_name: "/settings"
                });
            }

        }
        else {
            this.setState({
                found: false
            });
        }
    }

    componentWillMount() {
        this.checkStatus();
    }


    render(){
        return(
        <div>
        <Header/>
            <Switch>
                <div class="main-content">
                    {!this.state.found ? <section class="section">
                            <div class="container mt-5">
                                <div class="row">
                                <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                                    <div class="card card-primary">
                                    <div class="card-header">
                                        <h3>ERROR 404</h3>
                                    </div>
                                    <div class="card-body">
                                        

                                        <h5>No result found</h5>
                                    
                                    </div>
                                    </div>

                                </div>
                                </div>
                            </div>
                        </section>
                    :
                    <div>
                        <Redirect to={this.state.page_name}/>
                    </div>    
                }
                </div>
            </Switch>
        </div>
        )
    }
}
export default Search;