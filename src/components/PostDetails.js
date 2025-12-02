import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export default function PostDetails({ posts, users, onUpdatePost, navigate: navProp }) {
const { id } = useParams();
const navigate = useNavigate();
const post = posts.find(p => p.id === id) || null;


const [isEditing, setIsEditing] = useState(false);
const [title, setTitle] = useState(post?.title || '');
const [content, setContent] = useState(post?.content || '');


if (!post) return <div className="post">Post not found</div>;


function save() {
onUpdatePost(post.id, { title, content });
setIsEditing(false);
navigate('/');
}


return (
<section className="post">
{!isEditing ? (
<>
<h2>{post.title}</h2>
<div className="meta">by {users.find(u => u.id === post.authorId)?.name}</div>
<p>{post.content}</p>
<button className="button" onClick={() => { setIsEditing(true); setTitle(post.title); setContent(post.content); }}>Edit</button>
</>
) : (
<div>
<input id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
<textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} />
{/* last button on the page saves */}
<button onClick={save}>Save</button>
</div>
)}
</section>
);
}
