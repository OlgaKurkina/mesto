class UserInfo {
	constructor({ userName, userJob }) {
		this._userName = document.querySelector(userName);
		this._userJob = document.querySelector(userJob);
	}

	getUserInfo() {
		return {
			name: this._userName.textContent,
			job: this._userJob.textContent
		}
	};

	setUserInfo(data) {
		this._userName.textContent = data.name;
		this._userJob.textContent = data.job
	}
}

export default UserInfo
