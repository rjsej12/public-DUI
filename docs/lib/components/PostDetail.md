# PostDetail

- PostDetail 컴포넌트는 Post 페이지 컴포넌트의 하위 컴포넌트로, 그려야 하는 post 정보를 통해 실질적인 post들을 그리는 컴포넌트이다.

- 이를 위해 Post 페이지 컴포넌트에서 서버에서 그려야 하는 post 정보를 받아와 props로 전달받는다.

- 만약 로그인한 유저가 그려지는 post의 작성자라면 수정하기와 삭제하기 버튼을 보여준다.

- 수정하기 기능은 선택된 post의 id를 통해 edit/:id 페이지로 이동해 구현한다.

- 삭제하기 기능은 Post 페이지 컴포넌트로 부터 deletePost 핸들러를 전달받아 삭제하기 버튼에 대한 클릭 이벤트로 구현한다.

</br>

![postDetail](../assets/components/postDetail.png)
