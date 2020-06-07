import React, { Component } from 'react';
import {Values, Operator, Button, Result} from './calculator_components';
import calculate from './calculations'
import './calculator.css';

class Calculator extends Component {
    state = {
        valOne: 0,
        valTwo: 0,
        operation: 'Addition',
        result: 0,
        showResult: false
    }
    //this function is used to update the two values that are computed.
    //this is tied to the values component, where the user inputs the numbers they want to calculate
    updateValue (event, val) {
        console.log(event)
        const newVal = Number(event.target.value);
        //this updates the state of value one
        if (val === 1) {
            this.setState({valOne : newVal})
        }
        else {
            this.setState({valTwo : newVal})
        }
    };

    //this is tied to the select dropdown, and updates the state with the operation desired
    updateOperation(e) {
        this.setState({operation : e.target.value})
    };

    //this takes the two values and  the operation and pushes to formula.js
    runCalculation () {
        const answer = calculate(this.state.valOne, this.state.valTwo, this.state.operation);
        this.setState ({result : answer, showResult : true})
    };








    
    render () {
        return (
            <div>
            <h1 className="Calculator">This is the calculator</h1>
            
            <Values 
            valueOne = {(e) => this.updateValue(e, 1)}
            valueTwo = {(e) => this.updateValue(e)}
            />
            <div className = "Value" >
            <Operator
            operation = {(e) => this.updateOperation(e)}
            />

            <Button 
            runCalculation = {(e) => this.runCalculation()}
            />
            </div>            
            {
            this.state.showResult &&
            <Result
            Result = {this.state.result} />            
            }

            </div>

            );
    }
}

export default Calculator; 