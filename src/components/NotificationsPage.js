import React from 'react';


export default function NotificationsPage({ notifications, onRefresh }) {
return (
<section>
<button className="button" onClick={onRefresh}>Refresh Notifications</button>
<section className="notificationsList">
{notifications.length === 0 ? null : (
<div>
{notifications.map(n => (<div key={n.id}>{n.text}</div>))}
</div>
)}
</section>
</section>
);
}
