import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import Header from './../components/Header.js';


const au_h1={
    color: "#2c50ee",
    fontSize: "50px",
    marginTop: "3%"
  }
const au_ul = {
    listStyleType: "none",
    margin: "0",
    padding: "5px",
    overflow: "hidden",
    backgroundColor: "#0a4850",
  }
  
const au_li =  {
    float: "left",
  }
  
const a =  {
    display: "block",
    color: "white",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
  }

class ZakatCalculator extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            success:false,
            error:"",
            user_type: "",

            current_status: "gold",
            gold: 747954,
            silver: 80933,
            net_worth: 0,
            zakat: 0,

            cash_in_hand: 0,
            cash_deposit: 0,
            cash_loan: 0,
            cash_investment: 0,

            gold_value: 0,
            silver_value: 0,

            liabilities_borrow: 0,
            liabilities_wages: 0,
            liabilities_tax: 0,

            trade_stock: 0,

        };
    
    }

    zakatChange = (event) => {
        if(event.target.value === ""){
          this.setState({error: "Please Select Zakat Type"});
        }
        else{
          this.setState({error: ""});
        }  
        this.setState({current_status: event.target.value});
    }

    calculateZakat = (event) => {
        
        var v_current_status = this.state.current_status;
        var v_gold = this.state.gold === (undefined || "") ? 0 : this.state.gold;
        var v_silver = this.state.silver === (undefined || "") ? 0 : this.state.silver;
        var v_net_worth = this.state.net_worth === (undefined || "") ? 0 : this.state.net_worth;
        var v_zakat = this.state.zakat === (undefined || "") ? 0 : this.state.zakat;
        var v_cash_in_hand = this.state.cash_in_hand === (undefined || "") ? 0 : this.state.cash_in_hand;
        var v_cash_deposit = this.state.cash_deposit === (undefined || "") ? 0 : this.state.cash_deposit;
        var v_cash_loan = this.state.cash_loan === (undefined || "") ? 0 : this.state.cash_loan;
        var v_cash_investment = this.state.cash_investment === (undefined || "") ? 0 : this.state.cash_investment;
        var v_gold_value = this.state.gold_value === (undefined || "") ? 0 : this.state.gold_value;
        var v_silver_value = this.state.silver_value === (undefined || "") ? 0 : this.state.silver_value;
        var v_liabilities_borrow = this.state.liabilities_borrow === (undefined || "") ? 0 : this.state.liabilities_borrow;
        var v_liabilities_wages = this.state.liabilities_wages === (undefined || "") ? 0 : this.state.liabilities_wages;
        var v_liabilities_tax = this.state.liabilities_tax === (undefined || "") ? 0 : this.state.liabilities_tax;
        var v_trade_stock = this.state.trade_stock === (undefined || "") ? 0 : this.state.trade_stock;

        var total_liabilites = 0;
        var total_worth = 0;

        var nf = new Intl.NumberFormat();

        if( v_current_status === "gold" ){
            total_worth = parseInt(v_cash_in_hand) + parseInt(v_cash_deposit) + parseInt(v_cash_investment) + parseInt(v_cash_loan) + parseInt(v_gold_value) + parseInt(v_silver_value) + parseInt(v_trade_stock);
            total_liabilites = parseInt(v_liabilities_borrow) + parseInt(v_liabilities_wages) + parseInt(v_liabilities_tax);

            v_net_worth = total_worth - total_liabilites;

            v_zakat = parseInt(( parseInt(v_net_worth) * 2.5 ) / 100); 

            if(v_net_worth >= v_gold){
                this.setState({
                    net_worth: nf.format(v_net_worth),
                    zakat: nf.format(v_zakat)
                });
            }
            else {
                this.setState({
                    net_worth: nf.format(v_net_worth),
                    zakat: 0
                });
            }
            
        }

        if( v_current_status === "silver" ){
            total_worth = parseInt(v_cash_in_hand) + parseInt(v_cash_deposit) + parseInt(v_cash_investment) + parseInt(v_cash_loan) + parseInt(v_gold_value) + parseInt(v_silver_value) + parseInt(v_trade_stock);
            total_liabilites = parseInt(v_liabilities_borrow) + parseInt(v_liabilities_wages) + parseInt(v_liabilities_tax);

            v_net_worth = total_worth - total_liabilites;

            v_zakat = parseInt(( parseInt(v_net_worth) * 2.5 ) / 100); 

            if(v_net_worth >= v_silver){
                this.setState({
                    net_worth: nf.format(v_net_worth),
                    zakat: nf.format(v_zakat)
                });
            }
            else {
                this.setState({
                    net_worth: nf.format(v_net_worth),
                    zakat: 0
                });
            }
            
        }


    }

    valueChange = (event) => {
        if(event.target.value === ""){
          this.setState({error: "Please Enter Value"});
        }
        else{
          this.setState({error: ""});
        }
        this.setState({[event.target.name]: event.target.value});
    }


    render(){
        return(
        <div>
        <Header/>
            <Switch>
                <div class="main-content">
                <div>
                
                <div class="container" style={{ textAlign: "center" }}>
                            
                    <h1 style={au_h1}>Zakat Calculator {(new Date().getFullYear())}</h1>
                    <b>
                        <p style={{ fontSize: "13px" }}>
                        Zakat, one of the five pillars of Islam, is obligatory on all Muslims who meet the Nisab values. Nisab is the minimum amount of net capital that a Muslim must possess in order to be eligible to pay Zakat, which is prescribed as the equivalent of 87.48 grams (7.5 tola) of gold and 612.36 grams (52.5 tola) of silver, respectively.
                        </p>
                        <p>
                        If you wish to calculate your Zakat amount with ease, please use the Zakat Calculator below.
                        </p>
                    </b>

                </div>

                <div class="container" style={{ background: "white", padding: "2%" }}>
                    
                    <div>
                        <div class="row">
                            <h5 style={{ color: "black" }}>Nisab threshold</h5>
                        </div>
                        <hr/>
                        <div class="row">
                            <div class="form-input">
                                <select class="form-control" onChange={this.zakatChange}>
                                    <option value="gold">Value of Gold (approximately Rs. 747,954)</option>
                                    <option value="silver">Value of Silver (approximately Rs. 80,933)</option>
                                </select>
                            </div>

                            <div class="form-input" style={{ textAlign: "center" }}>
                                <label style={{ color: "white", fontSize: "18px" }}>{this.state.error}</label>
                            </div>
                        </div>
                    </div>

                    <div class="row" style={{ marginTop: "5%" }}>
                        <div class="col-6" style={{ paddingRight: "5%" }}>
                            <div class="row">
                                <h5 style={{ color: "black" }}>Cash</h5>
                            </div>
                            <hr/>
                            <div class="row">
                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>
                                                    Cash in hand & in bank accounts
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="cash_in_hand" value={this.state.cash_in_hand} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <strong>
                                                    Cash deposited for some future purpose, e.g. Hajj
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="cash_deposit" value={this.state.cash_deposit} value={this.state.cash_deposit} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <strong>
                                                    Cash given out in loans
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="cash_loan" value={this.state.cash_loan} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <strong>
                                                    Investments, shares, saving certificates, pensions funded by money in one’s possession
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="cash_investment" value={this.state.cash_investment} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                               

                            </div>
                        </div>

                        <div class="col-6" style={{ paddingLeft: "5%" }}>
                            <div class="row">
                                <h5 style={{ color: "black" }}>Liabilities</h5>
                            </div>
                            <hr/>
                            <div class="row">
                            <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>
                                                    Borrowed money, goods bought on credit
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="liabilities_borrow" value={this.state.liabilities_borrow} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <strong>
                                                    Wages due to employees
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="liabilities_wages" value={this.state.liabilities_wages} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <strong>
                                                    Taxes, Rent, utility bills due immediately
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="liabilities_tax" value={this.state.liabilities_tax} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                               

                            </div>
                        </div>

                    </div>

                    <div class="row" style={{ marginTop: "5%" }}>
                        <div class="col-6">
                            <div class="row">
                                <h5 style={{ color: "black" }}>Gold and Silver</h5>
                            </div>
                            <hr/>
                            <div class="row">
                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>
                                                    Value of Gold that you possess
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="gold_value" value={this.state.gold_value} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <strong>
                                                    Value of Silver that you possess
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="silver_value" value={this.state.silver_value} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                               

                            </div>
                        </div>

                        
                    </div>


                    <div class="row" style={{ marginTop: "5%" }}>
                        <div class="col-6">
                            <div class="row">
                                <h5 style={{ color: "black" }}>Trade Goods</h5>
                            </div>
                            <hr/>
                            <div class="row">
                                <div class="table-responsive">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>
                                                    Value of stock
                                                    </strong>
                                                </td>
                                                <td>
                                                    <input type="number" name="trade_stock" value={this.state.trade_stock} placeholder="Rs." class="form-control currency" onChange={this.valueChange}/>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                               

                            </div>
                        </div>

                        
                    </div>


                    <div class="row" style={{ marginTop: "5%" }}>
                        <div class="col-6">
                            <div class="row">
                                <h5 style={{ color:"#0A4850" }}>TOTAL NET WORTH</h5>
                            </div>
                            <h4 style={{ color: "black" }}>Rs.  {this.state.net_worth}</h4>
                        </div>

                        <div class="col-6">
                            <div class="row">
                                <h5 style={{ color:"#0A4850" }}>ZAKAT PAYABLE</h5>
                            </div>
                            <h4 style={{ color: "black" }}>Rs. {this.state.zakat}</h4>
                        </div>

                        
                    </div>

                    <div class="row" style={{ marginTop: "5%" }}>
                        <div class="col-6">
                            <button class="btn btn-primary" style={{ width: "100%" }} onClick={this.calculateZakat}>Calculate</button>
                        </div>
                        
                    </div>



                </div>
                </div>
            
                </div>
            </Switch>
        </div>
        )
    }
}
export default ZakatCalculator;