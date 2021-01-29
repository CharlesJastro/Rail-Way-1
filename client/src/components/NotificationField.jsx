import React from 'react';
import axios from 'axios';
import NotificationItem from './NotificationItem';

const NotificationField = () => {
    // Set states
    // Set notificationList to empty
    const [notificationList, setNotificationList] = React.useState([]);
    // Get the list of dismissed notification IDs
    const savedList = JSON.parse(localStorage.getItem('dismissedList'));
    // Set dismissedList to either savedList or empty list
    const [dismissedList, setDismissedList] = React.useState(savedList || []);

    const [notificationData, setNotificationData] = React.useState([]);
    // componentDidMount() method
    React.useEffect(() => {
        // Get notifications from server
        async function fetchData() {
            let data
            try {
                data = await axios
                    .get('/notifications/')
            } catch (error) {
                console.log(error);
            };
            setNotificationData(data);
        }
        // Actually call the fetch function
        fetchData();
    }, []);

    React.useEffect(() => {
        // Try catch block is intended to deal with no server error
        try {
            // Go through dismissedList and filter out any notifications that the client has already dismissed
            // Set notificationList state to data retrieved from server
            setNotificationList(notificationData.data.filter(notice => !dismissedList.includes(notice._id)));
        } catch (error) {
            console.log(error);
        }
    }, [notificationData, dismissedList]);

    // Function for dismissing a notification
    function handleRemove(id) {
        // Filter out any notification containing the specified id
        const nList = notificationList.filter(notice => notice._id !== id);
        // update notificationList state with filtered list
        setNotificationList(nList);
        // Add dismissed ID to dismissedList; this will trigger a useEffect
        setDismissedList(dismissedList.concat(notificationList.find(notice => notice._id === id)._id));
    }
    // useEffect that triggers when dismissedList updates
    React.useEffect(() => {
        // Store dismissedList into localStorage
        localStorage.setItem('dismissedList', JSON.stringify(dismissedList));
    }, [dismissedList]);

    return ( <
        div > {
            notificationList.map((notice, index) => ( <
                NotificationItem key = {
                    'notice-' + index
                }
                notice = {
                    notice
                }
                onRemove = {
                    handleRemove
                }
                />
            ))
        } <
        /div>
    );
}

export default NotificationField;
