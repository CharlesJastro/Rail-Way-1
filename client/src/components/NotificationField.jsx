import React from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem';

const NotificationField = () => {
    // Set states
    // Set notificationList to empty
    const [notificationList, setNotificationList] = React.useState([]);
    // componentDidMount() method
    React.useEffect(() => {
        // Get notifications from server
        async function fetchData() {
            let data = await axios
                .get('/notifications/')
                .then(function(response) {
                    return response;
                }).catch(function(error) {
                    console.log(error); 
                });
            // Set notificationList state to data retrieved from server
            setNotificationList(data.data);
        }
        // Actually call the fetch function
        fetchData();
    }, []);
    // Function for dismissing a notification
    function handleRemove(id) {
        // Filter out any notification containing the specified id
        const nList = notificationList.filter(notice => notice._id !== id);
        // update notificationList state with filtered list
        setNotificationList(nList);
    }
    
    return (
        <div>
            {notificationList.map((notice, index) => (
                <NotificationItem key={'notice-'+index} notice={notice} onRemove={handleRemove} />
            ))}
        </div>
    );
}

export default NotificationField;