// random background
let land = document.querySelector(".landing");
let runBackground = "run";
let randImg ; 
if (window.localStorage.getItem("randomimg") !== null){
    runBackground= window.localStorage.getItem("randomimg");
}
// add class active to navbar
let nav = document.querySelectorAll(".landing .header ul li a");
nav.forEach(function(ele){
    ele.onclick= function(){
        nav.forEach(function(ele){
            ele.classList.remove("active");
        })
        this.classList.add("active");
    }
})

// Setting-box
let box = document.querySelector(".setting-box");
let button = document.querySelector(".setting-box i")

button.onclick=function (){
    box.classList.toggle("hide")
}
// change color-option in setting-box
let root = document.querySelector(":root");
let colors = document.querySelectorAll(".setting-box .color-setting ul li");
let myActive = document.querySelector(".setting-box .color-setting ul li.active");

root.style.setProperty("--main-color",window.localStorage.getItem("mainColor"))
colors.forEach(function(e){
    e.classList.remove("active");
    if(window.localStorage.getItem("mainColor") === getComputedStyle(e).backgroundColor){
        e.classList.add("active")
    }
})
colors.forEach(function(e){
    e.onclick = function(){
        colors.forEach(function(e){
            e.classList.remove("active")
            e.style.opacity = "0.5"
        })
        this.classList.add("active");
        this.style.opacity = "1.0"
        let me = window.getComputedStyle(this).backgroundColor
        root.style.setProperty("--main-color",me);
        window.localStorage.setItem("mainColor",me)
    }
})
// setting of random backgruond 
let allButtons = document.querySelectorAll(".setting-box .random-change button");
let activeButton = document.querySelectorAll(".setting-box .random-change button.active");

allButtons.forEach(function(e){
    e.classList.remove("active");
    if(window.localStorage.getItem("bactive") === e.innerHTML){
        e.classList.add("active");
    }
    else if (window.localStorage.getItem("bactive") === "yes"){
        // console.log("yes continue")
    }
    else{
        // console.log("Nooooo")

    }
    
})
// background random 
allButtons.forEach((e) => {
    e.onclick = function (){
        if (e.innerHTML === "yes"){
            runBackground = "run"
            doRand()
            window.localStorage.setItem("randomimg","run")
            // console.log("working")
            
        }
        else {
            clearInterval(randImg)
            window.localStorage.setItem("randomimg","stop")
            
            // console.log("srop now please")
        }
        allButtons.forEach((e) => {
            e.classList.remove("active");
        })
        this.classList.add("active")
        window.localStorage.setItem("bactive",this.innerHTML)
    }
})
function doRand (){
    if(runBackground === "run"){
        randImg = setInterval(() => {
            let n = (Math.random()) * 4
            land.style.cssText = `background-image : url(images/landing-${Math.ceil(n)}.webp );`
        }, 9000);
    }
}
doRand()
// showing Bullets
if(window.localStorage.getItem("showBullets") !== null){
    document.querySelector(".nav-bullets").style.display = window.localStorage.getItem("showBullets") ;
}
if(window.localStorage.getItem("activeButton") !== null){
    document.querySelectorAll(".show-bullets button").forEach((e) => {
        e.classList.remove("active")
    })
    let ac = document.querySelector(`.show-bullets button.${window.localStorage.getItem("activeButton")}`);
    ac.classList.add("active")
}
let showBulletsButtons = document.querySelectorAll(".show-bullets button")
showBulletsButtons.forEach((ele) => {
    ele.addEventListener("click", (ev) => {
        showBulletsButtons.forEach((e) =>{
            e.classList.remove("active")
        })
        ev.target.classList.add("active")
        let act = document.querySelector(".show-bullets .active")
        if(act.innerHTML === "No"){
            document.querySelector(".nav-bullets").style.display = "none";
            window.localStorage.setItem("showBullets","none")
            window.localStorage.setItem("activeButton","no")
        }
        else{
            document.querySelector(".nav-bullets").style.display = "block"
            window.localStorage.setItem("showBullets","block")
            window.localStorage.setItem("activeButton","yes")
        }
    })
})
// scroll at About Us 
let ourSkills = document.querySelector(".skills");
window.onscroll = function(){
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window Height
    let windowHeight = this.innerHeight

    //window ScrollTop
    let windowScrollTop = this.pageYOffset

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
        let spans = document.querySelectorAll(".skills  .skill-box .skill-progress span")
        spans.forEach(function(e){
            e.style.width = e.getAttribute("prog")

        })
    }

}
// Gallery Images
let galletyImage =document.querySelectorAll(".gallery .images-box img");

galletyImage.forEach((e) => {
    e.addEventListener("click",() => {
        let pop = document.querySelectorAll("body .pop")
        pop.forEach((e) => {
            e.remove()
        })
        let mypopUp = document.createElement("div");
        let popImage = document.createElement("img")
        let closePop = document.createElement("div")
        let textX =document.createTextNode("X")
        popImage.setAttribute("src",e.getAttribute("src"))
        mypopUp.classList.add("pop")
        document.body.appendChild(mypopUp)
        document.body.appendChild(popImage)
        document.body.appendChild(closePop)
        mypopUp.appendChild(popImage)
        mypopUp.appendChild(closePop)
        closePop.appendChild(textX)
        let closeIcon = document.querySelector("body .pop div");
        closeIcon.addEventListener("click",() => {
            // console.log(closeIcon.parentElement.remove())
        })
    })
    
})

// nav bullets
let aboutUs = document.querySelector(".about-us");
let skills = document.querySelector(".skills");
let gallery = document.querySelector(".gallery");
let timeLine = document.querySelector(".timeline");

let navBullets = document.querySelectorAll(".nav-bullets .bullets");
navBullets.forEach((e) => {
    e.addEventListener("click",(eve) => {
        let bull = document.querySelector(`.${e.getAttribute("id")}`);
        window.scrollTo({top:bull.offsetTop})
    })
})
// reset button
document.querySelector(".setting-box .reset").onclick=function(){
    window.localStorage.clear()
    window.location.reload()
}
// Toggle menu
let iconMenu = document.querySelector(".landing .header .menu");
let myUl = document.querySelector(".landing .header ul")
iconMenu.onclick = function(e){
    e.stopPropagation()
    myUl.classList.toggle("show")
    
}
document.addEventListener("click", (e) => {
    if(e.target !== iconMenu){
        myUl.classList.remove("show")
    }
})



















