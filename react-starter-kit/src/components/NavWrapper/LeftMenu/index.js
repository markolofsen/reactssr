import React from 'react';
// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';

import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import Preloader from '../../Preloader';

const _ = require('lodash');

import style from './theme.scss'

class MenuGenerator extends React.Component {

	state = {
		menu: false,
		open: true
	}

	componentDidMount() {
		this.setState({menu: this.props.data})
	}

	handleClick = () => {
		if (this.props.config.menu_left) {
			this.setState({
				open: !this.state.open
			});
		} else {
			this.setState({open: true});
			this.props.onToggleLeftMenu(true)
		}
	};

	render() {
		const {label} = this.props
		const {menu} = this.state

		if (!menu) {
			return <div/>
		}

		return (
			<List component="nav" subheader={<ListSubheader component="div" data-menu-label>{label}</ListSubheader>}>

				{menu.map((item, index) => {
					if (typeof item.submenu != 'undefined') {
						return (
							<div key={index}>
								<ListItem button onClick={this.handleClick}>
									<ListItemIcon>
										<Icon>{item.icon}</Icon>
									</ListItemIcon>
									<ListItemText inset primary={item.label}/> {this.state.open
										? <Icon>expand_less</Icon>
										: <Icon>expand_more</Icon>}
								</ListItem>
								<Collapse in={this.state.open} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										{item.submenu.map((subitem, subindex) => {
											let sublink = `/p/posts/${subitem.slug}/`
											return (
												<div key={`subitem-${index}-${subindex}`}>
													<a href={sublink} data-menulist-submenu>
														<ListItem button dense>
															<ListItemText primary={subitem.label}/>
															<ListItemSecondaryAction data-menulist-hint>
																{subitem.hint}
															</ListItemSecondaryAction>
														</ListItem>
													</a>
												</div>
											)
										})}
									</List>
								</Collapse>
							</div>
						)
					} else {
						if (item.label == 'divider') {
							return (<Divider key={index}/>)
						} else {
							return (
								<a href={item.link} key={index}>
									<ListItem button data-menulist-item>
										{item.icon && <ListItemIcon>
											<Icon>{item.icon}</Icon>
										</ListItemIcon>}
										<ListItemText primary={item.label}/>
									</ListItem>
								</a>
							)
						}
					}
				})}

			</List>
		)
	}
}

const styles = theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		background: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	}
});

class MenuComponent extends React.Component {

	state = {}

	// componentDidMount() {
	// 	console.log('//////')
	// 	console.log(this.props.config)
	// }

	render() {

		const {user, config} = this.props

		const menu_public = [
			{
				icon: 'home',
				link: '/',
				label: 'Home'
			}, {
				label: 'divider'
			}, {
				icon: 'folder',
				link: '/p/posts/',
				label: 'Categories',
				// submenu: config.site_settings.catalog_menu,
				submenu: [
					{
						label: 'Дизайн',
						slug: false,
						hint: 0
					}, {
						label: 'Разработка и IT',
						slug: false,
						hint: 0
					}, {
						label: 'Тексты и переводы',
						slug: false,
						hint: 0
					}, {
						label: 'Маркетинг и реклама',
						slug: false,
						hint: 0
					}, {
						label: 'SEO и трафик',
						slug: false,
						hint: 0
					}, {
						label: 'Бизнес',
						slug: false,
						hint: 0
					}, {
						label: 'Аудио и видео',
						slug: false,
						hint: 0
					}, {
						label: 'Стиль жизни',
						slug: false,
						hint: 0
					}
				]
			}, {
				label: 'divider'
			}, {
				icon: 'stars',
				link: '/p/account/orders/',
				label: 'My orders'
			}, {
				icon: 'settings',
				link: '/',
				label: 'My settings'
			}, {
				label: 'divider'
			}, {
				icon: 'help',
				link: '/p/support/',
				label: 'Support'
			}
		];

		// return <div />

		// if (config.site_settings.catalog_menu) {
			return (
				<div className={style.leftMenu}>
					<MenuGenerator data={menu_public} label="Menu" {...this.props}/>
					<Divider/>
				</div>
			);
		// }

		return <Preloader/>
	}
}

MenuComponent.propTypes = {
	classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(MenuComponent);

export default connect((mapStateToProps) => (mapStateToProps), dispatch => ({
	onToggleLeftMenu: (payload) => {
		dispatch({type: 'LEFT_MENU_TOGGLE', payload})
	}
}))(withStyles(styles)(MenuComponent));
