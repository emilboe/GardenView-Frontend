import React, { Component } from 'react';
import { fetchUsers } from '../../api/users';
import { AuthContext } from '../../actions/Auth';

function withUsersFetch(WrappedComponent) {

    class WithFetch extends Component {
        static contextType = AuthContext;
        
        constructor(props) {
            super(props);
            this.state = { isFetching: true, data: [], error: null};
        }

        async componentDidMount() {
            const headers = this.context.generateHeaders();
            console.log('headers in hoc', headers)
            const res = await fetchUsers(headers);
            console.log('Users have been fetched', res);
            if(res.error){
                this.setState({ error: res.error });
            }
            else {
                this.setState({ data: res.data, isFetching: false, error: null });
            }
        }

        render() {
            if (this.state.error) {
                return (
                    <p style={{ color: 'red', fontSize: '0.8em', fontStyle: 'italic' }}>
                        {this.state.error}
                    </p>
                )
            }

            if (this.state.isFetching) {
                return (
                    <p style={{ color: 'green'}}>
                        Loading...
                    </p>
                )
            }

            return (
                <WrappedComponent users={this.state.data} {...this.props} />
            )
        }
    }
    
    return WithFetch;
}

export default withUsersFetch;