/* eslint-disable */
var React = require('react'); 
var PropTypes = require('prop-types'); 
var Loading = require('./Loading.js'); 
var api = require('../utils/api.js'); 

function WeatherWeek(props) {
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    var d = new Date(props.location.forecast.forecastday[0].date);
    var index = d.getDay(); 
    return(
        <div>
            <ul className='popular-list'>
                <div className = "popular-item-background">
                <li className='popular-item'>
                    <li className='popular-rank'>Right Now</li>
                    <ul className='space-list-items'> 
                        <li>
                            <img
                                className='avatar'
                                src={props.location.current.condition.icon}
                                alt={'Image'}
                            />
                        </li>
                        <li>{props.location.current.condition.text}</li>
                        <li>{props.location.current.temp_f}F degrees</li>
                        <li>{props.location.current.humidity}% humidity</li>
                    </ul>
                </li>
                </div>
                <div className = "popular-item-background"> 
                <li className='popular-item'>
                    <li className='popular-rank'>Tomorrow</li>
                    <ul className='space-list-items'> 
                        <li>
                            <img
                                className='avatar'
                                src={props.location.forecast.forecastday[1].day.condition.icon}
                                alt={'Image'}
                            />
                        </li>
                        <li>{props.location.forecast.forecastday[1].day.condition.text}</li>
                        <li>{props.location.forecast.forecastday[1].day.maxtemp_f}F degrees</li>
                        <li>{props.location.forecast.forecastday[1].day.avghumidity}% humidity</li>
                    </ul>
                </li>
                </div>
                <div className = "popular-item-background"> 
                <li className='popular-item'>
                    <li className='popular-rank'>{days[(index+2)%7]}</li>
                    <ul className='space-list-items'> 
                        <li>
                            <img
                                className='avatar'
                                src={props.location.forecast.forecastday[2].day.condition.icon}
                                alt={'Image'}
                            />
                        </li>
                        <li>{props.location.forecast.forecastday[2].day.condition.text}</li>
                        <li>{props.location.forecast.forecastday[2].day.maxtemp_f}F degrees</li>
                        <li>{props.location.forecast.forecastday[2].day.avghumidity}% humidity</li>
                    </ul>
                </li> 
                </div>
                <div className = "popular-item-background">  
                <li className='popular-item'>
                    <li className='popular-rank'>{days[(index+3)%7]}</li>
                    <ul className='space-list-items'> 
                        <li>
                            <img
                                className='avatar'
                                src={props.location.forecast.forecastday[3].day.condition.icon}
                                alt={'Image'}
                            />
                        </li>
                        <li>{props.location.forecast.forecastday[3].day.condition.text}</li>
                        <li>{props.location.forecast.forecastday[3].day.maxtemp_f}F degrees</li>
                        <li>{props.location.forecast.forecastday[3].day.avghumidity}% humidity</li>
                    </ul>
                </li>
                </div>
                <div className = "popular-item-background">   
                <li className='popular-item'>
                    <li className='popular-rank'>{days[(index+4)%7]}</li>
                    <ul className='space-list-items'> 
                        <li>
                            <img
                                className='avatar'
                                src={props.location.forecast.forecastday[4].day.condition.icon}
                                alt={'Image'}
                            />
                        </li>
                        <li>{props.location.forecast.forecastday[4].day.condition.text}</li>
                        <li>{props.location.forecast.forecastday[4].day.maxtemp_f}F degrees</li>
                        <li>{props.location.forecast.forecastday[4].day.avghumidity}% humidity</li>
                    </ul>
                </li>
                </div>                                 
            </ul>
        </div> 
    )
}

class WeatherRow extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            location: '90024',
            forecast: null
        };

        this.updateLocation = this.updateLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);  
    }

    componentDidMount() {
        this.updateLocation(this.state.location); 
    }

    updateLocation(location) {
        this.setState(function() {
            return {
                location: location
            }
        });

        api.fetchWeather(location)
            .then(function(response) {
                this.setState(function() {
                    return {
                        forecast: response
                    }
                })
            }.bind(this));         
    }

    handleChange() {
        var newLocation = prompt("Please enter a US ZIP code"); 
        
        this.updateLocation(newLocation);
    }

    render() {
        return (
            <div>
                {!this.state.forecast ? <Loading /> :
                <div> 
                <div className='location-text'>{this.state.forecast.location.name}, {this.state.forecast.location.region}</div>
                <button
                    className='change'
                    onClick={this.handleChange.bind(null)}> 
                    Change Location (by ZIP code)
                </button> 
                <WeatherWeek location={this.state.forecast}/>
                </div>
                }
            </div> 
        )
    }
}

module.exports = WeatherRow; 