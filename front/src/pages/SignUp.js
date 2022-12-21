import axios from 'axios';

import userSchema from '../lib/userSchema';

import { Component } from '../common';

class SignUp extends Component {
  async render() {
    const canSubmit = this.state?.canSubmit ?? false;
    const { data: accessUser } = await axios.get('/api/accessUser');

    if (accessUser) {
      window.history.pushState(null, null, '/');
      this.setState();
    }

    const email = this.state?.email;
    const authorname = this.state?.authorname;
    const pwd = this.state?.pwd;
    const pwd2 = this.state?.pwd2;

    return `
      <header class="user-header">
        <div class='logo route' data-route="/"></div>
      </header>
      <form class="signup-form">
        <h1 class="title">SIGNUP</h1>
        <div class="signup-container">
        <label for="email">이메일</label>
          <input
            name="email"
            type="email"
            minlength="8"
            value="${email?.value ?? ''}"
            required
          />
          <button class="unique-btn" type="button">${canSubmit ? '사용 가능한 이메일' : '중복 확인'}</button>
          <span class="error-msg ${canSubmit ? 'success' : ''}">${email?.errMsg ?? ''}</span>
          <label for="authorname">이름</label>
          <input
            id="authorname"
            name="authorname"
            type="text"
            class="signin-username"
            minlength="2"
            maxlength="5"
            value="${authorname?.value ?? ''}"
            required
          />
        
          <span class="error-msg">${authorname?.errMsg ?? ''}</span>
          <label for="pwd">비밀번호</label>
          <input
          name="pwd"
            type="password"
            class="signin-pwd"
            minlength="6"
            required?
          />
          <span class="error-msg">${pwd?.errMsg ?? ''}</span>
          <label for="pwd2">비밀번호 재확인</label>
          <input
            name="pwd2"
            type="password"
            class="signin-pwd2"
            minlength="6"
            required
          />
          <span class="error-msg">${pwd2?.errMsg ?? ''}</span>
          <button type="submit" class="signup-btn" ${canSubmit ? '' : 'disabled="disabled"'}}>회원가입</button>
          <div class="user-link">
            <a href="/signin">로그인</a>
          </div>
        </div>
      </form>
    `;
  }

  // input의 값이 조건에 맞지 않다면 해당 input로 focus가 이동한다.(위에서부터 차례로)
  moveFocus() {
    if (!this.userSchema.email.valid) this.email.focus();
    else if (!userSchema.authorname.valid) this.authorname.focus();
    else if (!userSchema.pwd.valid) this.pwd.focus();
    else if (!userSchema.pwd2.valid) this.pwd2.focus();
  }

  async isUniqueId(e) {
    const email = e.target.closest('form').email.value.trim();
    const { data } = await axios.post('/api/isUniqueId', { id: email });
    this.setState({
      ...this.state,
      canSubmit: data,
      email: { value: email, errMsg: data ? '사용가능한 아이디입니다.' : '이미 존재하는 아이디입니다.' },
    });
  }

  // 서버에게 새로운 회원의 데이터를 전송한다.
  async postUser() {
    const {
      email, //
      authorname,
      pwd,
    } = this.userSchema;

    await axios.post('/api/signup', {
      id: email.value,
      authorname: authorname.value,
      pwd: pwd.value,
    });

    window.history.pushState(null, null, '/signin');
    this.setState();
  }

  validationUser(e) {
    e.preventDefault();

    const signupForm = e.target;
    this.setState({
      email: userSchema.email.valid(signupForm.email.value),
      authorname: userSchema.authorname.valid(signupForm.authorname.value),
      pwd: userSchema.pwd.valid(signupForm.pwd.value),
      pwd2: userSchema.pwd2.valid(signupForm.pwd2.value),
    });
    if (userSchema.signupValid) this.postUser();
  }

  addEventListener() {
    return [
      { type: 'submit', selector: '.signup-form', handler: this.validationUser.bind(this) },
      { type: 'click', selector: '.unique-btn', handler: this.isUniqueId.bind(this) },
    ];
  }
}

export default SignUp;
