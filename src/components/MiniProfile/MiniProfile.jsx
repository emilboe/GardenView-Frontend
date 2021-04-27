import './MiniProfile.css'
import { getUser } from '../../helpers/storage';


const MiniProfile = () => {
    const {email, firstName, lastName, role} = getUser()
    return (
        <div className="miniprofilecontainer">
            <h3>Name</h3>
            <p className="capt">{firstName} {lastName}</p>
            <h3>Email</h3>
            <p>{email}</p>
            <h3>Role</h3> 
            <p className="capt">{role}</p>
            <button onClick={() => alert('haha, cant do that')}>Edit</button>
        </div>
    )
}

export default MiniProfile;