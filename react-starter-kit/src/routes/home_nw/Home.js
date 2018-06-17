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
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

//
// export const query = gql`
// query ListViewSearch($search: String, $endCursor: String) {
//   allMessages(first: 2, message_Icontains: $search, after: $endCursor) {
//     edges {
//       node {
//         id, message
//       }
//     },
//     pageInfo {
//       hasNextPage,
//       hasPreviousPage,
//       startCursor,
//       endCursor
//     }
//   }
// }
// `


class Home extends React.Component {
  static propTypes = {
    // news: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     title: PropTypes.string.isRequired,
    //     link: PropTypes.string.isRequired,
    //     content: PropTypes.string,
    //   }),
    // ).isRequired,
  };


  async te() {
    // const resp_request = {
    //   query: JSON.stringify({
    //     query: 'allMessages{edges{node{id,message}}}',
    //   })
    // }
    const resp_request = `
      query {
        allMessages {
          edges {
            node {
              id,
              message
            }
          }
        }
      }
    `
    const resp = await fetch(`http://127.0.0.1:8000/graphql?query=${resp_request}`)
    console.log(resp)
  }

  componentDidMount() {
    console.log('----')
    console.log(this.props)
  }

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 onClick={this.te}>React.js News</h1>
          {this.props.data.map((item, index) => (
            <article key={index} className={s.newsItem}>
              <h1 className={s.newsTitle}>
                — <a href={item.id}>{item.node.message}</a>
              </h1>
              <div
                className={s.newsDesc}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: item.node.message }}
              />
            </article>
          ))}
        </div>
      </div>
    );
  }
}

//
// const queryOptions = {
//   options: props => ({
//     variables: {
//       // search: queryString.parse(props.location.search).search,
//       endCursor: null,
//     },
//   }),
// }
//
// Home = graphql(query, queryOptions)(Home)
// export default Home

// export default withStyles(s)(Home);
export default (connect((mapStateToProps) => (mapStateToProps), dispatch => ({
	// onToggleLeftMenu: (payload) => {
	// 	dispatch({type: 'LEFT_MENU_TOGGLE', payload})
	// }
}))(withStyles(s)(Home)));
