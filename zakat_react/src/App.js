import React from 'react';
import './App.css';

import My404Component   from './pages/404';
import Login            from './pages/Login';
import Calculator       from './pages/Calculator';
import Dashboard        from './pages/Dashboard';


import  { 
  Route, 
  BrowserRouter, 
  Switch 
} from 'react-router-dom';

import Users from './pages/Admin/Users';
import Request from './pages/Giver/Requests';
import Chats from './pages/Reciever/Chats';
import Donation_History from './pages/Giver/Donation_History';
import AddRequest from './pages/Reciever/Add_Request';
import Search_Result from './pages/Searches/search_result';
import Search from './pages/Searches/Search';
import ZakatCalculator from './pages/Zakat-Calculator';
import Signup from './pages/Signup';
import PaymentMethod from './pages/Giver/Payment_Method';
import Payment from './pages/Giver/Payment';
import Verification from './pages/Verification';
import Contact from './pages/Giver/Contact';
import ContactMessages from './pages/Admin/contact_messages';
import UserSettings from './pages/Giver/User_Settings';
import AdminSetting from './pages/Admin/Admin_Settings';

function App() {
  return (
    
      <div>

          <BrowserRouter>
                  <Switch>

                    <Route exact path="/" component={Dashboard}/>
                    
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/requests" component={Request}/>
                    <Route exact path="/chats" component={Chats}/>
                    <Route exact path="/donation-history" component={Donation_History}/>
                    <Route exact path="/add-request" component={AddRequest}/>
                    
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/verification" component={Verification}/>

                    <Route exact path="/search/:q" component={Search}/>
                    <Route exact path="/search-redirect/:q" component={Search_Result}/>


                    <Route exact path="/settings" component={UserSettings}/>
                    <Route exact path="/profile-update" component={AdminSetting}/>
                    
                    <Route exact path="/zakat-calculator" component={ZakatCalculator}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/contacts" component={ContactMessages}/>

                    <Route exact path="/payment-method/:amount/:id" component={PaymentMethod}/>
                    <Route exact path="/payment/:amount/:id" component={Payment}/>


                    <Route exact path="/auth" component={Login}/>
                    <Route exact path="/calculator" component={Calculator}/>

                    <Route path='*' exact={true} component={My404Component} />
                  </Switch>
          </BrowserRouter>


      </div>
    
  );
}

export default App;
