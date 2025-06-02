import React from "react";

const List = ({ items, renderItem }) => (
    <ul className="list-none m-0 p-0">
        {items.map((item, index) => (
            <li key={index} className="mb-2">
                {renderItem(item)}
            </li>
        ))}
    </ul>
);

export default List;

{/*
Se lo importa desde el NotificationItem
*/}