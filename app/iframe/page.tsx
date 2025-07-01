import React from 'react';

const IframePage = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-100px)] w-full">
            <iframe
                src="https://customerportal.diggecard.com/auth"
                className="h-full w-full border-0"
                    title="Diggecard Auth"
                />
        </div>
    );
};

export default IframePage; 