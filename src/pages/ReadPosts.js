import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadPosts.css';
import { supabase } from '../client';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
            .from('Posts')
            .select('*');
            setPosts(data);
        };

        fetchPosts();
    }, []);

    // Function to sort by recent
    const sortByRecent = () => {
        const sorted = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFilteredPosts(sorted);
    };

    useEffect(() => {
        // Apply filtering directly here based on the search query
        const filtered = posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [posts, searchQuery]); // React to changes in `posts` or `searchQuery`

    // Sort by recent on component mount
    useEffect(() => {
        sortByRecent();
    }, [posts]); // Ensure this runs only once when the component mounts or when `posts` changes

    const sortByUpvotes = () => {
        const sorted = [...filteredPosts].sort((a, b) => {
            // Ensure we have valid numbers for comparison
            const upvotesA = Number(a.upvotes) || 0;
            const upvotesB = Number(b.upvotes) || 0;
            return upvotesB - upvotesA;
        });
        setFilteredPosts(sorted);
    };

    return (
        <div className="ReadPosts">
            <div className="filter">
            <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={sortByUpvotes}>Most Popular</button>
            <button onClick={sortByRecent}>Most Recent</button>
            </div>
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                    <Card
                        key={index}
                        id={post.id}
                        title={post.title}
                        author={post.author}
                        createdAt={post.created_at}
                    />
                ))
            ) : (
                <h2 style={{ color: 'black' }}>{'No matching posts 😞'}</h2>
            )}
        </div>
    );
};

export default ReadPosts;