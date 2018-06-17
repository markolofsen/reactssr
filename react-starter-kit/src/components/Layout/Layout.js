/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import CssBaseline from '@material-ui/core/CssBaseline';

// external-global styles must be imported in your JS.
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles';

import { withTheme } from '@material-ui/core/styles'

import normalizeCss from 'normalize.css';
import s from './Layout.css';
// import 'normalize.css';
// import {withStyles} from '@material-ui/core/styles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

import NavWrapper from '../NavWrapper/'




// const muiTheme = createMuiTheme({
//     palette: {
//         primary1Color: '#f0f8fb',
//         primary2Color: '#f0f8fb',
//         secondary1Color: '#f0f8fb',
//         pickerHeaderColor: '#f0f8fb',
//     },
// });
import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';

const muiTheme = createMuiTheme({
  typography: {
    // fontFamily: 'Montserrat',
    // fontSize: '5rem'
  },
  palette: {
    primary: lightBlue,
    secondary: amber
  },
  overrides: {
    MuiAppBar: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        boxShadow: 'none',
      },
    },
  },
});


class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <MuiThemeProvider theme={muiTheme}>
          <NavWrapper>
            <Header />
              {this.props.children}
            <Feedback />
            <Footer />
          </NavWrapper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withTheme()(withStyles(s)(Layout));
