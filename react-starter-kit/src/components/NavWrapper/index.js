import React from 'react';
// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

// import Auth from './Auth'
import LeftMenu from './LeftMenu/'
// import Footer from './Footer';
// import {confSite} from '../../config/init.js'
import s from './theme.scss'

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		minHeight: '100vh'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([
			'width', 'margin'
		], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([
			'width', 'margin'
		], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 0
	},
	hide: {
		display: 'none'
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		height: '100%',
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		},
		"@media screen and (max-width: 960px)": {
			maxWidth: 0,
			border: 0
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		// padding: theme.spacing.unit * 3
		minWidth: 300,
		minHeight: '100vh',
		flexDirection: 'column',
		display: 'flex'
	},
	contentPage: {
		flex: 1,
		paddingTop: 64,
		"@media screen and (max-width: 600px)": {
			paddingTop: 56
		}
	},
	guttersWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0 !important',
		'& > ul': {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexWrap: 'nowrap',
			'& > li:first-child': {
				display: 'flex',
				alignItems: 'center',
			}
		}
	}
});

class MiniDrawer extends React.Component {
	state = {
		// open: false
	};

	handleDrawerOpen = () => {
		// this.setState({open: true});
		this.props.onToggleLeftMenu('toggle')
	};

	handleDrawerClose = () => {
		// this.setState({open: false});
		this.props.onToggleLeftMenu(false)
	};

	componentDidMount() {
		console.log('----!!')
		console.log(this.props)
	}

	render() {
		const {config, classes, theme} = this.props;


		return (
			<div className={classes.root}>
				<AppBar position="fixed" className={classNames(classes.appBar)}>
					<Toolbar disableGutters={!this.props.config.menu_left} className={classes.guttersWrapper}>
						<ul className={s.headerWrapper}>
							<li data-css="li-headerlogo">
								<IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton)}>
									<Icon>menu_icon</Icon>
								</IconButton>
								<Typography variant="title" color="inherit" noWrap>
									<a>TBOOK
										<sup>(1.1)</sup>
									</a>
								</Typography>
							</li>
							<li data-css="li-toolbar">
								Auth
							</li>
						</ul>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" data-menu-drawer={this.props.config.menu_left
					? 'active'
					: 'inactive'} classes={{
					paper: classNames(classes.drawerPaper, !this.props.config.menu_left && classes.drawerPaperClose)
				}} open={this.props.config.menu_left}>

					<div className={classes.toolbar}>
						{true == false &&
							<IconButton onClick={this.handleDrawerClose}>
							{theme.direction === 'rtl'
								? <Icon>chevron_right_icon</Icon>
								: <Icon>chevron_left_icon</Icon>}
						</IconButton>}
						<Divider/>
						<LeftMenu />

					</div>

				</Drawer>
				<main className={classes.content}>
					<div className={classes.contentPage}>
						{this.props.children}
					</div>

				</main>
			</div>
		);
	}
}

MiniDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};



export default connect((mapStateToProps) => (mapStateToProps), dispatch => ({
	onToggleLeftMenu: (payload) => {
		dispatch({type: 'LEFT_MENU_TOGGLE', payload})
	}
}))(withStyles(styles, {withTheme: true})(MiniDrawer));
