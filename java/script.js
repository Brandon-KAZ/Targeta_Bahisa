(function(){
  var card=document.getElementById('card'),hint=document.getElementById('hint'),sc=document.getElementById('scaler');
  function fit(){var z=Math.min(innerWidth*.94/420,(innerHeight-56)/620,1.9);z=Math.max(z,.5);sc.style.zoom=z;var h=Math.round((innerHeight-56)/z);card.style.setProperty('--ch',Math.max(600,Math.min(h,760))+'px')}
  fit();addEventListener('resize',fit);
  function set(o){card.classList.toggle('open',o);hint.style.opacity=o?0:1;if(o)burst(innerWidth/2,innerHeight*.35,60,true)}
  document.getElementById('open').onclick=function(e){e.stopPropagation();set(true)};
  document.getElementById('close').onclick=function(e){e.stopPropagation();set(false)};
  document.getElementById('front').onclick=function(){set(true)};
  var c=document.getElementById('fx'),x=c.getContext('2d'),W,H,S=[],E=[],cols=['#e0533d','#b3262f','#f6f0ed','#ff8a6b'];
  function size(){W=c.width=innerWidth;H=c.height=innerHeight}
  size();addEventListener('resize',size);
  function burst(px,py,n,big){for(var i=0;i<n;i++){var a=Math.random()*6.283,v=(big?4:2.5)*Math.random()+1;S.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c:cols[i%4]})}}
  for(var i=0;i<45;i++)E.push({x:Math.random(),y:Math.random(),r:Math.random()*1.8+.5,v:Math.random()*.0004+.00015});
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(rm){return}
  setInterval(function(){burst(Math.random()*W,Math.random()*H*.55,28,false)},2600);
  (function t(){
    x.clearRect(0,0,W,H);
    E.forEach(function(p){p.y-=p.v;if(p.y<0){p.y=1;p.x=Math.random()}x.beginPath();x.arc(p.x*W,p.y*H,p.r,0,6.283);x.fillStyle='rgba(224,83,61,'+(.7*p.y)+')';x.fill()});
    S=S.filter(function(p){return p.l>0});
    S.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.045;p.vx*=.985;p.l-=.013;x.globalAlpha=Math.max(p.l,0);x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,2,0,6.283);x.fill()});
    x.globalAlpha=1;requestAnimationFrame(t);
  })();
})();
