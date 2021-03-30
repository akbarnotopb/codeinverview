import React, {Component} from 'react';
import setToken from '../services/api';
import io from 'socket.io-client';
import "./Feed.css";

import Header from '../components/Header';

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";


import axios from "axios";
import CommentComponent from '../components/CommentComponent';

class Feed extends Component {

    state = {
        feed : [],
    };

    fetchingData = async e => {
        const token = this.props.token;
        axios.defaults.baseURL = 'http://localhost:8000/api'
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get('feeds').then((res)=>{
            let x = []
            for(let i =0; i < res.data.data.length; ++i){
                x.push(res.data.data[i])
            }
            this.setState({feed: x});
        });
    }

    async componentDidMount() {
        // this.registerToSocket();
        const response = await this.fetchingData();
    }

    handleComment = (obj)=>{
        // clone feeds
        const stt = [...this.state.feed]
        stt[obj.key].comments.push({
            author:this.props.author,
            comment:obj.comment,
        })
        this.setState({
            state:stt,
        })
    }

    handleLike(id, idx){
        const data = new FormData();
        data.append('feed_id', id);
        const token = this.props.token;
        axios.defaults.baseURL = 'http://localhost:8000/api'
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.post('feeds/like', data).then((result)=>{
            alert("Berhasil menyukai post!")

            const stt = [...this.state.feed]
            stt[idx].liked = true
            stt[idx].likes++
            this.setState({
                state:stt
            })

        }).catch((err)=>{
            if("response" in err){
                alert(err.response.data.message)
            }else{
                alert("Terjadi kesalahan!")
            }
        })
    }

    render () {
        const posts = []
        for(let i =0 ; i < this.state.feed.length; ++i){
            const post = this.state.feed[i];
            posts.push(
            <article key={post._id}>
                <header>
                    <div className="user-info">
                        <span>{post.author}</span>
                        <span className="place">{post.place}</span>
                    </div>

                    <img src={more} alt="Mais " />
                </header>

                <img src={`${post.image}`} alt="" />

                <footer>
                    <div className="actions">
                            {(post.liked === true)?<strong style={{ 'padding':"15px",'verticalAlign':"Super" }}>Telah disukai</strong>:
                                <button type="button" onClick={() => this.handleLike(post._id, i)}>
                                <img src={like} alt="" />
                                </button>
                        }
                        <img src={comment} alt="" />
                        <img src={send} alt="" />
                    </div>
                    <strong>{post.likes} orang menyukai ini</strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    {post.comments.map(comment =>(
                        <p> <strong>{comment.author}</strong> {comment.comment} </p>
                    ))}
                    <hr></hr>
                    <CommentComponent key={i} idx={i} onComment={this.handleComment} token={this.props.token} id={post._id}></CommentComponent>
                </footer>
            </article>
            )
        }

        return (
            <div>
                <Header/>
                <section id="post-list">
                    {posts}
                </section>   
           </div>

        );
    }
}

export default Feed;