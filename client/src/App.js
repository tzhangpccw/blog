import React from 'react'
import PostCreate from './PostCreate';
import PostList from './PostList';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return <div className='container'>
        <h2>Create a post</h2>
        <PostCreate />
        <hr />
        <h2>Posts</h2>
        <PostList />
    </div>
};