# Comment

- Comment 컴포넌트는 Post 페이지 컴포넌트의 하위 컴포넌트로, PostDetail 컴포넌트 밑에 그려지는 댓글 작성란 및 Post가 가지는 댓글을 그리는 컴포넌트이다.

- Comment 컴포넌트는 Post 페이지 컴포넌트로부터 유저의 로그인 여부를 전달받아 댓글 작성란을 토글한다.

  ![Alt Text](../assets/components/comment-close.PNG)

  ![Alt Text](../assets/components/comment-open.PNG)

- 댓글 작성 기능은 Post 페이지 컴포넌트로 부터 addComment 핸들러를 전달받아 댓글 작성 버튼에 대한 클릭 이벤트로 구현한다.

  ![Alt Text](../assets/write-comment.gif)
