import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';


const SocialMedia = () => (
    <div className="app__social">
        <div>
            <a href='https://www.linkedin.com/in/nisha-c-a15b59220/'>
                <BsLinkedin />
            </a>
        </div>
        <div>
            <a href='https://www.facebook.com/dhchnsh17/'>
                <FaFacebookF />
            </a>
        </div>
        <div>
            <a href='https://github.com/nisha8c'>
                <BsGithub />
            </a>
        </div>
        <div>
            <a href='https://www.instagram.com/dcntk871/'>
                <FaInstagram />
            </a>
        </div>

    </div>
);

export default SocialMedia;