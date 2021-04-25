import React from 'react';


const Form = (props) => {
    return ( 
        <React.Fragment>
            <form onSubmit={props.handleSubmit} noValidate>
                <p>Hello! Type in name of the city <br/>to check weather.</p>
                <input name="search" type="text"/>
                <button>Check</button>
            </form>
        </React.Fragment>
     );
}
 
export default Form;