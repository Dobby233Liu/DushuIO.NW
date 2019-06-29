console.log("injector loading");

const JSZip = require('jszip');
const download = require('downloadjs');

console.log("injector complete, modifying");

// i'm sorry
const every = document.body.querySelectorAll("a[target=_blank]");
for (i=0; i < every.length; i++){
	every[i].setAttribute("target", "_self");
}

document.body.querySelector(".hander .topphone").style.display = "none";
document.body.querySelector(".hander .handfoot .logo").style.display = "none";

function HandleDLClick(e){
	if(e.path[0].href.endsWith(".zip")){
		e.preventDefault();
		fetch(e.path[0].href)
			.then(function (response) {
				if (response.status === 200 || response.status === 0) {
					return Promise.resolve(response.blob());
				} else {
					return Promise.reject(new Error(response.statusText));
				}
			})
			.then(JSZip.loadAsync)
			.then(function (zip) {
				var pdfObj = zip.filter(function (relativePath, file){
								return relativePath.endsWith(".pdf");
							 })[0];
				pdfObj.async("blob").then(function(r){
					download(r, pdfObj.name, "application/pdf");
				});
			});
		e.path[0].innerHTML = previousCaption;
		return true;
	} else {
		return false;
	}
}

// arts
if (window.location.pathname.startsWith("/a/")){
	console.info("injector: " + window.location.pathname + " doing modify stuff");
	document.body.querySelector(".main .zy_banner").style.display = "none";
	document.body.querySelector(".main .w1002 .s-zytop").style.display = "none";
	document.body.querySelector(".main .w1002 .s-zycenter").style.display = "none";
	document.body.querySelector(".main .w1002 .s-zyfoot .newstime").style.display = "none";
	document.body.querySelectorAll(".main .w1002 .turn")[1].style.display = "none";
	try{
		document.body.querySelectorAll(".main .w1002 .turn p span a")[0].onclick = HandleDLClick;
	}catch(e){
		console.error("ya know no dl ", e);
		alert(e.stack);
	}
}

console.log("finna done");