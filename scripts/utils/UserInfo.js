class UserInfo {
    constructor({ userName, userJob }) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = nameInput.value;
            this._formValues[input.job] = jobInput.value;
        });

        // возвращаем объект значений
        return this._formValues;
    }

    setUserInfo() {
        nameInput.value = profileUserName.textContent;
        jobInput.value = profileUserDescription.textContent;
    }
}

export default UserInfo
