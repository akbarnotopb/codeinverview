import React from "react"
import "./Login.css"
import { Link } from 'react-router-dom';
import api from "../services/api";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const data = new FormData();
        
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        await api.post('login', data).then((result)=>{
            console.log(result)
            this.props.onAuth(result.data.data);
        }).catch((err)=>{
            console.log(err)
            if("response" in err){
                if("data" in err.response){
                    alert(err.response.data.message)
                }else{
                    alert("Terjadi kesalahan!")
                }
            }else{
                alert("Terjadi kesalahan!")
            }
        })
    }

    handleChange = e =>{
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return (
            <div id="login-container">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossorigin="anonymous"
                />
                
                <div id="login-box">
                    <h1>InstaClone</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" required className='form-control form-control-sm'
                            onChange={this.handleChange}
                            value={this.state.email} 
                            name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" required className="form-control form-control-sm'"
                            onChange={this.handleChange}
                            value={this.state.password} 
                            name="password"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary col-sm-12">Masuk</button>
                        </div>
                    </form>
                    <Link to="/register">
                        <span id="register-action">Register?</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Login