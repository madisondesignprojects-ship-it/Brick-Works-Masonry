(function(){
  document.documentElement.classList.add("js");
  // hours (America/Chicago): Mon–Fri 7–17, Sat–Sun 8–12
  var H={0:[8,12],1:[7,17],2:[7,17],3:[7,17],4:[7,17],5:[7,17],6:[8,12]},L=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var p=new Intl.DateTimeFormat("en-US",{timeZone:"America/Chicago",weekday:"short",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date());
  var g=function(t){return(p.find(function(x){return x.type===t})||{}).value};
  var d=L.indexOf(g("weekday")),m=(parseInt(g("hour"),10)%24)*60+parseInt(g("minute"),10),c=document.querySelector(".js-open");
  var fmt=function(h){return(h>12?h-12:h)+(h>=12?"pm":"am")};
  if(c&&d>-1){var o=H[d][0]*60,e=H[d][1]*60;
    if(m>=o&&m<e){c.textContent="Open now · until "+fmt(H[d][1]);c.classList.add("is-open")}
    else if(m<o){c.textContent="Opens today at "+fmt(H[d][0]);c.classList.add("is-closed")}
    else{var n=(d+1)%7;c.textContent="Closed now · opens "+(L[n])+" "+fmt(H[n][0]);c.classList.add("is-closed")}
    var r=document.querySelector('.hours tr[data-day="'+d+'"]');if(r)r.classList.add("is-today")}
  var y=document.querySelector(".js-year");if(y)y.textContent=new Date().getFullYear();
  var hdr=document.getElementById("hdr");addEventListener("scroll",function(){hdr.classList.toggle("is-scrolled",scrollY>8)},{passive:true});
  var els=document.querySelectorAll(".reveal");
  if("IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("is-in");io.unobserve(x.target)}})},{rootMargin:"0px 0px -10% 0px"});els.forEach(function(el,i){el.style.transitionDelay=(i%3)*60+"ms";io.observe(el)})}else els.forEach(function(el){el.classList.add("is-in")});
  // quote form -> mailto
  var f=document.getElementById("qform"),err=document.getElementById("ferr");
  if(f)f.addEventListener("submit",function(ev){ev.preventDefault();var ok=true;
    ["name","phone","type"].forEach(function(k){var el=f.elements[k],bad=!el.value.trim();el.setAttribute("aria-invalid",bad);if(bad)ok=false});
    err.hidden=ok;if(!ok){f.querySelector('[aria-invalid="true"]').focus();return}
    var v=function(k){return f.elements[k].value.trim()};
    var body="Name: "+v("name")+"\nPhone: "+v("phone")+"\nEmail: "+v("email")+"\nTown: "+v("town")+"\nProject: "+v("type")+"\nBest time to call: "+v("when")+"\n\n"+v("msg");
    location.href="mailto:brickworks1@charter.net?subject="+encodeURIComponent("Quote request: "+v("type")+" ("+v("name")+")")+"&body="+encodeURIComponent(body)});
})();
