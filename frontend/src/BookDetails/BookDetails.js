import React, { Component } from 'react';
import './BookDetails.css'


class BookDetails extends Component {
    constructor(props) {
        super();
        this.state = {'name': '', 'text': ''};

        var id = props.match.params.id;
        fetch('http://localhost:8000/books/' + id + '/',
            {method: 'GET'}
        ).then((response) => response.json().then(
            (json) => this.setState({name: json.name, text:json.text})
        ))
    }

    render () {
    return <div>
        <h1>{this.state.name}</h1>
        <p1>{this.state.text}</p1>
    </div>
    }
}

export default BookDetails