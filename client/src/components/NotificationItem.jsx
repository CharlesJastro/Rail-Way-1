import React from 'react';
import './Notification.css';

// Notification component of route details
const NotificationItem = ({notice, onRemove}) => {
    return (
        <div className={'notice-'+notice.urgency}>
            <h3>{notice.title}</h3>
            <p>{notice.message}</p>
            <button className="xButton" type="button" onClick={()=>onRemove(notice._id)}>X</button>
        </div>  
    );
}

export default NotificationItem;