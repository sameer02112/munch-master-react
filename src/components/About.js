import React from 'react';

export class About extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
             
        }
        console.log('constructor')
    }
    componentDidMount(){
        console.log('did mount')
    }

    render(){
        console.log('render')
        return(
            <div>
                <h2>About Us</h2>
            </div>
        )
    }
}