import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useParams } from 'react-router-dom';
import './styles.css';
import { initialUsers, initialPosts } from './data';

function Nav({ history }) {
  return (
    <nav className="nav">
      <a href="/" onClick={(e) => { e.preventDefault(); history.push('/'); }}>Posts</a>
      <a href="/users" onClick={(e) => { e.preventDefault(); history.push('/users'); }}>Users</a>
      <a href="/notifications" onClick={(e) => { e.preventDefault(); history.push('/notifications'); }}>Notifications</a>
    </nav>
  );
}

function PostsPage({ posts, users, onAddPost, onUpdatePost, history }) {
  return (
    <div>
      <CreatePost users={users} onAddPost={onAddPost} />
      <PostsList posts={posts} users={users} onUpdatePost={onUpdatePost} history={history} />
    </div>
  );
}

function CreatePost({ users, onAddPost }) {
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
        {users.map(u => (<option key={u.id} value={u.id}>{u.name}</option>))}
      </select>
      <textarea id="postContent" placeholder="Write something..." value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Add Post</button>
    </form>
  );
}

function PostsList({ posts, users, onUpdatePost, history }) {
  function handleReact(postId, idx) {
    if (idx === 4) return;
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const newReactions = [...post.reactions];
    newReactions[idx] += 1;
    onUpdatePost(postId, { reactions: newReactions });
  }

  function getUserName(id) {
    return users.find(u => u.id === id)?.name || 'Unknown';
  }

  return (
    <section className="posts-list">
      {posts.map(post => (
        <article key={post.id} className="post">
          <h2>{post.title}</h2>
          <div className="meta">by {getUserName(post.authorId)}</div>
          <p>{post.content}</p>
          <div className="reactions">
            <button onClick={() => handleReact(post.id,0)}>👍 {post.reactions[0]}</button>
            <button onClick={() => handleReact(post.id,1)}>❤️ {post.reactions[1]}</button>
            <button onClick={() => handleReact(post.id,2)}>😂 {post.reactions[2]}</button>
            <button onClick={() => handleReact(post.id,3)}>😮 {post.reactions[3]}</button>
            <button onClick={(e) => e.preventDefault()}>🚫 {post.reactions[4]}</button>
          </div>
          <button className="button" onClick={() => history.push(`/posts/${post.id}`)}>View</button>
        </article>
      ))}
    </section>
  );
}

function PostDetails({ posts, users, onUpdatePost, history }) {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  if (!post) return <div className="post">Post not found</div>;

  function save() {
    onUpdatePost(post.id, { title, content });
    setIsEditing(false);
    history.push('/');
  }

  return (
    <section className="post">
      {!isEditing ? (
        <>
          <h2>{post.title}</h2>
          <div className="meta">by {users.find(u => u.id === post.authorId)?.name}</div>
          <p>{post.content}</p>
          <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <div>
          <input id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={save}>Save</button>
        </div>
      )}
    </section>
  );
}

function UsersPage({ users, posts }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const userPosts = selectedUser ? posts.filter(p => p.authorId === selectedUser.id) : [];

  return (
    <section>
      <ul className="users-list">
        {users.map(u => (<li key={u.id} onClick={() => setSelectedUser(u)}>{u.name}</li>))}
      </ul>
      {selectedUser && (
        <div>
          <h3>Posts by {selectedUser.name}</h3>
          {userPosts.map(p => (
            <article key={p.id} className="post">
              <h4>{p.title}</h4>
              <p>{p.content}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function NotificationsPage({ notifications, onRefresh }) {
  return (
    <section>
      <button className="button" onClick={onRefresh}>Refresh Notifications</button>
      <section className="notificationsList">
        {notifications.length > 0 && (
          <div>{notifications.map(n => <div key={n.id}>{n.text}</div>)}</div>
        )}
      </section>
    </section>
  );
}

export default function App() {
  const history = useHistory();
  const [users] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);
  const [notifications, setNotifications] = useState([]);

  function addPost(post) {
    setPosts(p => [{ id: 'p'+Date.now(), reactions:[0,0,0,0,0], ...post }, ...p]);
  }

  function updatePost(id, updates) {
    setPosts(p => p.map(post => post.id === id ? { ...post, ...updates } : post));
  }

  function addNotification() {
    setNotifications([{ id:'n1', text:'Alice liked your post' },{ id:'n2', text:'Bob commented' }]);
  }

  return (
    <Router>
      <div className="App">
        <header>
          <h1>GenZ</h1>
          <div><Nav history={history} /></div>
        </header>
        <main>
          <Switch>
            <Route exact path="/" render={() => <PostsPage posts={posts} users={users} onAddPost={addPost} onUpdatePost={updatePost} history={history} />} />
            <Route path="/users" render={() => <UsersPage users={users} posts={posts} />} />
            <Route path="/notifications" render={() => <NotificationsPage notifications={notifications} onRefresh={addNotification} />} />
            <Route path="/posts/:id" render={() => <PostDetails posts={posts} users={users} onUpdatePost={updatePost} history={history} />} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
