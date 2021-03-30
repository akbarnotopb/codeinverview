import React, {Component} from 'react';
import Header from '../components/Header';

import "./New.css";
import api from "../services/api";

class New extends Component {

    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    };

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        
        data.append('image', this.state.image);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);
        const token = this.props.token;

        api.interceptors.request.use(function (config) {
            config.headers.Authorization =  token ? `Bearer ${token}` : '';
            return config;
        });
        await api.post('feeds/store', data).then((result)=>{
            alert("Berhasil!")
            this.props.onPost();
        }).catch((err)=>{
            if("response" in err){
                alert(err.response.data.message)
            }else{
                alert("Terjadi kesalahan!")
            }
        })
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0]});
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return (
            <div>
                <Header />
                <form id="new-post" onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleImageChange}/>

                    <input 
                        type="text" 
                        name="place" 
                        placeholder="Place"
                        onChange={this.handleChange}
                        value={this.state.place}
                    />

                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Description"
                        onChange={this.handleChange}
                        value={this.state.description}
                    />

                    <input 
                        type="text" 
                        name="hashtags" 
                        placeholder="Hashtags"
                        onChange={this.handleChange}
                        value={this.state.hashtags}
                    />

                    <button type="submit">Post !</button>
                </form>
            </div>

        );
    }
}

export default New;