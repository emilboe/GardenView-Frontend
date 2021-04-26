import React from "react";
import { useHistory } from "react-router-dom";
import './Popup.css'

const Popup = props => {

  // const HandleClose = () => {
  //   console.log('close pls')

  // }

  let history = useHistory();
  console.log('props.redirect', props.redirect)
  console.log('props.handleClose', props.handleClose)
  return (
    <div className="popup-box">
      <div className="box">
        {props.redirect == 'none' ? 
        <span className="close-icon" onClick={() => props.handleClose()}>x</span> 
        : <span className="close-icon" onClick={() => history.push(props.redirect)}>x</span>}
        {props.content}
      </div>
    </div>
  );
};

export default Popup;