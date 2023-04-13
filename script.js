console.log("hello world")
const obj = {
    title: "My first party",
    subtitle: 'Destroy',
    authorName: "John",
    publishDate: new Date
}
console.log(JSON.stringify(obj));
postMessage.subtitle = "Dest"
console.log(JSON.stringify(obj));