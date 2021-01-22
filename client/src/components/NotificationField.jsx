import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationField = ({notifications}) => {
    return (
        <div>
            {notifications.map((notice, index) => (
                <NotificationItem key={'notice-'+index} notice={notice}/>
            ))}
        </div>
    );
}

export default NotificationField;