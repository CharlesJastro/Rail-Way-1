import React from 'react';
import './Header.css';
import {Image} from 'semantic-ui-react';
import trainImg from './classic_locomotive_train_312396.jpg';

// Javascript class rendering logo image
class Header extends React.Component {
    render() {
        return (
            <div>
                <Image src={trainImg} alt="train" centered size="large" /> 
            </div>
        )
    } 
}

export default Header;