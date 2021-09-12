import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';


class Search_Result extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: true,
        success:false,
        error:"",
        user_type: "",
        searching: "",
        found: false
    };

  }

    componentWillMount() {
        const { match: { params } } = this.props;
        
        this.setState({
            searching: params.q
        });
        <Redirect to={"/search/"+params.q}/>
    }

	render(){
        return (
            <div>
                <Redirect to={"/search/"+this.state.searching}/>
            </div>
        )
    }

}
export default Search_Result;