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

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value) {
    if (!element.className) {
      element.className = value;
    } else {
      newClassName = element.className;
      newClassName+= " ";
      newClassName+= value;
      element.className = newClassName;
    }
  }

  function highlightPage(){
      if(!document.getElementById) return false;
      if(!document.getElementsByTagName) return false;
      var headers = document.getElementsByTagName("header");
      if(headers.length==0) return false;
      var navs = headers[0].getElementsByTagName("nav");
      if(navs.length==0) return false;
      
      var links = navs[0].getElementsByTagName("a");
      for(key in links){
          var linkurl = links[key].getAttribute("href");
        //   console.log(linkurl);
        //   console.log(window.location.href);
          if(window.location.href.indexOf(linkurl)!=-1){
            links[key].className="here";
            var linktext = links[key].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
            break;
          }
      }
  }

  function moveElement(elementID, final_x, final_y, interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);

    // 取消当前动画
    if(elem.movement) 
        clearTimeout(elem.movement);

    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist_x = Math.ceil(Math.abs((xpos-final_x)/10));
    var dist_y = Math.ceil(Math.abs((ypos-final_y)/10));
    if(xpos==final_x&&ypos==final_y) 
        return true;
    if(xpos<final_x) xpos+=dist_x;
    if(xpos>final_x) xpos-=dist_x;
    if(ypos<final_y) ypos+=dist_y;
    if(ypos>final_y) ypos-=dist_y;
    
    elem.style.left = xpos+"px";
    elem.style.top = ypos+"px";
    var repeat = "moveElement('"+elementID+"',"+final_x+", "+final_y+", "+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow(){
    //创建幻灯片元素
    if(!document.getElementById) return false;
    if(!document.getElementById("intro")) return false;
    if(!document.getElementsByTagName) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("id","preview");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    //添加悬停动画
    var links = document.getElementsByTagName("a");
    var destination;
    for(i in links){
        links[i].onmouseover = function(){
        destination = this.getAttribute("href");
        if(destination.indexOf("index.html") != -1) moveElement("preview",0,0,5);
        else if(destination.indexOf("about.html") != -1) moveElement("preview",-150,0,5);
        else if(destination.indexOf("photos.html") != -1) moveElement("preview",-300,0,5);
        else if(destination.indexOf("live.html") != -1) moveElement("preview",-450,0,5);
        else if(destination.indexOf("contact.html") != -1) moveElement("preview",-600,0,5);
        }
    }
}

function showSection(id){
    var sections = document.getElementsByTagName("section");
    for(i in sections){
        if(sections[i].getAttribute("id")!=id)
            sections[i].style.display="none";
        else
            sections[i].style.display="block";
    }
}

function prepareInternalnav(){
    if(!document.getElementsByName) return false;
    if(!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if(articles.length==0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for(i in links){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination = sectionId; //持久作用域的技巧：属性
        links[i].onclick = function(){
            showSection(this.destination);
            return false;//取消默认点击事件
        }
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
    var destext = document.createTextNode(" ")
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("height", "300px");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "image gallery");
    description.setAttribute("id", "description");
    description.appendChild(destext);
    
    var gallery = document.getElementById("imagegallery");
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
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

function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i=0; i<tables.length; i++) {
      var odd = false;
      var rows = tables[i].getElementsByTagName("tr");
      for (var j=0; j<rows.length; j++) {
        if (odd == true) {
          addClass(rows[j],"odd");
          odd = false;
        } else {
          odd = true;
        }
      }
    }
  }
  
  function highlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i=0; i<rows.length; i++) {
      rows[i].oldClassName = rows[i].className
      rows[i].onmouseover = function() {
        addClass(this,"highlight");
      }
      rows[i].onmouseout = function() {
        this.className = this.oldClassName
      }
    }
  }
  function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i=0; i<abbreviations.length; i++) {
      var current_abbr = abbreviations[i];
      if (current_abbr.childNodes.length < 1) continue;
      var definition = current_abbr.getAttribute("title");
      var key = current_abbr.lastChild.nodeValue;
      defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for (key in defs) {
      var definition = defs[key];
      var dtitle = document.createElement("dt");
      var dtitle_text = document.createTextNode(key);
      dtitle.appendChild(dtitle_text);
      var ddesc = document.createElement("dd");
      var ddesc_text = document.createTextNode(definition);
      ddesc.appendChild(ddesc_text);
      dlist.appendChild(dtitle);
      dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
  }

function focusLabels(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  var labels = getElementsByTagName("labels");
  for(i in labels){
    if(!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function(){
      var id = labels[i].getAttribute("for");
      var element = document.getElementById(id);
      element.focus();
    }
  }
}

function resetFields(whichform) {
  if (Modernizr.input.placeholder) return;
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.getAttribute('placeholder')) continue;
    element.onfocus = function() {
    if (this.value == this.getAttribute('placeholder')) {
      this.value = "";
     }
    }
    element.onblur = function() {
      if (this.value == "") {
        this.value = this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}

function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.getAttribute("required") == 'required') {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.getAttribute("type") == 'email') {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function isFilled(field) {
  return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}

function getHTTPObject(){
  if(typeof XMLHttpRequest == 'undefined') //IE
      XMLHttpRequest = function(){
          try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
              catch(e){}
          try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
              catch(e){}
          try{ return new ActiveXObject("Msxml2.XMLHTTP");}
              catch(e){}
          return false;
      }
  return new XMLHttpRequest(); //Other
}

function displayAjaxLoading(element){
  while(element.hasChildNodes()){
    element.removeChild(element.lastChild);
  }
  var content = document.createElement("img");
  content.setAttribute("src","images/loading.gif");
  content.setAttribute("alt","Loading...");
  element.appendChild(content);
}

// ajax 待完成


addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
addLoadEvent(stripeTables);
addLoadEvent(highlightPage);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);  //并不想用它