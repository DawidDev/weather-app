import '../style/App.css';
import React, { Component } from 'react';

// Import application components
import Form from './From'
import Result from './Result'

class App extends Component {
  state = { 
    search: "",
   }

  handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0); 
    const inputArea = document.querySelector("input[name='search']");
    const inputValue = inputArea.value;
    this.setState({
      search: inputValue,
    })
    console.log("Search " + inputValue)
  }

  handleNewSearch = () => {
    this.setState({
      search: "",
    })
    console.log("Reset")
  }

  render() { 
    console.log("We are using free api from accuweather allowing to 50 request per 1 day. So if this app is not running try again next day.")
    const {search} = this.state;
    const form = <Form handleSubmit={this.handleSubmit}/>;
    const result = <Result handleNewSearch={this.handleNewSearch} search={search} setWeatherData={this.setWeatherData}/>;
    const whatIShow = search ? result : form; 
    return ( 
      <React.Fragment>
        <div className="app-body">
          <header>
            <h1>METEOapp</h1>
          </header>
          <main>
            {whatIShow}
          </main>
          <footer>
            <p>Made by L.C D.R.</p>
          </footer>
        </div>
      </React.Fragment>
     );
  }
}
 
export default App;