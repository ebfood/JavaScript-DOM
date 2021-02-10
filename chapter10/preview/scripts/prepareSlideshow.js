function prepareSlideshow(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("linklist")) return false;

    //var preview = document.getElementById("preview");
    //创建滑块
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src", "topics.gif");
    preview.setAttribute("alt","building blocks of web design");
    preview.setAttribute("id","preview");
    
    slideshow.appendChild(preview);

    //插入list后
    var list = document.getElementById("linklist");
    insertAfter(slideshow,list);

    var links = document.getElementsByTagName("a");
    links[0].onmouseover = function(){
        moveElement("preview",-100,0,10); //这个是最终位置哦
    }
    links[1].onmouseover = function(){
        moveElement("preview",-200,0,10);
    }
    links[2].onmouseover = function(){
        moveElement("preview",-300,0,10);
    }
}
addLoadEvent(prepareSlideshow);