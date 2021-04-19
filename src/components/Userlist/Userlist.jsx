import './Userlist.css'

const Userlist = ({ users }) => {

    const list = users.map(user => (
        <div key={user._id} className="user">
            <div className="content">
                <p>{user.firstName} {user.lastName}</p>
                <p>|</p>
                {/* <p>{user.email}</p>
                <p>|</p> */}
                <p>{user.role}</p> 
                <button>Edit</button>
                <button className="delete">Delete</button>
            </div>
        </div>
    ))

    return (
        <div className="userlistContainer">
            <div className="userlistHeader">
                <div className="content">
                    <h2>Users</h2>
                    <button>New User</button>
                </div>
            </div>
            <div className="userlist">
                {list}
            </div>
        </div>
    )
}

export default Userlist;