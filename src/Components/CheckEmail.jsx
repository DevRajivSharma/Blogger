import React from 'react';

function CheckEmail() {
    return (
        <div className={'md:h-165 h-135 flex justify-center items-center '}>
            <p className={'border mx-2 p-5 text-yellow-200'}>
                Email Verification link has been send to your email please verify your email  by clicking on link
            </p>
        </div>
    );
}

export default CheckEmail;