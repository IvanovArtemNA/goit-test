import React from 'react';
import headImage from '../../images/image.png';
import logoCompany from '../../images/logo.png';
import css from './UserCard.module.css';

export class ProfileCard extends React.Component {
  render() {
    const {
      avatar,
      user,
      tweets,
      id,
      followers,
      followingCard,
      onFollowClick,
    } = this.props;
    return (
      <div className={css.cardMarkup} id={id}>
        <img className={css.cardLogo} src={logoCompany} alt="logo" />
        <img className={css.cardImage} src={headImage} alt="img" />
        <span className={css.cardImageContainer}>
          <img className={css.cardProfileImage} src={avatar} alt={user} />
        </span>
        <ul className={css.cardProfileInfoList}>
          <li>{tweets} TWEETS</li>
          <li>{followers} FOLLOWERS</li>
        </ul>
        <button
          type="button"
          onClick={onFollowClick}
          id={id}
          className={followingCard ? css.following : css.follow}
        >
          {followingCard ? 'FOLLOWING' : 'FOLLOW'}
        </button>
      </div>
    );
  }
}
