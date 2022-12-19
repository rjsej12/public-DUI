import axios from 'axios';
import { Component } from '../common';
import { MainNav, PostDetail, Comment } from '../components';

class Post extends Component {
  async render() {
    const pathId = +window.location.pathname.split('/')[2];

    const { isUser: isValidUser, canEdit, post } = await this.getPost(pathId);

    const likes = isValidUser ? (await axios.get('/like')).data : null;

    const mainNav = new MainNav({ isValidUser }).render();
    const postDetail = new PostDetail({
      post,
      deletePost: this.deletePost,
      isValidUser,
      canEdit,
      addLike: this.addLike.bind(this),
      likes,
    }).render();
    const comment = new Comment().render();

    return `
      ${mainNav}
      ${postDetail}
      ${comment}
    `;
  }

  async getPost(id) {
    const { data: post } = await axios.get(`/post/${id}`);

    return post;
  }

  deletePost(e) {
    const id = +e.target.closest('article').id;
    axios.delete(`/post/${id}`);
  }

  addLike(e) {
    const id = +e.target.closest('article').id;
    axios.post('/like', { id });
    this.setState({ temp: 'ss' });
  }
}

export default Post;
