import React from 'react';

export const UserInput = (props) => {

    return (
        <div className="userInput">
            
            <input type ="text" onChange={props.changed} value={props.value}
            
            />

        </div>
    )
};


export const SearchResults = (props) => {

    return (
        <div className="userOutput">
            <ul>
                {
                    props.searchResults.map((result, index) =>
                    <MakeAndModel key={index}
                    make = {result['Make_Name']}
                    model = {result['Model_Name']}
                    handleClick = {props.hideSearchResults} />
                    )
                }
            </ul>
        </div>
    )
};



export const MakeAndModel = (props) => {
    
    return (
        <ol className = "searchResults" onClick = {props.handleClick}>
            <strong>Make:</strong> {props.make}
            <br/>
            <strong>Model:</strong> {props.model}
        </ol> 
    )
}