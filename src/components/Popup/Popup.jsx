import React from "react";
import { useHistory } from "react-router-dom";
import './Popup.css'

const Popup = props => {

  // const HandleClose = () => {
  //   console.log('close pls')

  // }
  // useEffect(() => {
  //   document.getElementById('popupBox').focus()
  //   console.log('what')
  // })

  const keypress = (e) => {
    console.log('wow u pressed key')
    if (e.keyCode === 27) {
      console.log('wow its escape')
      history.push(`/gardenview`)
      return false;
    }

  }
  let history = useHistory();
  console.log('props.redirect', props.redirect)
  console.log('props.handleClose', props.handleClose)
  return (
    <div className="popup-box" id="popupBox" onKeyDown={keypress}>
      <div className="box">
        {props.redirect === 'none' ?
          <span className="close-icon" onClick={() => props.handleClose()}>x</span>
          : <span className="close-icon" onClick={() => history.push(props.redirect)}>x</span>}
        {props.content}
      </div>
    </div>

  );
};

export default Popup;