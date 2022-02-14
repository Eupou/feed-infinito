export const USER_PROFILE_PICTURE = "https://picsum.photos/80";
const fakeDataBase = {
  likedImgs: [USER_PROFILE_PICTURE],
};

let feed = document.getElementById("feed");
let feedPosY = 0;
let windowPosY = 0;

/* 
 For the application to be able to get different images from the API,
 we are changing the index of the image we are getting 
*/
let changeImg = 1;

feed.innerHTML += `
<div class="new-post" id="new-post">
<img class="post-profile-picture" src="${USER_PROFILE_PICTURE}" alt="icone do perfil">
<div class="post-input" id="post-input" onclick="toggleModal()" id="new-post-input">Começar uma nova publicação</div>
</div>
`;

function loadPost(profilePicture, profileName, postText, postImgContent) {
  if (profilePicture == null) {
    profilePicture = `https://picsum.photos/80?random=${changeImg}`;
    profileName = "Lorem";
    postText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    postImgContent = `https://picsum.photos/450/300?random=${changeImg}`;
  }

  feed.innerHTML += `
    <div class="post" data-state="curtir" style="position: relative;">
        <div class="profile-info" onselect="return false">
            <img class="post-profile-picture" src="${profilePicture}" alt="icone do perfil">
            <p class="profile-name">${profileName}</p>
        </div>
        <p class="post-text">${postText}</p>
        <img class="post-image" src="${postImgContent}"  alt="post-image">
       
        <div class="container-like">
        </div>

        <div class="acoes">
            <div class="container-coracao-pequeno">
                <svg class="coracao-pequeno__vazio" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
            </div>
        </div>
    </div>
        `;

  let postImg = document.querySelectorAll(".post-image");

  postImg.forEach((e) => {
    e.addEventListener("dblclick", likeImg);
  });

  updateArrSmallHeart();

  changeImg++;
}

function updateArrSmallHeart() {
  let emptyHeart = document.querySelectorAll(".coracao-pequeno__vazio");
  let fullHeart = document.querySelectorAll(".coracao-pequeno__cheio");

  emptyHeart.forEach((e) => {
    e.addEventListener("click", likeImg);
  });

  fullHeart.forEach((e) => {
    e.addEventListener("click", likeImg);
  });
}

function createModal() {
  let newPost = document.getElementById("new-post");
  newPost.innerHTML += `
    <div class="background-modal hide-modal">
        <div class="modal"> 
            <div class="close-btn" id="close-btn" onclick="toggleModal()">x</div>
            <textarea class="new-post-message" id="post-message" placeholder="No  que  você está pensando"></textarea>
            <input class="input-img-url" id="post-url" placeholder="Coleque a url da sua imagem" type="text">
            <div class="send-post-btn" onclick="publishNewPost()">Publicar</div>
        </div>
    </div>
    `;
}

function toggleModal() {
  document.querySelector(".background-modal").classList.toggle("hide-modal");
}

function publishNewPost() {
  let postMessage = document.getElementById("post-message").value;
  let postUrl = document.getElementById("post-url").value;
  let profileName = "Wesley";

  loadPost(USER_PROFILE_PICTURE, profileName, postMessage, postUrl);
}

window.addEventListener("scroll", () => {
  feedPosY = feed.offsetHeight;
  windowPosY = window.pageYOffset;

  checkHeight();
});

function checkHeight() {
  // when the user reaches 70% of the page, more content is loaded
  if (windowPosY >= feedPosY * 0.7) {
    for (let i = 0; i < 5; i++) {
      loadPost();
    }
  }
}

function loadFirstPosts() {
  for (let i = 0; i < 5; i++) {
    loadPost();
  }
}

function likeImg(post) {
  const HTML_BIG_HEART = ` <svg class="coracao-grande__vermelho" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;
  const HTML_EMPTY_SMALL_HEART = `<svg class="coracao-pequeno__vazio" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>`;
  const HTML_FULL_SMALL_HEART = `<svg class="coracao-pequeno__cheio" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`;

  let postSmallHeart;
  let postBigHeart;
  let postState;

  if (post.type == "dblclick") {
    postSmallHeart = post.path[1].children[4].firstElementChild;
    postBigHeart = post.path[1].children[3];
    postState = post.path[1].dataset.state;
  } else {
    returnsTheHeartActivated("all vars");
  }

  // if the post was not liked it just has one class, so when s the post is not liked
  if (postState == "curtir") {
    postBigHeart.innerHTML = `
        <div class="container-coracao">
           <div class="coracao">
               ${HTML_BIG_HEART}
            </div>
        </div>
        `;

    postSmallHeart.innerHTML = HTML_FULL_SMALL_HEART;
    if (post.type == "dblclick") {
      post.path[1].dataset.state = "descurtir";
    } else {
      returnsTheHeartActivated("descurtir");
    }

    updateArrSmallHeart();
  } else {
    postSmallHeart.innerHTML = HTML_EMPTY_SMALL_HEART;
    postBigHeart.innerHTML = "";

    if (post.type == "dblclick") {
      post.path[1].dataset.state = "curtir";
    } else {
      returnsTheHeartActivated("curtir");
    }

    updateArrSmallHeart();
  }

  function returnsTheHeartActivated(state) {
    if (state == "all vars") {
      if (post.path[0].classList[0] == "coracao-pequeno__vazio") {
        postState = post.path[3].dataset.state;
        postBigHeart = post.path[3].children[3];
        postSmallHeart = post.path[1];
      } else {
        postState = post.path[4].dataset.state;
        postBigHeart = post.path[4].children[3];
        postSmallHeart = post.path[2];
      }
    } else {
      if (post.path[0].classList[0] == "coracao-pequeno__vazio") {
        post.path[3].dataset.state = `${state}`;
      } else {
        post.path[4].dataset.state = `${state}`;
      }
    }
  }
}

createModal();
loadFirstPosts();
