window.IDP_productLinks=function(item,esc){
function ok(h){h=String(h||"");return /^https:\/\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+$/.test(h)?h:""}
function a(o){if(!o||!o.n)return"";var h=ok(o.href);return h?'<a href="'+h+'" target="_blank" rel="noopener">'+esc(o.n)+"</a>":esc(o.n)}
function list(arr,sep){return (arr||[]).map(a).filter(Boolean).join(sep||"<br>")}
var html="",t=item.together,p=t&&list(t.parts," + ");
if(p){html+="<h3>Used together</h3><p>"+p+"</p>";if(t.why)html+="<p>"+esc(t.why)+"</p>"}
if(item.latest) html+="<h3>Latest</h3><p>"+a(item.latest)+"</p>";
var c=list(item.common); if(c) html+="<h3>Most used</h3><p>"+c+"</p>";
var see=list(item.see), buy=list(item.buy);
if(see||buy) html+="<h3>See / buy</h3><p>"+[see,buy].filter(Boolean).join("<br>")+"</p>";
if(item.project) html+="<h3>Project</h3><p>"+a(item.project)+"</p>";
return html;
};
