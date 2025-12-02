import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function ReactionButtons({ reactions, onReact }) {
return (
<div className="reactions">
{/* first four incrementable */}
<button onClick={() => onReact(0)} aria-label="r0">👍 {reactions[0]}</button>
<button onClick={() => onReact(1)} aria-label="r1">❤️ {reactions[1]}</button>
<button onClick={() => onReact(2)} aria-label="r2">😂 {reactions[2]}</button>
<button onClick={() => onReact(3)} aria-label="r3">😮 {reactions[3]}</button>
{/* fifth must display 0 and not change */}
<button onClick={(e) => e.preventDefault()} aria-label="r4">🚫 {reactions[4]}</button>
</div>
);
}


export default function PostsList({ posts, users, navigate, onUpdatePost }) {
const nav = useNavigate();


function getUserName(id) {
return users.find(u => u.id === id)?.name || 'Unknown';
}


function handleReact(postId, idx) {
if (idx === 4) return; // don't change fifth
const post = posts.find(p => p.id === postId);
if (!post) return;
const newReactions = [...post.reactions];
newReactions[idx] = newReactions[idx] + 1;
onUpdatePost(postId, { reactions: newReactions });
}


return (
<section className="posts-list">
<div className="posts-header">All Posts</div>
{posts.map(post => (
<article key={post.id} className="post">
<h2>{post.title}</h2>
<div className="meta">by {getUserName(post.authorId)}</div>
<p>{post.content}</p>


<ReactionButtons reactions={post.reactions} onReact={(i) => handleReact(post.id, i)} />


<div className="post-actions">
{/* This button must be .button and navigate to /posts/:id */}
<button className="button" onClick={() => nav(`/posts/${post.id}`)}>View</button>
</div>
</article>
))}
</section>
);
}
