import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/auth'
import { removeAccount } from '../user/apiUser'

export class DeleteUser extends Component {
    state = {
        redirect:false
    }

deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;

    removeAccount(userId, token).then(data => {
            if (data.error) {
            console.log(data.error)
            } else {

                signout(() => console.log("user is deleted"))
                //redirect the user to home
                this.setState({redirect:true})
        }
    })
    
}

    deleteConfirmed = () => {
        let answer = window.confirm(
           "Are you sure you want to delete your account?"
        )
        if (answer) {
            this.deleteAccount()
        }
    }
    render() {

        if (this.state.redirect) {
    return <Redirect to="/"/>
}
        return (
            

                
            <button className="btn btn-raised btn-danger ml-5 btn-sm"
                     onClick={this.deleteConfirmed} 
                    >
                   Delete Profile
                    </button>
        
        )
    }
}

export default DeleteUser
