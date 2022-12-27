import React from 'react';
import PropTypes from 'prop-types';
import { ProfileCard } from './UserCard/UserCard';
import users from '../data/users.json';
import css from '../components/App.module.css'

export class App extends React.Component {
  state = {
    users: users.map(user => {
      return { ...user, followingCard: false };
    }),
  };

  componentDidMount() {
    const users = localStorage.getItem(`users`);
    const parsedUsers = JSON.parse(users);
    if (parsedUsers) {
      this.setState({ users: parsedUsers})
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.users !== prevState.users) {
      localStorage.setItem('users', JSON.stringify(this.state.users))
    }
  }

  onFollowClick = e => {
    this.setState(prevState => {
      return {
        users: prevState.users.map(user => {
          if (user.id === Number(e.target.id)) {
            const newfollowingCard = !user.followingCard;
            return {
              ...user,
              followingCard: newfollowingCard,
              followers: newfollowingCard
                ? user.followers + 1
                : user.followers - 1,
            };
          }
          return user;
        }),
      };
    });
  };

  render() {
    const allUsers = this.state.users;
    return (
      <div className={css.container}>
        {allUsers.map(
          ({ id, tweets, followers, avatar, user, followingCard }) => {
            const followersChanges = followers.toLocaleString('en');
            return (
              <ProfileCard
                key={id}
                id={id}
                tweets={tweets}
                followers={followersChanges}
                avatar={avatar}
                user={user}
                followingCard={followingCard}
                onFollowClick={this.onFollowClick}
                />
            );
          }
        )}
      </div>
    );
  }
}

App.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tweets: PropTypes.number,
      followers: PropTypes.number,
      avatar: PropTypes.string,
      user: PropTypes.string,
      followingCard: PropTypes.array,
      onFollowClick: PropTypes.func,
    })
  ),
}