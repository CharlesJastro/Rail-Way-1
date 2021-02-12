import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
class AdminsLogin extends Component{
    constructor(){
        super()
        this.state={
            fullName:'',
            userName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
        this.changeFullName=this.changeFullName.bind(this)
        this.changeUsername=this.changeUsername.bind(this)
        this.changeEmail=this.changeEmail.bind(this)
        this.changePassword=this.changePassword.bind(this)
        this.changeConfirmPassword=this.changeConfirmPassword.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    changeFullName(e){
        this.setState({
            fullName:e.target.value
        })
    }
    changeUsername(e){
        this.setState({
            userName:e.target.value
        })
    }
    changeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    changePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    changeConfirmPassword(e){
        this.setState({
            confirmPassword:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault()
        const registerd={
            fullName:this.state.fullName,
            userName:this.state.userName,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        }
        axios.post('/admins', registerd)
        .then((response)=>console.log(response.data))
        //window.location='/'
        this.setState({
            fullName:'',
            userName:'',
            email:'',
            password:'',
            confirmPassword:''
        })
    }
    render(){
        return(
            <div>
                <h2>LOGIN PAGE</h2>
                <div className="container">
                    <div className="form-div">
                        <form onSubmit={this.onSubmit}>
                            <input className="form-control form-group" type="text" placeholder="Full Name"
                            onChange={this.changeFullName}
                            value={this.state.fullName}/>
                            <input 
                            className="form-control form-group"
                            type="text" 
                            placeholder='User Name'
                            onChange={this.changeUsername}
                            value={this.state.username}
                            />
                            <input 
                            className="form-control form-group"
                            type="text" 
                            placeholder='Email'
                            onChange={this.changeEmail}
                            value={this.state.email}
                            />
                            <input 
                            className="form-control form-group"
                            type="password" 
                            placeholder='Password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            />
                            <input 
                            className="form-control form-group"
                            type="password" 
                            placeholder='Confirm Password'
                            onChange={this.changeConfirmPassword}
                            value={this.state.confirmPassword}
                            />
                            {/* <input type="submit" className="btn btn-danger btn-block" value="Submit"/> */}
                            <button type="submit"  className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )

        
    }
}
export default AdminsLogin;