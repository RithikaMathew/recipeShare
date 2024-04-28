import React from 'react';
import './CreatePost.css'
import { useState } from 'react';
import { supabase } from '../client'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const [post, setPost] = useState({ title: "", author: "", description: "", image: "" })
    const navigate = useNavigate();

    // Defines a function to handle changes in form inputs
    const handleChange = (event) => {
        // Destructures the 'name' and 'value' properties from the event's target (the input element)
        const { name, value } = event.target;
        // Updates the 'post' state using the previous state
        setPost((prev) => {
            return {
                // Spreads the previous state to retain existing key-value pairs
                ...prev,
                // Uses computed property names to update the key (input name) with the new value
                [name]: value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
    
            const { error } = await supabase
                .from('Posts')
                .insert({ title: post.title, author: post.author, description: post.description, image: post.image });
            navigate("/read");
       
    };

    return (
        <div class='post'>
            <form onSubmit={createPost}>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />
                <label htmlFor="author">Author</label> <br />
                <input type="text" id="author" name="author" onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label> <br />
                <input type="text" id="description" name="description" onChange={handleChange} /><br />
                <br />

                <label htmlFor="image">Image URL(optional)</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /><br />
                <br />
                <button class="submit" >Submit</button>
            </form>
        </div>
    )
}

export default CreatePost