import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';
import Login from "./pages/Login";
import Register from "./pages/Register";

import { userSet } from "./action/userSet.js";
import { useHistory  } from "react-router-dom"
import { connect , useDispatch } from "react-redux"


function Routes(props) {
    const dispatch  = useDispatch();
    const history   = useHistory();
    const login     = <Login onAuth={(user)=>{dispatch(userSet(user)); history.push("/")}}></Login>
    const register  = <Register onRegister={(user)=>{dispatch(userSet(user)); history.push("/")}}></Register>
    let token       = ""
    let author      = ""
    if(props.user == null){
        history.push("/login")
    }else{
        token       = props.user.token
        author      = props.user.user.name
    }


    const newv      = <New onPost={()=>{history.push("/")}} token={token} ></New>
    const feed      = <Feed token={token} author={author} ></Feed>

    return (
        <Switch>
            <Route path="/" exact >
                {feed}
            </Route>
            <Route path="/new">
                {newv}
            </Route>
            <Route path="/login" exact>
                {login}
            </Route>
            <Route path="/register" exact>
                {register}
            </Route>
        </Switch>
    );
}


const mapStateToProps = (state) => {
    return { user       : state.userReducer,}
}


export default connect(mapStateToProps)(Routes);