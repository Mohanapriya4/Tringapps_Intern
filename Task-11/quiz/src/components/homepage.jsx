import React, { useState } from "react";
import './style.css';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Qz() {
    const [reminderDate, setReminderDate] = useState("");
    const [reminderTime, setReminderTime] = useState("");
    const [showReminder, setShowReminder] = useState(false);

    const handleDateChange = (event) => {
        setReminderDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setReminderTime(event.target.value);
    };

    const handleNotificationIconClick = () => {
        setShowReminder(!showReminder);
    };

    const scheduleReminder = () => {
        if (reminderDate && reminderTime) {
            const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
            const now = new Date();
            const timeDifference = reminderDateTime - now - 10 * 60 * 1000;

            if (timeDifference > 0) {
                setTimeout(() => {
                    toast.info("Reminder: Your quiz is starting in 10 minutes!");
                }, timeDifference);
            } else {
                toast.error("The reminder time must be in the future.");
            }
        } else {
            toast.error("Please set both date and time for the reminder.");
        }
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to Our Website!</h1>
            <p>
                Quiz reminder <NotificationsActiveIcon fontSize="large" onClick={handleNotificationIconClick} style={{ cursor: 'pointer' }} />
            </p>
            <div className="notification-bar">
                <p>Schedule</p>
                <div className="reminder-schedule">
                    <label htmlFor="reminder-date">Set a reminder date:</label>
                    <input
                        type="date"
                        id="reminder-date"
                        value={reminderDate}
                        onChange={handleDateChange}
                    />
                    <label htmlFor="reminder-time">Set a reminder time:</label>
                    <input
                        type="time"
                        id="reminder-time"
                        value={reminderTime}
                        onChange={handleTimeChange}
                    />
                </div>
                <button onClick={scheduleReminder}>Set Reminder</button>
            </div>
            {showReminder && (
                <div className="reminder-details">
                    <h2>Scheduled Reminder</h2>
                    <p>Date: {reminderDate}</p>
                    <p>Time: {reminderTime}</p>
                    <button onClick={() => setShowReminder(false)}>Close</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Qz;
