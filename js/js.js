let $=document;
let infolist=$.getElementById('info_list');
let l=$.getElementsByClassName("first_show_content")[0];
let infoimages=$.querySelectorAll('.info_image');
let videopvp=$.getElementById("main_video_pvp");
let mainplayicon=$.getElementById("play_icon");
let playiconbar=$.getElementById('play_icon_bar');
let timepvp=$.getElementById('play_bar_time');
let circlepvp=$.getElementById('play_bar_circle');
let bar=$.querySelector('#player_bar');
let fullscreenicon=$.getElementById('full_screen')
let volumeicon=$.getElementById("volume_icon");
let volumebar=$.getElementById('volume_value');
let circlevolume=$.getElementById('volume_bar_circle');
let settingtemp=$.getElementById('setting_temp')
let speedmenu=$.getElementById('speed_menu');

let dynamicText=["Innovative Thinking","Top-Notch Support","Rapid Solutions"];
let dynamicTextNumber=0;

    window.addEventListener("load",function(){ 
        changetxt()
        aa()
        makegallery()
    })
    setInterval(changetxt,2500)

    function changetxt(){
        dynamicTextNumber++;
        if(dynamicTextNumber>dynamicText.length-1){
            dynamicTextNumber=0
        }
        l.innerHTML=""
        l.insertAdjacentHTML("afterbegin"," <h1 class=\"dynamic_txt_active\" id=\"dynamic_txt\">"+dynamicText[dynamicTextNumber]+"</h1><p>We are a digital agency specializing in web design, mobile development and seo optimization.</p>")
    }

//section info
function aa(event){
infoimages.forEach(function(u){
    
    u.style.backgroundImage="url("+u.dataset.img+")";
    })
}
//section video
let mouseflag=false;
mainplayicon.addEventListener('click',playpvp);
playiconbar.addEventListener('click',playpvp);
videopvp.addEventListener('click',playpvp)
videopvp.addEventListener('timeupdate',timebar)
bar.addEventListener('click',dragtime)
volumeicon.addEventListener('click',volumebtn)
fullscreenicon.addEventListener('click',fullscreen)
volumebar.addEventListener('click',volumech)
settingtemp.addEventListener('click',showmenu)
let speed="Normal";
let speedmenu1=$.getElementById('speed_menu_1');
let speedmenu2=$.getElementById('speed_menu_2');
let currentspeed=$.getElementById("current_speed");
$.getElementById('speedbtn_1').addEventListener('click',openlist)
$.querySelector('#speedbtn_2').addEventListener('click',openlist)




function playpvp(){
    
    if(playiconbar.className.includes("fa-play")){
    videopvp.play()
    
    mainplayicon.parentElement.className="play_ani";
    playiconbar.className="fa-solid fa-pause";
    }else{
        videopvp.pause();
        mainplayicon.parentElement.className="pause_ani";
        playiconbar.className="fa-solid fa-play";
    }
}

function timebar(){
    timepvp.innerHTML=checktime(videopvp.currentTime/60)+":"+checktime(videopvp.currentTime%60);
    progressbar()
}
function checktime(num){
    let str='';
    if(num==0){
        str='00';
    }else if(num<10){
        str='0'+Math.floor(num);
    }else{
        str=Math.floor(num);
    }
    return str
}
function progressbar(){
    let currtime=(videopvp.currentTime);
    let videotime=(videopvp.duration);
    let result=((currtime/videotime)*100)+"%";
    bar.style.background="linear-gradient(to right, var(--info-purple) "+result+",#e8e8e869 "+result+")"
    circlepvp.style.left=result;
}
function dragtime(event){
    
    let result=(event.offsetX /bar.offsetWidth)*100;
    circlepvp.style.left=result+"%"
    videopvp.currentTime=(videopvp.duration/100)*result
}
function fullscreen(){

    if(!document.fullscreenElement){
        videopvp.parentElement.requestFullscreen();
    }else{
        console.log("exit");
        $.exitFullscreen();
    }
}
let volumevalue=1;
function volumebtn(){
    if(videopvp.volume==0){
        videopvp.volume=volumevalue;
        volumeicon.className="fa-solid fa-volume-high";
    }else{
        videopvp.volume=0
        volumeicon.className="fa-solid fa-volume-xmark";
    }
    volumestyle();
}

function volumech(event){
    volumevalue=(event.offsetX/volumebar.offsetWidth);
    circlevolume.style.left=volumevalue*100+"%";
    videopvp.volume=volumevalue;
    volumestyle(volumevalue);
    if(volumevalue==0){
        volumeicon.className="fa-solid fa-volume-xmark";
    }else{
        volumeicon.className="fa-solid fa-volume-high";
    }
}
function volumestyle(){
    volumebar.style.background="linear-gradient(to right, var(--info-purple) "+videopvp.volume*100+"% ,#e8e8e869 "+videopvp.volume*100+"%)";
    circlevolume.style.left=videopvp.volume*100+"%";
}
let speedlist_li=$.querySelectorAll('#speed_menu_2 li')
function showmenu(){
    let settingicon=$.getElementById('setting_icon');
    let check=settingicon.className.includes("settingnotactive")
    let settingsidebar=$.querySelector(".setting_sidebars")
    speedlist_li.forEach(function(u){
        u.addEventListener('click',speedchoose)
    })
    if(check){
    settingtemp.className="settingtempactive"
    settingicon.classList.remove("settingnotactive")
    settingicon.classList.add("settingactive")
    
    settingsidebar.classList.remove("speedend")
    settingsidebar.classList.add("speedstart")

    speedmenu1.addEventListener('click',openlist)
    }else{
        settingtemp.className="settingtempnotactive"
        //rotate setting icon
        settingicon.classList.remove("settingactive")
        settingicon.classList.add("settingnotactive")
        
        settingsidebar.classList.remove("speedstart")
        settingsidebar.classList.add("speedend")
    
    }
    
    
}
function openlist(){
    speedmenu2.classList.toggle("activelist")
    if(speedmenu2.className.includes("activelist")){
    speedmenu2.style.display="block"
    speedmenu1.style.display="none"
    }else{
        speedmenu2.style.display="block"
        speedmenu1.style.display="none"
    }
    
    
}
function speedchoose(event){
    let str=event.target.innerText;
    
    if(!str.includes("Speed")){
        if(str=="Normal"){
            videopvp.playbackRate=1
        }else{
        videopvp.playbackRate=Number(str);
        }
        currentspeed=str;
    }
    openlist()
}
/*section gallery*/
let modalimgtemp=$.querySelector(".modal_img_template");
let modal=$.getElementById('modal')
let modalextibtn=$.getElementById('modal_exit')
modalextibtn.addEventListener('click',closemodal)
function makegallery(){
    let items=[
        {img:"img/pd7.jpg",title:"Cras Fermentum Sem",minititle:"STATIONARY"},
        {img:"img/pd8.jpg",title:"Mollis Ipsum Mattis",minititle:"MAGAZINE, BOOK"},
        {img:"img/pd9.jpg",title:"Ipsum Ultricies Cursus",minititle:"PACKAGING"},
        {img:"img/pd10.jpg",title:"Inceptos Euismod Egestas",minititle:"STATIONARY, BRANDING"},
        {img:"img/pd11.jpg",title:"Ipsum Mollis Vulputate",minititle:"PACKAGING"},
        {img:"img/pd12.jpg",title:"Porta Ornare Cras",minititle:"BRANDING"}
    ]
    let str;
    
    let maingallery=$.querySelector('.main_gallery');
    let fragment=$.createDocumentFragment();
    fragment=''
    items.forEach(function(u){
        str="<div class=\"mg_items\"><img src="+u.img+">"+
    "<h6 class=\"mg_item_title\">"+u.title+"</h6>"+
    "<div class=\"mg_item_info\">"+u.minititle+"Y</div>"+
    "<a onclick=\"resizefunc(event)\" class=\"resize_gallery\"><i class=\"fa-solid fa-expand\"></i></a></div>"
    fragment+=str;
    })
    maingallery.insertAdjacentHTML("afterbegin",fragment)

}
function resizefunc(event){
    modalimgtemp.innerHTML=""
    modalimg=$.createElement('img')
    modalimg.id="modal_img"
    modalimg.src=event.target.parentElement.children[0].src;
    modalimgtemp.append(modalimg);
    modal.style.transition="0.3s ease-in-out"
    modalimg.style.transition="0.3s ease-in-out"
    modal.style.visibility="visible";
    modal.style.opacity="1";
    modalimgtemp.firstElementChild.style.transform="scale(1)"
    modal.addEventListener('click',closemodal)
}
function closemodal(event){
    if(event.target.id=="modal"||event.target.id=="modal_exit"){
        modal.style.transition="0.15s ease-in-out"
        modalimgtemp.firstElementChild.style.transition="0.15s ease-in-out"
        modalimgtemp.firstElementChild.style.transform="scale(0.5)"
        modal.style.visibility="hidden";
        modal.style.opacity="0";
        videopvp.pause();
        
    }
}
/* section final */


let playAbout=$.getElementById("video_about_player")
let popvideo=$.querySelector(".video_about_modal")
console.log(popvideo);

playAbout.addEventListener("click",modalvideo)

function modalvideo(){
    modalimgtemp.innerHTML=""
    modalimgtemp.append(popvideo);
    modal.style.transition="0.3s ease-in-out"
    modalimgtemp.firstElementChild.style.visibility="vible"
    modalimgtemp.firstElementChild.style.transition="0.3s ease-in-out"
    modalimgtemp.firstElementChild.style.transform="translate(-50%, 10%) scale(1)"
    modal.style.visibility="visible";
    modal.style.opacity="1";
    modal.addEventListener('click',closemodal)
}