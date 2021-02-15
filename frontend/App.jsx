import React from 'react';
import { css } from 'aphrodite';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

import { isCompositeType } from 'graphql';
import Text from './lib/Text';
import customStyleSheet from './lib/customStyleSheet';
import evergreenIcon from './img/evergreen_icon.png';
import getImageUri from './utils/getImageUri';
import VendorTable from './components/VendorTable';

const GET_USER_QUERY = gql`
query GetUser($id: Int!) {
  user(id: $id) {
    firstName
    lastName
    admin
  }
}
`;

const GET_VENDORS_QUERY = gql`
query GetVendors {
  vendors {
    id
    name
    description
    externalLink
    category
    status
    risk
  }
}
`;

const UPDATE_VENDOR_QUERY = gql`
mutation updateVendor($category: String, $id: Int, $status:Int!) {
  updateVendor(category:$category, id:$id, status:$status) {
  vendor {
    id
    name
    description
    externalLink
    category
    status
    risk
  }
  }
}`;

const styles = customStyleSheet(({ color, bp }) => ({
  logo: {
    height: 40,
    width: 40,
    marginRight: 2 * bp,
  },
  container: {
    backgroundColor: color.background,
    height: '100vh',
  },
}));

function App() {
  const { data } = useQuery(GET_USER_QUERY, {
    variables: {
      id: 2,
    },
  });

  const user = data && data.user;
  const vendor_data = ListVendors(user);
  const titleText = user
    ? `Welcome to Evergreen ${user.firstName} ${user.lastName}!`
    : 'Welcome to Evergreen!';

  return (
    <div className={css(styles.container)}>

      <Text title1>
        <img
          className={css(styles.logo)}
          src={getImageUri(evergreenIcon)}
          alt="logo"
        />
        {titleText}
      </Text>
      <div>
        {vendor_data}
      </div>
    </div>
  );
}

function ListVendors(user) {
  const { loading, error, data } = useQuery(GET_VENDORS_QUERY);
  if (loading) return 'loading';
  if (error) return `Error! ${error}`;
  const admin = user.admin;
  return (
    <VendorTable vendors_list={data.vendors} isAdmin={admin} query={UPDATE_VENDOR_QUERY} />
  );
}

export default App;
