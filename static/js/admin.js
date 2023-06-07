function previewImgMain() {
    preview = document.querySelector("#previewImg_main");
    file = document.querySelector("#previewLoad_main").files[0];
    previewFile(preview, file);
    preview = document.querySelector("#patternImg_main");
    previewFile(preview, file);
    document.querySelector("#content__optionsMain").style.display = "flex";
    document.querySelector("#previewUpload_main").style.display = "none";
    document.querySelector("#previewImg_main").style.display = "block";
    document.querySelector(".article_block__main").style.display = "none";
    document.querySelector(".content__preview_main").style.border = "none";
    document.querySelector("#patternImg_main").style.display = "block";
}

function previewImgMini() {
    preview = document.querySelector("#previewImg_mini");
    file = document.querySelector("#previewLoad_mini").files[0];
    previewFile(preview, file);
    preview = document.querySelector("#patternImg_mini");
    previewFile(preview, file);
    document.querySelector("#content__optionsMini").style.display = "flex";
    document.querySelector("#previewUpload_mini").style.display = "none";
    document.querySelector("#previewImg_mini").style.display = "block";
    document.querySelector(".post_block__mini").style.display = "none";
    document.querySelector(".content__preview_mini").style.border = "none";
    document.querySelector("#patternImg_mini").style.display = "block";
}

function previewImgAvatar() {
    preview = document.querySelector("#previewImg_author");
    file = document.querySelector("#previewLoad_author").files[0];
    previewFile(preview, file);
    preview = document.querySelector("#patternImg_avatar");
    previewFile(preview, file);
    document.querySelector("#content__optionsAuthor").style.display = "flex";
    document.querySelector("#previewUpLoad_author").style.display = "none";
    document.querySelector("#previewImg_author").style.display = "block";
    document.querySelector(".photo_author__author").style.display = "none";
    document.querySelector(".avatar__photo").style.display = "none";
    document.querySelector(".preview_author__photo_author").style.border = "none";
    document.querySelector("#patternImg_avatar").style.display = "block";
}

function inputDeleteMain() {
    document.querySelector("#content__optionsMain").style.display = "none";
    document.querySelector("#previewUpload_main").style.display = "flex";
    document.querySelector("#previewImg_main").style.display = "none";
    document.querySelector(".article_block__main").style.display = "block";
    document.querySelector(".content__preview_main").style.border = "1px dashed #D3D3D3";
    document.querySelector(".article_block__main").style.display = "block";
    document.querySelector("#patternImg_main").style.display = "none";
}

function inputDeleteMini() {
    document.querySelector("#content__optionsMini").style.display = "none";
    document.querySelector("#previewUpload_mini").style.display = "flex";
    document.querySelector("#previewImg_mini").style.display = "none";
    document.querySelector(".post_block__mini").style.display = "block";
    document.querySelector(".content__preview_mini").style.border = "1px dashed #D3D3D3";
    document.querySelector("#patternImg_mini").style.display = "none";
}

function inputDeleteAvatar() {
    document.querySelector("#content__optionsAuthor").style.display = "none";
    document.querySelector("#previewUpLoad_author").style.display = "flex";
    document.querySelector("#previewImg_author").style.display = "none";
    document.querySelector(".photo_author__author").style.display = "block";
    document.querySelector(".avatar__photo").style.display = "block";
    document.querySelector(".preview_author__photo_author").style.border = "1px dashed #D3D3D3";
    document.querySelector("#patternImg_avatar").style.display = "none";
}

function inputInfotitle() {
    let someTitle = "#title";
    (inputInfo(someTitle));
    document.querySelector("#preview__title").innerText = document.querySelector(someTitle).value;
    document.querySelector("#pattern__title").innerText = document.querySelector(someTitle).value;
    if (document.querySelector("#preview__title").innerText == "") {
        document.querySelector("#preview__title").innerText = "Enter Article title";
    }
    if (document.querySelector("#pattern__title").innerText == "") {
        document.querySelector("#pattern__title").innerText = "Enter Article title";
    }
}

if (document.querySelector("#title").value == "") {
    document.querySelector("#title").value = "Enter Article title";
    document.querySelector("#title").style.background = "#F7F7F7";
}

function inputInfoSubtitle() {
    let someSubtitle = "#subtitle";
    (inputInfo(someSubtitle));
    document.querySelector("#preview__subtitle").innerText = document.querySelector(someSubtitle).value;
    document.querySelector("#pattern__subtitle").innerText = document.querySelector(someSubtitle).value;
    if (document.querySelector("#subtitle").value == "") {
        document.querySelector("#preview__subtitle").innerText = "Enter Short description";
        document.querySelector("#pattern__subtitle").innerText = "Enter Short description";
    }
}

if (document.querySelector("#subtitle").value == "") {
    document.querySelector("#subtitle").value = "Enter Short description";
    document.querySelector("#subtitle").style.background = "#F7F7F7";
}


function inputInfoAuthor() {
    let author = "#author";
    inputInfo(author);
    document.querySelector(".post_author__author-name").innerText = document.querySelector(author).value;
}

function inputInfoDate() {
    let someDate = "#date";
    document.querySelector(".post_author__date").innerText = document.querySelector(someDate).value;
}

if (document.querySelector("#date").value == "") {
    document.querySelector("#title").value = "Enter Article title";
    document.querySelector("#date").style.background = "#F7F7F7";
}


function inputInfoLogin() {
    let login = "#content__login";
    inputInfo(login);;
}
function inputInfoPassword() {
    let password = "#content__password";
    inputInfo(password);;
}

function inputInfo(elem) {
    if (document.querySelector(elem).value != "") {
        document.querySelector(elem).style.background = "#F7F7F7";
    }
    if (document.querySelector(elem).value == '') {
        document.querySelector(elem).style.background = "#FFFFFF";
    }
}

function previewFile(preview, file) {
    const reader = new FileReader();
    reader.addEventListener(
        "load",
        () => {
            preview.src = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
}

const title = document.querySelector("#title");
const subtitle = document.querySelector("#subtitle");
const avatar = document.querySelector("#author");
const avatar_image = document.querySelector("#previewLoad_author");
const main_image = document.querySelector("#previewLoad_main");
const mini_image = document.querySelector("#previewLoad_mini");
const date = document.querySelector("#date");
const deleteImgMain = document.querySelector("#previewDel_main");
const deleteImgMini = document.querySelector("#previewDel_mini");
const deleteAvatar = document.querySelector("#previewDel_aut");
const publishButton = document.querySelector("#publish");

title.addEventListener("input", inputInfotitle);
subtitle.addEventListener("input", inputInfoSubtitle);
avatar.addEventListener("input", inputInfoAuthor);
avatar_image.addEventListener("change", previewImgAvatar);
main_image.addEventListener("change", previewImgMain);
mini_image.addEventListener("change", previewImgMini);
date.addEventListener("input", inputInfoDate);
deleteImgMain.addEventListener("click", inputDeleteMain);
deleteImgMini.addEventListener("click", inputDeleteMini);
deleteAvatar.addEventListener("click", inputDeleteAvatar);
publishButton.addEventListener("click", createPost);


async function createPost() {
    const titleInput = document.querySelector("#title");
    const subtitleInput = document.querySelector("#subtitle");
    const authorInput = document.querySelector("#author");
    let imageInput = document.querySelector("#previewLoad_main");
    let imageInputPhoto = document.querySelector("#previewImg_main");
    let authorInputName = document.querySelector("#previewLoad_author");
    let authorInputPhoto = document.querySelector("#previewImg_author");
    imageInputPhoto = imageInputPhoto.src.split(',')[1];
    authorInputPhoto = authorInputPhoto.src.split(',')[1];
    imageInput = imageInput.value.split('\\').pop();
    authorInputName = authorInputName.value.split('\\').pop();
    const authorImgInput = document.querySelector("#previewLoad_author");
    const publishDateInput = document.querySelector("#date");
    const contentInput = document.querySelector("#content");
    if (titleInput.value != "" && subtitleInput.value != "" && imageInput.value != "" && authorInput.value != "" && authorImgInput.value != "" && publishDateInput.value != "" && contentInput.value != "") {
        const response = await fetch('api/post', {
            method: 'POST',
            body: JSON.stringify({
                title: titleInput.value,
                subtitle: subtitleInput.value,
                image: imageInputPhoto,
                imageName: imageInput,
                author: authorInput.value,
                authorImg: authorInputPhoto,
                authorImgName: authorInputName,
                publishDate: publishDateInput.value,
                content: contentInput.value
            })

        });
        console.log(response);
    }
}

