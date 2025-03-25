import React from 'react';

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    className="",
    ...props
}) {
    return (
        <button
        className={`${className} ${bgColor} `} {...props}>
            {children}
        </button>
    );
}

export default Button;