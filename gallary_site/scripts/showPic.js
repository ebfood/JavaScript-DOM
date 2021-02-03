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

function insertAfter(newElement, targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

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

function preparePlaceholder() {
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;

    var placeholder = document.createElement("img"); //碎片
    var description = document.createElement("p");
    var destext = document.createTextNode("Which cat?")
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("height", "300px");
    placeholder.setAttribute("src", "images/default.jpg");
    placeholder.setAttribute("alt", "cat");
    description.setAttribute("id", "description");
    description.appendChild(destext);

    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
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


addLoadEvent(prepareGallery()); //把函数挂到onload，注意参数括号
addLoadEvent(preparePlaceholder());