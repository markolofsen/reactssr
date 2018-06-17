import React, {Component} from 'react';

import {Link} from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import {confSite} from '../../../config/init.js'

import theme from './theme.scss'

export default class Footer extends Component {

    state = {}

	render() {
        const {config} = this.props
		return (
			<div className={theme.wrapper}>
                <div data-content-inner>
                    <ul>
                        <li data-li="logotype">
                            <h3>
                                {config.site_settings.sitename}
                            </h3>
                            <p>{config.site_settings.slogan}</p>
                        </li>
                        <li data-li="menu">
                            <ul>
                                <li>
                                    <Link to={`/p/free/`}>First order for free!</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to={`/p/news/`}>News</Link>
                                </li>
                                <li>
                                    <Link to={`/p/support/`}>Support</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>...</li>
                            </ul>
                            <div>
                                <div data-el="gototop" onClick={() => window.scrollTo(0,0)}>
                                    Go to top
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div data-el="copyright">
                        Copyright © {this.props.config.site_settings.year} All rights reserved. {this.props.config.site_settings.sitename}
                    </div>
                </div>
            </div>
		)
	}
}
