import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").filter((el) => el !== "");

    return (
        <nav className="text-sm breadcrumbs">
            <ol className="list-reset flex text-gray-500 space-x-2">
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">
                        FeelFlow
                    </Link>
                </li>
                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1;
                    const fullPath = "/" + paths.slice(0, index + 1).join("/");

                    return (
                        <React.Fragment key={fullPath}>
                            <span className="mx-2">/</span>
                            <li>
                                {isLast ? (
                                    <span className="text-gray-700">{path}</span>
                                ) : (
                                    <Link to={fullPath} className="text-blue-500 hover:underline">
                                        {path}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
