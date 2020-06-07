import React from 'react';
import './calculator.css';


export const Value = (props) => {
    return (
        <div className = "Value" >
        <label>{props.label}</label>
        <input type ="text" onChange={props.changed} value={props.value}/>
        </div>
    )
};

export const Values = (props) => {
    return (
        <div className = "Values">
            {
            <div>
            <Value
            label = 'Value 1'
            changed = {props.valueOne}
            />
            <Value
            label = 'Value 2'
            changed = {props.valueTwo}
            />
            </div>
            }
        </div>
    )

};

export const Operator = (props) => {
    return (
    <select onChange= {props.operation}> 
        <option value = "Addition">Addition</option>
        <option value = "Subtraction">Subtraction</option>
    </select>
    )
};



export const Button = (props) => {
    return (
    <button className = "submit" onClick= {props.runCalculation}>Calculate!</button>
    )
};

export const Result = (props) => {
    return (
        <div className="userOutput">
            <ul>
                {props.Result}
            </ul>

        </div>
    )
};