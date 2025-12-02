import React, { useState } from 'react';


export default function UsersPage({ users, posts }) {
const [selectedUser, setSelectedUser] = useState(null);


function handleSelect(user) {
setSelectedUser(user);
}


const userPosts = selectedUser ? posts.filter(p => p.authorId === selectedUser.id) : [];


return (
<section>
<ul className="users-list">
{users.map((u, idx) => (
<li key={u.id} onClick={() => handleSelect(u)}>{u.name}</li>
))}
</ul>


<div className="user-posts">
{selectedUser && (
<div>
<h3>Posts by {selectedUser.name}</h3>
{userPosts.map(p => (
<article className="post" key={p.id}>
<h4>{p.title}</h4>
<p>{p.content}</p>
</article>
))}
</div>
)}
</div>
</section>
);
}
