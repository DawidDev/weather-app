import React from 'react';


const Form = (props) => {
    return ( 
        <React.Fragment>
            <form onSubmit={props.handleSubmit} noValidate>
                <p>Witaj! <br/>Wpisz poniżej lokalizację aby sprawdzić pogodę.</p>
                <input name="search" type="text"/>
                <button>Szukaj</button>
            </form>
        </React.Fragment>
     );
}
 
export default Form;