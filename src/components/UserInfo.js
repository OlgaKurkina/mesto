class UserInfo {
  constructor({ userName, userJob, profileAvatar }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._userName.textContent,
      about: this._userJob.textContent
    }
  };

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._profileAvatar.src = avatar;
    this._id = _id;
  }
}

export default UserInfo
