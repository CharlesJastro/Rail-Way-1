import React from 'react';

// Notification component of route details
const NotificationItem = ({notice, onRemove}) => {
    return (
        <div className={'notice-'+notice.urgency}>
            <h3>{notice.title}</h3>
            <p>{notice.message}</p>
            <button type="button" onClick={()=>onRemove(notice._id)}>Dismiss</button>
        </div>  
    );
}

export default NotificationItem;