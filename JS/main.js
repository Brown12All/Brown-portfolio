// ====== PROJETS DE DÉPART (n = nom, u = lien, d = description, v = vidéo) ======
// Pour en ajouter : ouvre le site avec #admin à la fin de l'URL (ou triple-clic sur BROWN).
var PROJECTS=[
 {n:"LMPcrea",u:"https://lmpcrea.vercel.app/",d:"Site vitrine d'un studio de création visuelle : pochettes, affiches et bannières, avec FAQ et contact direct.",v:"videos/lmpcrea.mp4"},
 {n:"Kabeli Edition",u:"https://kabeliedition-xi.vercel.app/",d:"Plateforme d'édition de livres photo : créations, tarifs clairs et commande en ligne, de la mise en page à la livraison.",v:"videos/kabeli.mp4"},
 {n:"U Dress Kod",u:"https://udresskod.vercel.app/",d:"Site d'une marque de mode : vision, boutique et lookbook, dans un univers sombre et affirmé.",v:"videos/udresskod.mp4"},
 {n:"Dieu Outfit",u:"https://dieuoutfit.vercel.app/",d:"Boutique de vêtements à message chrétien : sweats, collections et commande directe par WhatsApp.",v:"videos/dieuoutfit.mp4"}
];
var I="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";
var SKILLS=[
 ["HTML5",92,I+"html5/html5-original.svg"],
 ["CSS3",90,I+"css3/css3-original.svg"],
 ["JavaScript",85,I+"javascript/javascript-original.svg"],
 ["PHP",70,I+"php/php-original.svg"],
 ["MySQL",70,I+"mysql/mysql-original.svg"],
 ["Git",80,I+"git/git-original.svg"]
];
// =====================================
var EMB={}; // vidéos chargées depuis le dossier videos/

var P=document.getElementById("projects"),KEY="pf_projects_v2",rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
function mk(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function okUrl(u){try{return new URL(u).protocol==="https:"}catch(e){return false}}
function okVid(v){return typeof v==="string"&&v.indexOf("..")<0&&/^(https:\/\/[^\s"'<>]+|videos\/[A-Za-z0-9_\-.\/]+)\.(mp4|webm)$/i.test(v)}
function clean(a){return Array.isArray(a)?a.slice(0,40).map(function(p){p=p||{};return{n:String(p.n||"").slice(0,60),u:okUrl(p.u)?p.u:"",d:String(p.d||"").slice(0,160),v:okVid(p.v)?p.v:""}}).filter(function(p){return p.n}):null}
var list;try{list=clean(JSON.parse(localStorage.getItem(KEY)))}catch(e){}
list=list||clean(PROJECTS);
function save(){try{localStorage.setItem(KEY,JSON.stringify(list))}catch(e){}}

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("in")})},{threshold:.12});
var vio=new IntersectionObserver(function(es){es.forEach(function(e){e.target._in=e.isIntersecting;if(e.isIntersecting&&!e.target._u){var p=e.target.play();if(p&&p.catch)p.catch(function(){})}else e.target.pause()})},{threshold:.35});

function vsrc(u,cb){if(u.indexOf("data:")!==0){cb(u);return}fetch(u).then(function(r){return r.blob()}).then(function(b){cb(URL.createObjectURL(b))}).catch(function(){cb(u)})}
function render(){
 P.textContent="";
 list.forEach(function(p){
  var c=mk("article","card pr rv");
  c.appendChild(mk("h3","",p.n));
  if(p.d)c.appendChild(mk("p","",p.d));
  if(p.v){
   var w=mk("div","vid");w.setAttribute("role","button");w.tabIndex=0;w.setAttribute("aria-label","Lecture / pause : "+p.n);
   var v=document.createElement("video");v.muted=true;v.loop=true;v.playsInline=true;v.preload="auto";v.disablePictureInPicture=true;
   v.setAttribute("muted","");v.setAttribute("playsinline","");v.setAttribute("webkit-playsinline","");v.setAttribute("controlsList","nodownload nofullscreen noremoteplayback");
   var pk=p.v.replace(/\.(mp4|webm)$/i,".jpg");
   if(p.v.indexOf("videos/")===0)v.poster=EMB[pk]||pk;
   v.addEventListener("error",function(){w.setAttribute("data-err","1")});v.addEventListener("loadeddata",function(){if(v._in&&!v._u&&v.paused){var q=v.play();if(q&&q.catch)q.catch(function(){})}});
   var pb=mk("button","pb","▶");pb.type="button";pb.tabIndex=-1;pb.setAttribute("aria-hidden","true");
   v.addEventListener("playing",function(){pb.textContent="❚❚"});v.addEventListener("pause",function(){pb.textContent="▶"});
   var tg=function(e){e.preventDefault();if(v.paused){v._u=false;var q=v.play();if(q&&q.catch)q.catch(function(){})}else{v._u=true;v.pause()}};
   w.addEventListener("click",tg);w.addEventListener("keydown",function(e){if(e.key===" "||e.key==="Enter")tg(e)});
   vsrc(EMB[p.v]||p.v,function(x){v.src=x});w.append(v,pb);c.appendChild(w);vio.observe(v);
  }
  if(p.u){var b=mk("a","btn p go","Visiter la plateforme ↗");b.href=p.u;b.target="_blank";b.rel="noopener noreferrer";c.appendChild(b)}
  P.appendChild(c);io.observe(c);
 });
}
render();

var S=document.getElementById("skl");
SKILLS.forEach(function(s){var d=mk("div","card skc rv"),ic=mk("div","ico"),im=document.createElement("img");d.style.setProperty("--w",s[1]+"%");im.src=s[2];im.alt=s[0];im.loading="lazy";ic.appendChild(im);var inf=mk("div","inf"),top=mk("div","top");top.append(mk("b","",s[0]),mk("span","",s[1]+"%"));var bar=mk("div","bar");bar.appendChild(document.createElement("i"));inf.append(top,bar);d.append(ic,inf);S.appendChild(d)});
document.querySelectorAll(".rv").forEach(function(el){io.observe(el)});

var MQ=["Sites web","Boutiques en ligne","Plateformes","Responsive","Performance","Design soigné"],mqi=document.getElementById("mqi");
for(var r2=0;r2<2;r2++)MQ.forEach(function(t){mqi.appendChild(mk("span","",t));mqi.appendChild(mk("span","d","✦"))});
var gl=document.getElementById("gl");addEventListener("pointermove",function(e){gl.style.left=e.clientX+"px";gl.style.top=e.clientY+"px"});

var root=document.documentElement,th=document.getElementById("th");
function isDark(){var t=root.getAttribute("data-theme");return t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
th.onclick=function(){root.setAttribute("data-theme",isDark()?"light":"dark");recolor()};

// ====== ADMIN (privé) ======
(function(){
var A=document.getElementById("adm"),CK="pf_adm_v1",ok=false,fails=0,until=0;
function $(i){return document.getElementById(i)}
function hx(b){return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")}
function kdf(pw,salt){var e=new TextEncoder();return crypto.subtle.importKey("raw",e.encode(pw),"PBKDF2",false,["deriveBits"]).then(function(k){return crypto.subtle.deriveBits({name:"PBKDF2",salt:e.encode(salt),iterations:150000,hash:"SHA-256"},k,256)}).then(hx)}
function cred(){try{return JSON.parse(localStorage.getItem(CK))}catch(e){return null}}
function msg(id,t){$(id).textContent=t||""}
function drawList(){var u=$("plist");u.textContent="";list.forEach(function(p,i){var li=mk("li"),b=mk("button","","Supprimer");b.type="button";b.onclick=function(){if(confirm("Supprimer « "+p.n+" » ?")){list.splice(i,1);save();render();drawList()}};li.append(mk("span","",p.n),b);u.appendChild(li)})}
function view(){var c=cred();$("lock").hidden=ok;$("panel").hidden=!ok;
 if(ok){drawList();return}
 $("lt").textContent=c?"Accès privé":"Crée ton code d'accès";$("pw2w").hidden=!!c;$("lb").textContent=c?"Déverrouiller":"Créer le code";setTimeout(function(){$("pw").focus()},50)}
function open(){A.hidden=false;document.body.style.overflow="hidden";view()}
function close(){A.hidden=true;ok=false;document.body.style.overflow="";["pw","pw2","pn","pu","pd","pv"].forEach(function(i){$(i).value=""});msg("lm");msg("pm");if(location.hash==="#admin")history.replaceState(null,"",location.pathname+location.search)}
$("lf").onsubmit=function(e){e.preventDefault();
 if(!(window.crypto&&crypto.subtle)){msg("lm","Navigateur non compatible (HTTPS requis).");return}
 var pw=$("pw").value,c=cred();
 if(!c){
  if(pw.length<8){msg("lm","8 caractères minimum.");return}
  if(pw!==$("pw2").value){msg("lm","Les codes ne correspondent pas.");return}
  var salt=hx(crypto.getRandomValues(new Uint8Array(16)));
  kdf(pw,salt).then(function(h){localStorage.setItem(CK,JSON.stringify({s:salt,h:h}));ok=true;$("pw").value=$("pw2").value="";msg("lm");view()});return}
 if(Date.now()<until){msg("lm","Trop d'essais. Réessaie dans 30 secondes.");return}
 kdf(pw,c.s).then(function(h){
  if(h===c.h){ok=true;fails=0;$("pw").value="";msg("lm");view()}
  else{fails++;if(fails>=5){until=Date.now()+30000;fails=0}msg("lm","Code incorrect.")}})};
$("pf").onsubmit=function(e){e.preventDefault();if(!ok)return;
 var n=$("pn").value.trim(),u=$("pu").value.trim(),d=$("pd").value.trim(),v=$("pv").value.trim();
 if(!n||n.length>60){msg("pm","Nom requis (60 caractères max).");return}
 if(!okUrl(u)){msg("pm","Le lien doit commencer par https://");return}
 if(!d||d.length>160){msg("pm","Description requise (160 caractères max).");return}
 if(!okVid(v)){msg("pm","Vidéo : chemin du type videos/nom.mp4 ou lien https vers un mp4/webm.");return}
 if(list.length>=40){msg("pm","Limite de 40 projets atteinte.");return}
 list.push({n:n,u:u,d:d,v:v});save();render();drawList();$("pf").reset();msg("pm","Projet ajouté ✓")};
$("ex").onclick=function(){var t="var PROJECTS="+JSON.stringify(list,null,1)+";";
 (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){msg("pm","Copié ! Colle-le à la place de PROJECTS dans index.html puis redéploie.")},function(){prompt("Copie ce code :",t)})};
$("lk").onclick=function(){ok=false;view()};
$("ax").onclick=close;
A.addEventListener("click",function(e){if(e.target===A)close()});
addEventListener("keydown",function(e){if(e.key==="Escape"&&!A.hidden)close()});
$("logo").addEventListener("click",function(e){if(e.detail===3)open()});
function chk(){if(location.hash==="#admin")open()}
addEventListener("hashchange",chk);chk();
})();

// ====== 3D ======
var cv=document.getElementById("bg"),R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100);cam.position.z=7;
var grp=new THREE.Group();sc.add(grp);
var core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.7,1),new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.55}));
var inner=new THREE.Mesh(new THREE.OctahedronGeometry(.8,0),new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.9}));
var ring=new THREE.Mesh(new THREE.TorusGeometry(2.6,.012,8,120),new THREE.MeshBasicMaterial({transparent:true,opacity:.5}));
var ring2=ring.clone();ring2.rotation.x=Math.PI/2.2;
grp.add(core,inner,ring,ring2);
var N=900,pos=new Float32Array(N*3);
for(var i=0;i<N;i++){var r=4+Math.random()*14,a=Math.random()*6.283,b=Math.acos(2*Math.random()-1);pos[i*3]=r*Math.sin(b)*Math.cos(a);pos[i*3+1]=r*Math.sin(b)*Math.sin(a);pos[i*3+2]=r*Math.cos(b)}
var pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(pos,3));
var pm=new THREE.PointsMaterial({size:.04,transparent:true,opacity:.8}),pts=new THREE.Points(pg,pm);sc.add(pts);
function recolor(){var c=isDark()?0x5cc8ff:0x0ea5e9;[core,inner,ring,ring2].forEach(function(m){m.material.color.setHex(c)});pm.color.setHex(c)}
recolor();
function size(){var w=innerWidth,h=innerHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
size();addEventListener("resize",size);
var mx=0,my=0,sy=0,ty=0;
addEventListener("pointermove",function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
var pgb=document.getElementById("pg");
function onS(){var m=document.documentElement.scrollHeight-innerHeight;ty=m>0?scrollY/m:0;pgb.style.width=ty*100+"%"}
addEventListener("scroll",onS);onS();
var clk=new THREE.Clock();
(function loop(){requestAnimationFrame(loop);var t=clk.getElapsedTime();sy+=(ty-sy)*.06;
core.rotation.y=t*.15+sy*8;core.rotation.x=t*.08+sy*3;
inner.rotation.y=-t*.4-sy*10;inner.rotation.z=t*.2;
ring.rotation.z=t*.2+sy*5;ring2.rotation.y=t*.15-sy*4;
var s=1+Math.sin(t*1.2)*.03+sy*.6;core.scale.setScalar(s);
grp.position.x=Math.sin(sy*Math.PI*2)*2.2*(innerWidth>720?1:.3);
grp.position.y=-sy*1.2;
grp.rotation.y+=((mx*1.2)-grp.rotation.y)*.05;grp.rotation.x+=((my*.8)-grp.rotation.x)*.05;
pts.rotation.y=t*.02+sy*2;pts.rotation.x=sy*1.2;
cam.position.z=7-sy*2;
R.render(sc,cam)})();
