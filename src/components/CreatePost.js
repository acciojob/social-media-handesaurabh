import React, { useState } from 'react';


export default function CreatePost({ users, onAddPost }) {
const [title, setTitle] = useState('');
const [author, setAuthor] = useState(users[0]?.id || '');
const [content, setContent] = useState('');


function handleSubmit(e) {
e.preventDefault();
if (!title.trim()) return;
onAddPost({ title, authorId: author, content });
setTitle('');
setContent('');
}


return (
<form className="create-post" onSubmit={handleSubmit}>
<input id="postTitle" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />


<select id="postAuthor" value={author} onChange={(e) => setAuthor(e.target.value)}>
{users.map(u => (
<option key={u.id} value={u.id}>{u.name}</option>
))}
</select>


<textarea id="postContent" placeholder="Write something..." value={content} onChange={(e) => setContent(e.target.value)} />


<button type="submit">Add Post</button>
</form>
);
}
