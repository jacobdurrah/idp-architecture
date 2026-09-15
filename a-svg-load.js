const SVG_FILES=["a-svg-0.txt","a-svg-1.txt","a-svg-2.txt","a-svg-3.txt","a-svg-4.txt","a-svg-5.txt","a-svg-6.txt","a-svg-8.txt","a-svg-9.txt","a-svg-7.txt","a-svg-10.txt"];
Promise.all(SVG_FILES.map(function(f){return fetch(f).then(function(r){return r.text();});})).then(function(parts){
  document.getElementById("stage").insertAdjacentHTML("afterbegin",parts.join(""));
  if(window.IDP_agentsBind)window.IDP_agentsBind();
});
