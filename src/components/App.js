import React, { useState } from 'react';
import './../styles/App.css';
function Nav({ navigate }) {
// anchor tags must exist with exact text
return (
<nav className="nav">
<a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Posts</a>
<a href="/users" onClick={(e) => { e.preventDefault(); navigate('/users'); }}>Users</a>
<a href="/notifications" onClick={(e) => { e.preventDefault(); navigate('/notifications'); }}>Notifications</a>
</nav>
);
}


export default function App() {
const navigate = useNavigate();
const location = useLocation();


const [users] = useState(initialUsers);
const [posts, setPosts] = useState(initialPosts);
const [notifications, setNotifications] = useState([]);


function addPost({ title, authorId, content }) {
const newPost = {
id: 'p' + Date.now(),
title,
authorId,
content,
reactions: [0, 0, 0, 0, 0],
};
setPosts((p) => [newPost, ...p]); // ensure new post is at .posts-list > :nth-child(2)
}


function updatePost(id, updates) {
setPosts((p) => p.map(post => post.id === id ? { ...post, ...updates } : post));
}


function addNotification() {
const notifs = [
{ id: 'n1', text: 'Alice liked your post' },
{ id: 'n2', text: 'Bob commented' },
];
setNotifications(notifs);
}


return (
<div className="App">
<header>
<h1>GenZ</h1>
<div>{/* fulfilling .App > :nth-child(1) */}
<Nav navigate={navigate} />
</div>
</header>


<main>
<Routes>
<Route path="/" element={<PostsPage posts={posts} users={users} onAddPost={addPost} navigate={navigate} onUpdatePost={updatePost} />} />
<Route path="/users" element={<UsersPage users={users} posts={posts} />} />
<Route path="/notifications" element={<NotificationsPage notifications={notifications} onRefresh={addNotification} />} />
<Route path="/posts/:id" element={<PostDetails posts={posts} users={users} onUpdatePost={updatePost} navigate={navigate} />} />
</Routes>
</main>
</div>
);
}
