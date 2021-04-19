import logo from './GW_logo.svg';
import './Header.css';
const Header = () => {
	return(
		<header>
			<div className="logoWrapper">
				<a href="/" ><img src={logo} height="70px" /></a>
			</div>
			<a href="" className="navlink">Login</a>
		</header>
	)
}

export default Header