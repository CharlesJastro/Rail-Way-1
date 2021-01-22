import React from 'react';

const NotificationItem = ({notice}) => {
    return (
        <div className={'notice-'+notice.urgency}>
            <h3>{notice.title}</h3>
            <p>{notice.message}</p>
        </div>  
    );
}

export default NotificationItem;