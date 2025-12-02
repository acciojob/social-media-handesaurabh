import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import '../styles/App.css';
import { initialUsers, initialPosts } from './data';
import CreatePost from './CreatePost';
import PostsList from './PostsList';
import UsersPage from './UsersPage';
import NotificationsPage from './NotificationsPage';
import PostDetails from './PostDetails';

function Nav() {
  const navigate = useNavigate();
  
  return (
    <nav className="nav">
      <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }}>Posts</a>
      <a href="/users" onClick={e => { e.preventDefault(); navigate('/users'); }}>Users</a>
      <a href="/notifications" onClick={e => { e.preventDefault(); navigate('/notifications'); }}>Notifications</a>
    </nav>
  );
}

function PostsPage({ posts, users, onAddPost, onUpdatePost }) {
  const navigate = useNavigate();
  
  return (
    <div>
      <CreatePost users={users} onAddPost={onAddPost} />
      <PostsList posts={posts} users={users} onUpdatePost={onUpdatePost} history={{ push: navigate }} />
    </div>
  );
}

function AppContent() {
  const [users] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  function addPost(post) {
    setPosts(p => [{ id: 'p' + Date.now(), reactions: [0, 0, 0, 0, 0], ...post }, ...p]);
  }

  function updatePost(id, updates) {
    setPosts(p => p.map(post => post.id === id ? { ...post, ...updates } : post));
  }

  function addNotification() {
    setNotifications([
      { id: 'n1', text: 'Alice liked your post' },
      { id: 'n2', text: 'Bob commented' },
    ]);
  }

  return (
    <div className="App">
      <header>
        <h1>GenZ</h1>
        <div><Nav /></div>
      </header>
      <main>
        <Routes>
          <Route 
            path="/" 
            element={<PostsPage posts={posts} users={users} onAddPost={addPost} onUpdatePost={updatePost} />} 
          />
          <Route 
            path="/users" 
            element={<UsersPage users={users} posts={posts} />} 
          />
          <Route 
            path="/notifications" 
            element={<NotificationsPage notifications={notifications} onRefresh={addNotification} />} 
          />
          <Route 
            path="/posts/:id" 
            element={<PostDetails posts={posts} users={users} onUpdatePost={updatePost} history={{ push: navigate }} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
