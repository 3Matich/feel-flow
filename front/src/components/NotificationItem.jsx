import React from "react";

const NotificationItem = ({ image, title, time, icon }) => (
    <a className="dropdown-item" href="javascript:void(0);">
        <div className="flex items-center py-2 px-2 border border-textPrimary rounded hover:bg-bgPrimary ">
            {/* Imagen opcional */}
            {image && (
                <div className="my-auto">
                    <img
                        src={image}
                        alt="Notification"
                        className="rounded-full max-w-[40px] max-h-[40px] object-cover"
                    />
                </div>
            )}

            {/* Texto de la notificación */}
            <div className={`flex flex-col justify-center ${image ? "ml-3" : ""}`}>
                <h6 className="text-sm font-weight-normal mb-1">{title}</h6>
                <p className="text-xs text-secondary mb-0">
                    <i className="fa fa-clock me-1"></i>
                    {time}
                </p>
            </div>
        </div>
    </a>
);


export default NotificationItem;
