import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PlantCard from '../PlantCard/plantcard.jsx';
// import plants from './plants.json'
import { fetchPlants } from '../../api/plants';
import './LandingPage.css'
import plantImg1 from '../../assets/pexels-daria-shevtsova-1578244.jpg'
import screenshot1 from '../../assets/screenshot1.png'
//tech logos
import logo1 from '../../assets/250px-Node.js_logo.svg.png'
import logo2 from '../../assets/MongoDB_Logo.png'
import logo3 from '../../assets/react-logo.png'
import logo4 from '../../assets/heroku_logo.png'
import logo5 from '../../assets/microsoft-teams-logo-png_480-480.png'
import logo6 from '../../assets/adobe_xd.png'
import logo7 from '../../assets/Expressjs.png'


class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
      
        return (<>

            {/*segment 1*/}
            <div className='container LandingPage'>
                <div className='w70 CV'>
                    <div className="segment-header">
                        <h1 className="segment-title XLText">About the project</h1>
                    </div>
                    <p>GardenView is a website created by a group of 4 students at the Norwegian University of Science and Technology using the common MERN(Mongo, Express, React and Node) software stack.<br/></p><p> The aims of the project is to create a full usable website for taking care of your plants and we achieve this by allowing those with access to water and fertilize plants, as well as change any relevant information (such as where the plant is placed) to make sure the plants live long lives.</p>
                </div>

                <div className='w30 mb_first CV'>
                    <img src={plantImg1}/>
                </div>
            </div>

            {/*segment 2*/}
            <div className='container LandingPage'>
                <div className='w40 CV'>
                    <img src={screenshot1} />
                </div>

                <div className='w60 CV'>
                    <div className="segment-header">
                        <h1 className="segment-title XLText">About the project</h1>
                    </div>
                    <p>GardenView is a website created by a group of 4 students at the Norwegian University of Science and Technology using the react library.<br/>
                    <br/> 
                    The aims of the project is to create a usable website for taking care of your plants and we achieve this by allowing those with access to water and fertilize plants, 
                    as well as change any relevant information (such as where the plant is placed) to make sure the plants live long lives. 
                    Fint om noen andre vil skrive om denne teksten slik at vi har litt mer å si.<br/>: )</p>
                </div>
            </div>  

            {/*segment 3*/}
            <div className='container LandingPage'>
                <div className='w100 CH'>
                    <h1 className="segment-title">Technologies used</h1>
                    <p>For this project we used a variety of softwares for development, user-testing and commmunication</p>
                    <div className='logobox'>
                      <img src={logo1}/>
                      <img src={logo2}/>
                      <img src={logo3}/>
                      <img src={logo4}/>
                      <img src={logo5}/>
                      <img src={logo6}/>
                      <img src={logo7}/>
                    </div>
                </div>
            </div>          
            </>
        );
    }
}

export default Dashboard;