import React, { useState } from 'react';

import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  const [profile, setProfile] = useState({ name: user.name, color: user.color, pet: user.pet });

  const updateProfile = () => {
    fetch(process.env.REACT_APP_API_URL + '/profile/' + user.id, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    }).then(resp => {
      toggleModal();
      loadUser({ ...user, ...profile });
      return resp.json();
    })
      .then(console.log)
      .catch(err => console.log(err + "cannot fetch profile" + user.id));

  }
  return (
    <div className="profile-modal">
      <main className="absolute pa4 black-80 br3 ba shadow-5 b--black-10  bg-white-90 mb2 w-100 w-70-m w-30-l mw6 center ">
        <div className="f2 b absolute right-0 top-0 mr4 mt3 pointer black-50 hover-black"
          onClick={toggleModal}>&times;</div>
        <img src="http://tachyons.io/img/logo.jpg"
          className="br-100 ba w3 dib" alt="avatar" />
        <h1>{profile.name}</h1>
        <h5 className="b">{user.username}</h5>
        <h4>Images submited: {user.entries}</h4>
        <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
        <hr />
        <label className="mt2 fw6 lh-copy f6" htmlFor="username">Name</label>
        <input
          className="pa2 w-100" type="text" name="name" id="name" autoComplete="off"
          defaultValue={user.name}
          required
          onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

        <label className="mt2 fw6 lh-copy f6" htmlFor="color">Color</label>
        <input
          className="db pa2 w-20" type="color" name="color" id="color" autoComplete="off"
          defaultValue={user.color}
          required
          onChange={(e) => setProfile({ ...profile, color: e.target.value })} />
        <label className="db mt2 fw6 lh-copy f6" htmlFor="pet">Pet</label>
        <input
          className="pa2 w-100" type="text" name="pet" id="pet" autoComplete="off"
          defaultValue={user.pet}
          required
          onChange={(e) => setProfile({ ...profile, pet: e.target.value })} />
        <div className="mt4 flex justify-between">
          <button className="b pa2 grow pointer hover-white w-20 bg-light-blue b--black-20"
            onClick={updateProfile}>Save</button>
          <button className="b pa2 grow pointer hover-white w-20 bg-light-red b--black-20"
            onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </main>
    </div>
  );

}

export default Profile;