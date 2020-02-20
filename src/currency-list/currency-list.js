import React, { Component } from 'react';
import Loader from "../loader";

import './currency-list.css';

class CurrencyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            loading: true,
            elements: [],
        }
    }

    componentDidMount() {
        fetch("/api/v1/rates?key=c29b164fc15c0f50a7321675aec94f2effab")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((response) => {
                let elements =  Object.entries(response.rates).map((element) => {
                    return (
                        <tr className="currency-list__row" key={element[0]}>
                              <td className="currency-list__item">{element[0]}</td>
                              <td className="currency-list__item">{element[1]}</td>
                        </tr>
                    )
                });
                this.setState({
                    loading: false,
                    elements: elements
                });

            })
            .catch(error => this.setState({ error }));




    }

    render () {
      const { loading, elements, error } = this.state;

        if(loading) {
            return <Loader/>
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <table className="currency-list">
                <tbody>
                    <tr className="currency-list__row">
                        <th>Currency</th>
                        <th>Rate</th>
                    </tr>
                    {elements}
                </tbody>

            </table>

        )

    }
}
export default CurrencyList;