const USER_PROFILE_PICTURE = "https://picsum.photos/80"
let feed = document.getElementById('feed')
let feedPosY = 0
let windowPosY = 0
let changeImg = 1

feed.innerHTML += `
<div class="new-post" id="new-post">
    <img class="post-profile-picture" src="${USER_PROFILE_PICTURE}" alt="icone do perfil">
    <div class="post-input" id="post-input" onclick="toggleModal()" id="new-post-input">Começar uma nova publicação</div>
</div>
`

function loadPost(profilePicture, profileName, postText, postImgContent) {
    if (profilePicture == null) {
        profilePicture = `https://picsum.photos/80?random=${changeImg}`
        profileName = "Lorem"
        postText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        postImgContent = `https://picsum.photos/450/300?random=${changeImg}`
    } 

    feed.innerHTML += `
    <div class="post">
        <div class="profile-info">
            <img class="post-profile-picture" src="${profilePicture}" alt="icone do perfil">
            <p class="profile-name">${profileName}</p>
        </div>
        <p class="post-text">${postText}</p>
        <img class="post-image" src="${postImgContent}" alt="post-image">
    </div>
    `
    changeImg++
}


function createModal() {
    let newPost = document.getElementById('new-post')
    newPost.innerHTML += `
    <div class="background-modal hide-modal">
        <div class="modal"> 
            <div class="close-btn" id="close-btn" onclick="toggleModal()">x</div>
            <textarea class="new-post-message" id="post-message" placeholder="No  que  você está pensando"></textarea>
            <input class="input-img-url" id="post-url" placeholder="Coleque a url da sua imagem" type="text">
            <div class="send-post-btn" onclick="publishNewPost()">Publicar</div>
        </div>
    </div>
    `
}


function toggleModal() {
    document.querySelector(".background-modal").classList.toggle('hide-modal')
}

window.addEventListener("scroll", () => {
    feedPosY = feed.offsetHeight
    windowPosY = window.pageYOffset
    console.log(feed.scrollMax)
    checkHeight()
})


function checkHeight() {
    // when the user reaches 70% of the page, more content is loaded
    if(windowPosY >= feedPosY * 0.70) {
        for (let i = 0; i < 5; i++) {
            loadPost()
        }
    }
}


function loadFirstPosts() {
    for (let i = 0; i < 5; i++) {
        loadPost()
    }
}

function publishNewPost() {
    let postMessage = document.getElementById('post-message').value
    let postUrl = document.getElementById('post-url').value
    console.log(postUrl)
    let profileName = "Wesley"
    loadPost(USER_PROFILE_PICTURE, profileName, postMessage, postUrl)
}

createModal()
loadFirstPosts()


