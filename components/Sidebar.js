import React from 'react';
import { withRouter } from 'react-router-native';
import { Text, Platform, Dimensions } from 'react-native';
import { List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { logout } from '../actions/user';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const loggedOutNavs = [
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' },
]

const loggedInNavs = [
  { name: 'Yahtzee', path: '/' },
  { name: 'Scores', path: '/scores' },
]

const navs = []

const navigate = (close, history, path) => {
  close();
  history.push(path);
}

const Sidebar = ({ close, history, isAuthenticated, dispatch }) => {
  const visibleNavs = isAuthenticated ? [...loggedInNavs, ...navs] : [...loggedOutNavs, ...navs]
  return (
    <List style={styles.drawer}>
      { visibleNavs.map( (nav, i) => {
          return (
            <ListItem key={i}>
              <Text
                onPress={() => navigate(close, history, nav.path) }
                style={styles.text}
              >
                {nav.name}
              </Text>
            </ListItem>
          )
        })
      }
      { isAuthenticated &&
          <ListItem>
            <Text
              style={styles.text}
              onPress={ () => {
                dispatch(logout())
                history.push('/login')
                close();
              }}
            >
              Logout
            </Text>
          </ListItem>
      }
    </List>
  )
}

const styles = {
  drawer: {
    height: deviceHeight / 3.5,
    width: deviceWidth / 1.4,
    marginBottom: 10,
  },
  text: {
    fontWeight: (Platform.OS === 'ios') ? '500' : '400',
    fontSize: 16,
  }
}

const mapStateToProps = (state) => {
  let isAuthenticated = state.user.id
  return { isAuthenticated }
}

export default withRouter(connect(mapStateToProps)(Sidebar));