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

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._id = data.id
  }

  setUserAvatar({ avatar }) {
    this._profileAvatar.src = avatar
  }
}

export default UserInfo
