import React from 'react';

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className="",
    ...props
}) {
    return (
        <Button
        className={`${className} ${bgColor} ${textColor}`} {...props}>
            {children}
        </Button>
    );
}

export default Button;