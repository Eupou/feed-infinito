let postUserImg = document.querySelector(".post-profile-picture");
let postText = document.querySelector(".post-text");
let postImg = document.querySelector(".post-image");
let postActions = document.querySelector(".acoes");
let totalHeight =
  postUserImg.clientHeight +
  postText.clientHeight +
  postImg.clientHeight +
  postActions.clientHeight +
  50;

function updatePostArr() {
  let post = document.querySelectorAll(".post");
  post.forEach((post) => {
    post.style.height = `${totalHeight}px`;
  });
}

updatePostArr();
