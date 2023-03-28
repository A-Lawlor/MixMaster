import React from 'react';
import Toast from 'react-bootstrap/Toast';

export function Confirmation({toggle})
{
    return(
        <toast onClose={()=> toggle(false)}>
            <Toast>
            <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="mr-auto">You have followed a user!</strong>
                <small>Just now</small>
            </Toast.Header>
            <Toast.Body>
                You have now gained a follower!
            </Toast.Body>
            </Toast>
        </toast>
    );

}