import React, { Component } from 'react';
import SearchBar from './SearchBar';
import './App.css'
class App extends Component{
  state={weatherforecast:[], city:{}, errorMessage:''}
  weather = (term) =>{
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${term}&appid=6f03413c7fb49d61ed84cd9ef21fdd00`)
    .then(resp=>resp.json())
    .then(data=>{
      this.setState({weatherforecast:data.list})
      this.setState({city:data.city})
      console.log(data)
    }).catch(err=>this.setState({errorMessage:err}))
  }
  renderWeather = () => {
      if(this.state.weatherforecast === undefined){
        alert('Invalid city name')
      }else{
      return <div>
        <div>
          {
            this.state.city.name
          }
        </div>
        <div className="container">
          {          
            this.state.weatherforecast.map(w=> {
              return <div className="row">
                <div>{w.weather[0].description}</div>
                <div>{w.dt_txt}</div>
              </div>
            })
          }
        </div>
      </div>
      }
  }
  render(){
    return (
      <div className="App">
        <SearchBar onFormSubmit={this.weather} />
        {this.renderWeather()}
      </div>
    )
  }
}

export default App;
