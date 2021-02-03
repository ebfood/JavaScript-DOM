function showPic(whichpic){ //接受一个链接
    if(!document.getElementById('placeholder')) return false;

    var source = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    //console.log(source);
    placeholder.setAttribute('src', source);
    if(document.getElementById('description')){
        var text = whichpic.getAttribute('title');
        var description = document.getElementById('description');
        if(description.firstChild.nodeType==3)
            description.firstChild.nodeValue = text;
    }
    return true;
}

function prepareGallery(){
    if(!document.getElementsByTagName || !document.getElementById)
        return false;
    if(!document.getElementById('imagegallery')) 
        return false;
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    console.log(links.length);
    for(var i = 0; i<links.length; i++){
        links[i].onclick = function(){
            return showPic(this) ? false : true; //改变浏览器默认事件
        }
    }
}

function addLoadEvent(func){
    
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
        
    }
    else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

addLoadEvent(prepareGallery()); //把函数挂到onload，注意参数括号