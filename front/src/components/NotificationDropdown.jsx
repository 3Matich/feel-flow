import List from "./List";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({ notifications }) => (
    <div className="dropdown-menu dropdown-menu-end px-2 py-2 me-sm-n1">
        {notifications.length > 0 ? (
            <List
                items={notifications}
                renderItem={(notification) => (
                    <NotificationItem
                        image={notification.image}
                        title={notification.title}
                        time={notification.time}
                        icon={notification.icon}
                    />
                )}
            />
        ) : (
            <p className="text-sm text-gray-500 text-center">No new notifications</p>
        )}
    </div>
);

export default NotificationDropdown;
