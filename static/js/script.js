// window.onload
var windowOnloadAdd = function (event) {
  if ( window.onload ){
     window.onload = window.onload + event;
  } else {
     window.onload = event;
  };
};

/*windowOnloadAdd(function() {
  // Ваш скрипт
});*/

function previewImg_main() {
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

function previewImg_mini() {
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

function previewImg_avatar() {
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



/*
const TITLE_ARRAY = document.querySelector("#content__title");
const SUBTITLE_ARRAY= document.querySelector("#content__subtitle");
const AVATAR_ARRAY = document.querySelector("#content__author");
const MAIN_IMAGE_ARRAY = document.querySelector("#previewImg_main");
const PREVIEW_IMAGE_ARRAY = document.querySelector("#previewImg_mini");

TITLE_ARRAY.addEventListener("input", inputInfo("#content__title"), false);
*/

const title=document.querySelector("#content__title");
const subtitle= document.querySelector("#content__subtitle");
const avatar = document.querySelector("#content__author");
const avatar_image = document.querySelector("#previewLoad_author");
const main_image = document.querySelector("#previewLoad_main");
const mini_image = document.querySelector("#previewLoad_mini");
const date = document.querySelector("#contentDate");
const deleteImgMain = document.querySelector("#previewDel_main");
const deleteImgMini = document.querySelector("#previewDel_mini");
const deleteAvatar = document.querySelector("#previewDel_aut");

title.addEventListener("input", inputInfo_title);
subtitle.addEventListener("input", inputInfo_subtitle);
avatar.addEventListener("input", inputInfo_author);
avatar_image.addEventListener("change", previewImg_avatar);
main_image.addEventListener("change", previewImg_main);
mini_image.addEventListener("change", previewImg_mini);
date.addEventListener("input", inputInfoDate);
deleteImgMain.addEventListener("click", inputDelete_main);
deleteImgMini.addEventListener("click", inputDelete_mini);
deleteAvatar.addEventListener("click", inputDelete_avatar);

function previewFile(preview, file)
{
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      preview.src = reader.result;
      console.log(preview.src);

    },
    false
  );

  reader.addEventListener(
    "error",
    (error) => {
      console.log('error')
      // convert image file to base64 string
      // preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function inputDelete_main()
{
  document.querySelector("#content__optionsMain").style.display = "none";
  document.querySelector("#previewUpload_main").style.display = "flex";
  document.querySelector("#previewImg_main").style.display="none";
  document.querySelector(".article_block__main").style.display = "block";
  document.querySelector(".content__preview_main").style.border = "1px dashed #D3D3D3";
  document.querySelector(".article_block__main").style.display = "block";
  document.querySelector("#patternImg_main").style.display = "none";
}

function inputDelete_mini()
{
  document.querySelector("#content__optionsMini").style.display = "none";
  document.querySelector("#previewUpload_mini").style.display = "flex";
  document.querySelector("#previewImg_mini").style.display = "none";
  document.querySelector(".post_block__mini").style.display = "block";
  document.querySelector(".content__preview_mini").style.border = "1px dashed #D3D3D3";
  document.querySelector("#patternImg_mini").style.display = "none";
}

function inputDelete_avatar()
{
  document.querySelector("#content__optionsAuthor").style.display = "none";
  document.querySelector("#previewUpLoad_author").style.display = "flex";
  document.querySelector("#previewImg_author").style.display="none";
  document.querySelector(".photo_author__author").style.display = "block";
  document.querySelector(".avatar__photo").style.display = "block";
  document.querySelector(".preview_author__photo_author").style.border = "1px dashed #D3D3D3";
  document.querySelector("#patternImg_avatar").style.display = "none";
}

function inputInfo_title()
{
  some = "#content__title"; 
  windowOnloadAdd(inputInfo(some));
  document.querySelector("#preview__title").innerText = document.querySelector(some).value;
  document.querySelector("#pattern__title").innerText = document.querySelector(some).value;
  if (document.querySelector("#preview__title").innerText == "")
  {
    document.querySelector("#preview__title").innerText = "Enter article title";
  }
  if (document.querySelector("#pattern__title").innerText == "")
  {
    document.querySelector("#pattern__title").innerText = "Enter article title";
  }
  
}

function inputInfo_subtitle()
{
  some = "#content__subtitle";
  windowOnloadAdd(inputInfo(some));
  document.querySelector("#preview__subtitle").innerText = document.querySelector(some).value;
  document.querySelector("#pattern__subtitle").innerText = document.querySelector(some).value;
  if (document.querySelector("#preview__subtitle").innerText == "")
  {
    document.querySelector("#preview__subtitle").innerText = "Enter Short description";
  }
  if (document.querySelector("#pattern__subtitle").innerText == "")
  {
    document.querySelector("#pattern__subtitle").innerText = "Enter Short description";
  }
}

function inputInfo_author()
{
  some = "#content__author";
  windowOnloadAdd(inputInfo(some));
  document.querySelector(".post_author__author-name").innerText = document.querySelector(some).value;
}

function inputInfoDate()
{
  some = "#contentDate";
  document.querySelector(".post_author__date").innerText = document.querySelector(some).value;
}

function inputInfo_login()
{
  some = "#content__login";
  windowOnloadAdd(inputInfo(some));;
}
function inputInfo_password()
{
  some = "#content__password";
  windowOnloadAdd(inputInfo(some));;
}

function inputInfo(some)
{
  if (document.querySelector(some).value!="")
  {
    document.querySelector(some).style.background = "#F7F7F7";
  }  
  if (document.querySelector(some).value=='')
  {
    document.querySelector(some).style.background = "#FFFFFF";
  }  
}
/*
async function getResponse(){
  const promise = new Promise((resolve, reject) =>{
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('result');
      } else {
        reject('o_O');
      }
     }, 1000 ) 
  }) 
  const response = await fetch('http://localhost:3000/admin');
  if (response.ok)
  {
    const json = await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
  const data = JSON.parse(json);
  let content = await response.json();
  content = content.splice(0,3);

  let key;
  for (key in content)
  {
    console.log(json[key]);
  }
}
getResponse()

const body = document.bodys[0];

body.onsubmit = e => {
  e.preventDefault();
  const fd = new FormData();
  const props = {};
  for (let element of body.elements) {
    if (element.type !== "submit") {
      props[element.name] = element.value;
      fd.append(element.name, element.value);
    }
  }
  
  for (let [key, prop] of fd) {
    console.log(key, prop)
  }
  
  const json = JSON.stringify(props);
  console.log(json);
} 
*/
