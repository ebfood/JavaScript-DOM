window.onload = function(){
    var para = document.createElement("p");

    var testdiv = document.getElementById("testdiv");
    var txt = document.createTextNode("This is ");
    var emp = document.createElement("em");
    var txt1 = document.createTextNode("my");
    var txt2 = document.createTextNode(" content.");

    para.appendChild(txt); //文字节点
    para.appendChild(emp);
    emp.appendChild(txt1);
    para.appendChild(txt2);
    testdiv.appendChild(para);

    console.log(para.nodeType); //元素节点
    console.log(txt.nodeType); //文本节点
}