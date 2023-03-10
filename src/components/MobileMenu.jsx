import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Filter } from './Filter';



export const MobileMenu = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className="mobileMenu"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <Filter />
    </div>
  );

  return (
    <div className="mobileMenu_icon" >
      {['right'].map(anchor => (
        <React.Fragment key={anchor} >
          <MenuIcon
            htmlColor="#fff"
            fontSize="large"
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer

            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            // className='global-color'
            // htmlColor='tomato'
            
          
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
