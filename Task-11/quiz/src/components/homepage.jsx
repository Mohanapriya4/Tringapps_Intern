import React, { useState } from "react";
import "./style.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Qz() {
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminders, setReminders] = useState([]);
  const [showReminders, setShowReminders] = useState(false);
  const [nextReminderId, setNextReminderId] = useState(1);

  const handleDateChange = (event) => {
    setReminderDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setReminderTime(event.target.value);
  };

  const handleNotificationIconClick = () => {
    setShowReminders(!showReminders);
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
        toast.success("Your reminder is set!");

        setReminders([
          ...reminders,
          {
            id: nextReminderId,
            message: `Your quiz is scheduled on ${reminderDate} at ${reminderTime}`,
          },
        ]);
        setNextReminderId(nextReminderId + 1);
      } else {
        toast.error("The reminder time must be at least 10 minutes in the future");
      }
    } else {
      toast.error("Please set both date and time for the reminder");
    }
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div>
      <div className="top-bar">
        <div className="left-corner">
          <h1>Welcome to Our Website!</h1>
        </div>
        <div className="right-corner">
          <p>
            <NotificationsActiveIcon
              className="notification-icon"
              fontSize="large"
              onClick={handleNotificationIconClick}
            />
          </p>
        </div>
      </div>
      <div className="notification-bar">
        <p>Schedule</p>
        <div className="reminder-schedule">
          <label htmlFor="reminder-date">Set a reminder date</label>
          <input
            type="date"
            id="reminder-date"
            value={reminderDate}
            onChange={handleDateChange}
          />
          <label htmlFor="reminder-time">Set a reminder time</label>
          <input
            type="time"
            id="reminder-time"
            value={reminderTime}
            onChange={handleTimeChange}
          />
        </div>
        <button onClick={scheduleReminder}>Set Reminder</button>
        {showReminders && (
          <div className="reminder-list">
            <h2>Scheduled Reminders</h2>
            <div className="reminder-scroll">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="reminder-box">
                  <span className="reminder-message">{reminder.message}</span>
                  <span
                    className="remove-reminder"
                    onClick={() => removeReminder(reminder.id)}
                  >
                    &#x2716;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Qz;
