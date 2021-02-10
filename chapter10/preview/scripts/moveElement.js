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
