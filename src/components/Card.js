import React, { useState, useEffect } from 'react';
import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import { formatDistanceToNow } from 'date-fns';

const Card = ({ id, title, author, createdAt }) => {
  
  const [upvotes, setUpvotes] = useState(0);
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  useEffect(() => {
    const fetchUpvotes = async () => {
        const { data } = await supabase
          .from('Posts')
          .select('upvotes')
          .eq('id', id)
          .single();

          if (data) {
            setUpvotes(data.upvotes);
        } else {
            console.error('Failed to fetch upvotes');
        }      
    };

    fetchUpvotes();
  }, [id]);

  return (
    <Link to={`/detailview/${id}`}>
      <div className="Card">
        <Link to={`/edit/${id}`}><img className="moreButton" alt="edit button" src={more} /></Link>
        <p>Posted {timeAgo} </p>
        <h2>{title}</h2>
        <p>{"Author: " + author}</p>
        <p >{"Upvotes: " + upvotes}</p>

      </div>
    </Link>
  );
};

export default Card;