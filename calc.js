let clac=document.querySelector(".clac");
let res=document.querySelector(".result");
let divs=document.querySelectorAll(".clac-body div");
let barckets=document.querySelectorAll(".bracket"); // for setting syntax of brackets
let product =document.querySelector(".operate.product"); // for append before ( bracket
let mod=document.querySelector(".chng-mod");
let arr=[];
let ans='';

mod.onclick =function() {
    clac.classList.toggle("dark");
    document.body.classList.toggle("dark");
}
// flag for brackets
let flag=false;
divs.forEach(el => {
    el.onclick=function () {
        // click effect on button
        divs.forEach(e => {
            if(e.classList.contains('click')) e.classList.remove('click');
        });
        el.classList.add("click");
        // for use the answer in other operation
        if(res.innerHTML!=='' && !el.classList.contains("equal")) {
            if(res.firstChild.classList.contains("ans")) {
                ans='';
                let arrayOfNumber=Array.from(res.firstChild.innerHTML);
                arrayOfNumber.forEach(x => {
                    let div=document.createElement("div");
                    div.className='num';
                    div.append(x);
                    res.appendChild(div);
                    arr.push(div);
                    ans+=div.innerHTML;
                });
                res.firstChild.remove();
            }
        }
        // Here each click condition 
        if(el.classList.contains("clear")) {
            clear();
        }
        else if(el.classList.contains("del")) {
            // check result if it is has elements
            if(res.innerHTML!=='') {
                // then we do remove
                res.lastElementChild.remove();
                arr.pop();
                ans=ans.slice(0,-1);
            }
        }
        else if(el.classList.contains("equal")) {
            if(arr.length>0 && !arr[arr.length-1].classList.contains("operate") &&!flag) {
                res.innerHTML='';
                arr=[];
                flag=false;
                let div=document.createElement("div");
                div.className="ans";
                div.append(eval(ans));
                res.appendChild(div);
            }
        }
        else if(el.classList.contains("dot")) {
            
            if(arr.length===0  || arr[arr.length-1].classList.contains("operate")) {
                ans+='0';
                let div=document.createElement("div");
                div.className='num';
                div.appendChild(document.createTextNode("0"));
                res.appendChild(div);
            }
            createDiv(el,'dot');
            ans+='.';
            arr.push(el);
        }
        else if(el.classList.contains("operate")) {
            if(!arr[arr.length-1].classList.contains("operate") && !arr[arr.length-1].classList.contains("dot")) {
                createDiv(el,'operation');
                // for operation * and /
                if(el.classList.contains("product") || el.classList.contains("divide")) {
                    ans+=el.dataset.value;
                }
                else ans+=el.innerHTML;
                arr.push(el);
            }
        }
        else if(el.classList.contains("bracket")) {
            
            if(arr.length>0) {
                if(el===barckets[0] && !flag) {
                    if(arr[arr.length-1].classList.contains("num")) {
                        res.append(product.innerHTML);
                        arr.push(product);
                        ans+='*';
                    }
                    flag=true;
                    createDiv(el,'firstBracket');
                    arr.push(el);
                    ans+=el.innerHTML;
                }
                else {
                    if(flag && arr[arr.length-1].classList.contains("num") ) {
                        createDiv(el,'secondBracket');
                        arr.push(el);
                        ans+=el.innerHTML;
                        flag=false;
                    }
                }
            }
        }
        // for numbers click
        else {
            //check if there ) beforer the number
            if(arr.length>0) {
                if(res.lastElementChild.classList.contains("secondBracket")) {
                    res.append(product.innerHTML);
                    arr.push(product);
                    ans+='*';
                }
            }
            //create div number
            createDiv(el,'num');
            arr.push(el);
            ans+=el.innerHTML;
        }
    }
});
function createDiv(el,cls) {
    let div=document.createElement("div");
    div.className=cls;
    div.appendChild(document.createTextNode(el.innerHTML));
    res.appendChild(div);
}
function clear () {
    res.innerHTML='';
    arr=[];
    flag=false;
    ans='';
}