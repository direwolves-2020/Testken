import React, { Component } from 'react';
import {Input, Button, Select} from './NewAccount_Components';
import './newaccountscreen.css';




class NewAccount extends Component {
    state = {
        accountName: '',
        contractStart: '',
        contractEnd: '',
        softwareCost: '',
        researchServiceCost: '',
        creditsPurchased: '',
        cmServiceCost: '',
        incentiveBudget: '',
        recruitmentBudget: '',
        accountManager: '',
        communityManager: '',
        teamResponsible: '',
        industry: '',
 
    }

    // This is for the 'team responsible' drop-down
    clientTeams= ['R&I', "Customer Care"]
    industries= ['Health Care', "Finance", "Medical Devices", "Transportation", "Retail"]


    handleFormSubmit(e) {
        //Form submission Logic
        e.preventDefault();
        this.postFormJson()
    }

    handleClearForm() {
        //Logic for resetting the form
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    };
    
    // gettingFrom is the basic functioning get request
    gettingFrom () {
            return fetch (`/api/hello`)
            .then(
                (response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                }
            )
            .then(
                d => console.log(d)
            )};


    postFormJson () {
        return fetch (`/api/post-new-account`, 
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
    
            }
        )
        .then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            }
        )
        .then(
            d => console.log(d)
        )}


    handleInput = e => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( {[name] : value})
    }
    

    
render () {
            return (
                <div className = 'Center'>
                <form className = 'Form' onSubmit = {this.handleFormSubmit}>
                <h3>New Account Form</h3>

                    {/* Name of the account */}
                    <Input type={'text'}
                        title = {'Account Name'}
                        name = {'accountName'}
                        value= {this.state.accountName}
                        placeholder = {'Name of account'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Contract Start */}
                    <Input type={'text'}
                        title = {'Contract Start Date'}
                        name = {'contractStart'}
                        value= {this.state.contractStart}
                        placeholder = {'mm/dd/yyyy'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Contract End */}
                    <Input type={'text'}
                        title = {'Contract End Date'}
                        name = {'contractEnd'}
                        value= {this.state.contractEnd}
                        placeholder = {'mm/dd/yyyy'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Software Cost */}
                    <Input type={'text'}
                        title = {'Software Cost'}
                        name = {'softwareCost'}
                        value= {this.state.softwareCost}
                        placeholder = {'100000'}
                        handleChange = {(e) => this.handleInput(e)}
                    />
                    {/* Research Service Cost */}
                    <Input type={'text'}
                        title = {'Research Service Cost'}
                        name = {'researchServiceCost'}
                        value= {this.state.researchServiceCost}
                        placeholder = {'100000'}
                        handleChange = {(e) => this.handleInput(e)}
                    />
                    {/* Credits Purchased */}
                    <Input type={'text'}
                        title = {'Credits Purchased'}
                        name = {'creditsPurchased'}
                        value= {this.state.creditsPurchased}
                        placeholder = {'120'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* CM Service Cost */}
                    <Input type={'text'}
                        title = {'CM Service Cost'}
                        name = {'cmServiceCost'}
                        value= {this.state.cmServiceCost}
                        placeholder = {'30000'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Incentive Budget */}
                    <Input type={'text'}
                        title = {'Incentive Budget'}
                        name = {'incentiveBudget'}
                        value= {this.state.incentiveBudget}
                        placeholder = {'10000'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Recruitment Budget */}
                    <Input type={'text'}
                        title = {'Recruitment Budget'}
                        name = {'recruitmentBudget'}
                        value= {this.state.recruitmentBudget}
                        placeholder = {'10000'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Account Manager */}
                    <Input type={'text'}
                        title = {'Account Manager'}
                        name = {'accountManager'}
                        value= {this.state.accountManager}
                        placeholder = {'Kevin Row'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Community Manager */}
                    <Input type={'text'}
                        title = {'Community Manager'}
                        name = {'communityManager'}
                        value= {this.state.communityManager}
                        placeholder = {'Sally Page'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    <Select title={'Team Responsible'}
                        name={'teamResponsible'}
                        options = {this.clientTeams} 
                        value = {this.state.teamResponsible}
                        placeholder = {'Select Team'}
                        handleChange = {(e) => this.handleInput(e)}
                    /> 

                    <Select title={'Industry'}
                        name={'industry'}
                        options = {this.industries} 
                        value = {this.state.industry}
                        placeholder = {'Select Industry'}
                        handleChange = {(e) => this.handleInput(e)}
                    /> 

                    <Button
                        action={(e) => this.handleFormSubmit(e)}
                        type={"primary"}
                        title={"Submit"}                    

                    />





                    {/* Gender selection */}
                    {/* <Select /> */}
                    {/* Submit */}
                    {/* <Button /> */}
                    {/* Clear form */}
                    {/* <Button /> */}
                </form>
                </div>
            );
        }
    }

    
    

export default NewAccount; 












