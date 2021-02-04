function getNewContent(){
    var request = getHTTPObject();
    if(request) {
        request.open("GET", "example.txt", true);
        request.onreadystatechange = function(){
            if (request.readyState==4){
                console.log("response recived");
                var para = document.createElement("p");
                var txt = document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById("new").appendChild(para);
            }
        };
        request.send(null);

    }else{
        alert("sorry, your browser does not support");
    }

    console.log("function done");
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

addLoadEvent(getNewContent);