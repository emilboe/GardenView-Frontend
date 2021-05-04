import './MiniProfile.css'
import { getUser } from '../../actions/storage';
import person from '../../assets/happyman.jpg'

const MiniProfile = () => {
    const { email, firstName, lastName, role } = getUser()
    return (
        <div className="miniprofilecontainer">
            <img src={person} className="pfp" />
            <h1 className="capt">{firstName} {lastName}</h1>
            <p className="capt undertitle">{role}</p>
            <p className="email">{email}</p>
            <button onClick={() => alert('haha, cant do that')}>Edit</button>
        </div>
    )
}

export default MiniProfile;