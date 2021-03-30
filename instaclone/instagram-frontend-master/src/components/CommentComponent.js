import React from "react"
import "./CommentComponent.css"
import axios from "axios"
import {useDispatch} from "react-redux"

class CommentComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            comment : "",
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const data = new FormData();
        
        data.append('feed_id', this.props.id);
        data.append('comment', this.state.comment);
        const token = this.props.token;
        axios.defaults.baseURL = 'http://localhost:8000/api'
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.post('feeds/comment', data).then((result)=>{
            alert("Berhasil menambahkan komentar!")
            this.props.onComment({
                key : this.props.idx,
                comment : this.state.comment
            });
            this.setState({
                comment:""
            })
        }).catch((err)=>{
            if("response" in err){
                alert(err.response.data.message)
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
            <form className="comment-container" onSubmit={this.handleSubmit}>
                <textarea className="comments" placeholder="Comments..." rows="4" name="comment" onChange={this.handleChange}>{this.state.comment}</textarea>
                <button className="comments-submit">Submit</button>
            </form>
        )
    }

}

export default CommentComponent