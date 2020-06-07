import React, { Component } from 'react';

import './cars.css';
import {UserInput, SearchResults} from './car_components';
import fetchCall from './service';

class Cars extends Component {
    state = {
            search: '',
            searchResults : [],
            showOutput: false,
            updateUserLogin: false
        }
     



    search  (event) {   
        const newSearch = event.target.value;
        this.setState({search: event.target.value});
        let p = fetchCall(newSearch);
        p.then((data) => {         
            const newSearchResult = (data['Results'].slice(0,10))
            this.setState({
                searchResults: newSearchResult,
                showOutput: true
            })
            
          })
      };

    hideSearchResultsAndUpdateSearchBar (e) {
        this.setState({
            showOutput: false,
            updateUserLogin: true,
            search : e.target.textContent
        })
        console.log(e)
    };


    
    render () {
        console.log('e')

        return (
            <div>
            <h1 className="Car">Car Search:</h1>
            
            <UserInput
            changed = {(event) => this.search(event)}
            value = {this.state.search}
            />
            
            
            {
                this.state.showOutput && 
                <SearchResults
                searchResults = {this.state.searchResults}
                hideSearchResults = {(e) => this.hideSearchResultsAndUpdateSearchBar(e)}
                 />
            }
            </div>
        );
    }
}

export default Cars; 