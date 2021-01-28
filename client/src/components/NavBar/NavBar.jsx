import React, { Component } from 'react'
/*import { Menu } from 'semantic-ui-react'*/
import {Link} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import './NavBar.css';

// Javascript class rendering navbar
class NavBar extends Component {
    render() {
        return (
            <div className="">
          
               <Button as={Link} to="/">Routes</Button> 
               <Button as={Link} to="/travel">Travel</Button> 
               <Button as={Link} to="/favourites">Favourites</Button> 
            </div>
        );
    }
    
    
    /*state = {}

    componentDidMount() {
        this.setState({activeItem: 'routes'});
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
          <Menu fluid widths={3}>
            <Menu.Item
              name='routes'
              active={activeItem === 'routes'}
              onClick={this.handleItemClick}
            >
              Routes
            </Menu.Item>

            <Menu.Item
              name='travel'
              active={activeItem === 'travel'}
              onClick={this.handleItemClick}
            >
              Travel
            </Menu.Item>

            <Menu.Item
              name='favourites'
              active={activeItem === 'favourites'}
              onClick={this.handleItemClick}
            >
              Favourites
            </Menu.Item>
          </Menu>
        )
    }*/
}

export default NavBar;