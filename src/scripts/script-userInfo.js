export default class UserInfo {
    constructor(name, job, nameEl, jobEl) {
        this.name = name;
        this.job = job;
        this.nameEl = nameEl;
        this.jobEl = jobEl;
    }
    setUserInfo(name, job) {
        this.name = name;
        this.job = job;
    }
    getUserInfo(){
        return {
            name: this.name,
            job: this.job
        }
    }
    updateUserInfo() {
        this.nameEl.textContent = this.name;
        this.jobEl.textContent = this.job;
    }
}
