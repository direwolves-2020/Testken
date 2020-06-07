import React, { Component } from 'react';
import {Input, Button, Select, CheckBox} from './updateAccount_components';
import './updateaccount.css';




class UpdateAccount extends Component {
    state = {
        accountName: '',
        memberExport: '',
        memberParticipation: '',
        memberRedemption: '',
        creditsUsed: '',
    }

    // This is for the 'team responsible' drop-down
    clientTeams= ['R&I', "Customer Care"]
    industries= ['Health Care', "Finance", "Medical Devices", "Transportation", "Retail"]
    accountNameList = ['Abbott']

    handleFormSubmit(e) {
        //Form submission Logic
        e.preventDefault();
        this.postFormJson();
        
    }

    postFormJson () {
        let file = this.state.memberExport;
        // const formData = new FormData();

        // formData.append("file", file);

        return fetch (`/api/form-upload`, 
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': 'POST'

            },
            body: file
    
            }
        )
        .then(
            (response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            }
        )}

    getAccountList () {
            return fetch (`/api/fetch-list-of-accounts`)
            .then(
                (response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }
            )
            .then(
                // d => this.accountNameList.push(d)
                d => {return d}
            )
        
        }


    handleInput = e => {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( {[name] : value})
    }
    

componentDidMount(){
    // let value = this.getAccountList();
    // console.log(value)
    // let name = this.state.accountList;
    // this.setState( {[name] : value})
    this.getAccountList()
    .then(
        (data) => this.accountList = data
    )
    .then(
        this.setState({accountNameList : this.accountList})
    )
    
}


render () {
            return (
                <div className = 'Center'>
                <form className = 'Form' onSubmit = {this.handleFormSubmit} encType={'multipart/form-data'}>
                <h3>Updating ACCOUNT NAME for MONTH X</h3>

                {/* <Select title={'Account Name'}
                        name={'accountName'}
                        options = {this.state.accountList} 
                        value = {this.accountName}
                        placeholder = {'Select Account'}
                        handleChange = {(e) => this.handleInput(e)}
                    />  */}
                    {/* Member Export */}
                    <Input inputType={'file'}
                        title = {'Member Export'}
                        name = {'memberExport'}
                        value= {this.state.memberExport}
                        placeholder = {'test'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Member Participation */}
                    <Input inputType={'file'}
                        title = {'Member Participation'}
                        name = {'memberParticipation'}
                        value= {this.state.memberParticipation}
                        placeholder = {'test'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Member Redemption */}
                    <Input inputType={'file'}
                        title = {'Member Redemption'}
                        name = {'memberRedemption'}
                        value= {this.state.memberRedemption}
                        placeholder = {'test'}
                        handleChange = {(e) => this.handleInput(e)}
                    />

                    {/* Credits Used */}
                    <Input type={'text'}
                        title = {'Credits used'}
                        name = {'creditsUsed'}
                        value= {this.state.creditsUsed}
                        placeholder = {'#'}
                        handleChange = {(e) => this.handleInput(e)}
                    />


                    <Button
                        action={(e) => this.handleFormSubmit(e)}
                        type={"primary"}
                        title={"Submit"}                    

                    />
                </form>
                </div>
            );
        }
    }

    
    

export default UpdateAccount; 












