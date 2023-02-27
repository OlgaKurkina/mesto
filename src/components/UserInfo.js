class UserInfo {
	constructor({ userName, userJob }) {
		this._userName = document.querySelector(".popup__input_type_name");
		this._userJob = document.querySelector(".popup__input_type_job");
	}

	getUserInfo() {
		return {
			name: this._userName.textContent,
			job: this._userJob.textContent
		}
	};

	setUserInfo({ name, job }) {
		this._userName.textContent = name;
		this._userJob.textContent = job
	}
}

export default UserInfo
