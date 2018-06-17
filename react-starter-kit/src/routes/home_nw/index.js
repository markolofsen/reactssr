/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';


async function action({ fetch }) {
  // const resp = await fetch('/graphql', {
  //   body: JSON.stringify({
  //     query: '{news{title,link,content}}',
  //   }),
  // });

  const resp_request = 'query{allMessages{edges{node{id,message}}}}'
  const resp = await fetch(`http://127.0.0.1:8000/graphql?query=${resp_request}`)
  // const resp = await fetch('http://127.0.0.1:8000/graphql' );


  const { data } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: (
      <Layout>
        {true === true && <Home data={data.allMessages.edges} />}
      </Layout>
    ),
  };
}

export default action;
