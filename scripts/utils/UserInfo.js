class UserInfo {
    constructor({ userName, userJob }) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent
        }
    };

    setUserInfo(info) {
        this._userName.textContent = info.name;
        this._userJob.textContent = info.job
    }
}

export default UserInfo
