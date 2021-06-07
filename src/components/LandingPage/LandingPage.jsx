import React, { Component } from 'react';
import './LandingPage.css'
import plantImg2 from '../../assets/almani-qhizq_V876M-unsplash.jpg'
import screenshot2 from '../../assets/Screenshot_gardenview1.png'

// Logos
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
                    <p>GardenView is a project made by a group of 4 students at the Norwegian University of Science and Technology.
                        It is made using the common MERN(Mongo, Express, React and Node) software stack.</p>
                    <p> The aims of the project is to create a full usable website for taking care of your plants
                    and we achieve this by allowing those with access to water and fertilize plants, as well as
                        change any relevant information (such as where the plant is placed) to make sure the plants live long lives.</p>
                </div>

                <div className='w30 mb_first CV'>
                    <img src={plantImg2} alt='plant' />
                </div>
            </div>

            {/*segment 2*/}
            <div className='container LandingPage'>
                <div className='w40 CV'>
                    <img src={screenshot2} alt='screenshot of homepage' className="screenshot"/>
                </div>

                <div className='w60 CV'>
                    <div className="segment-header">
                        <h1 className="segment-title XLText">How we made it</h1>
                    </div>
                    <p>We worked together as a team for 2 months to plan, design and code this website so it would fulfill the requirements set by our product owner.
                        <br/>
                        <br/>
                        Through several meetings with the product owner and user testing sessions we improved our site to achieve the best user experience possible.
                    </p>
                </div>
            </div>

            {/*segment 3*/}
            <div className='container LandingPage'>
                <div className='w100 CH'>
                    <h1 className="segment-title">Technologies used</h1>
                    <p>For this project we used a variety of softwares for development, user-testing and commmunication</p>
                    <div className='logobox'>
                        <img src={logo1} alt='' />
                        <img src={logo2} alt='' />
                        <img src={logo3} alt='' />
                        <img src={logo4} alt='' />
                        <img src={logo5} alt='' />
                        <img src={logo6} alt='' />
                        <img src={logo7} alt='' />
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default Dashboard;