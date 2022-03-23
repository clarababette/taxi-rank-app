const d=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}};d();class c{constructor(t){this._routes=t}addPerson(){this._people++}removePerson(){this._people--}addTaxi(){this._taxis++;const t=new Date;this._activity=[`Taxi arrived @ ${t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`,...this._activity]}updateQueue(){for(;Math.floor(this._people/11)>0&&this._taxis>0;){this._people-=11,this._taxis--;const i=new Date;this._activity=[`Taxi departed @ ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`,...this._activity]}const t=this._routes.findIndex(i=>i.destination==this._destination);console.log(t),this._routes[t]={destination:this._destination,people:this._people,taxis:this._taxis,activity:this._activity}}get routes(){return this._routes}set queue(t){const i=this._routes.find(a=>a.destination==t);this._destination=i.destination,this._people=i.people,this._taxis=i.taxis,this._activity=i.activity}get queue(){return this.updateQueue(),{destination:this._destination,people:this._people,taxis:this._taxis,activity:this._activity}}}const l=[{destination:"Makhaza",people:12,taxis:0,activity:[]},{destination:"Belhar",people:34,taxis:0,activity:[]},{destination:"Bellville",people:23,taxis:0,activity:[]}],n=new c(l),u=n.routes.map(e=>{const t=e.activity.map(i=>`<div>${i}</div>`).join(" ");return`<div class="route" id="${e.destination}">
    <div class="destination">${e.destination}</div>
    <div class="people">
      <div>Passengers waiting</div>
      <button class="remove_person material-icons-round">remove_circle</button>
      <span>${e.people}</span>
      <button class="add_person material-icons-round">add_circle</button></div>
    <div class="taxis">
      <div>Taxis ready to depart</div>
        <span>${e.taxis}</span>
        <button class="add_taxi material-icons-round">add_circle</button></div>
    <div class="activity"><div class="material-icons-round">
airport_shuttle
</div><div><span>${t}</span></div></div>
  </div>`}),p=`<div class="routes">
                       ${u.join(" ")}
                    </div>`;document.querySelector("#app").innerHTML=p;const v=e=>{const t=e.activity.map(i=>`<div>${i}</div>`).join(" ");document.querySelector(`#${e.destination} .people span`).innerHTML=e.people,document.querySelector(`#${e.destination} .taxis span`).innerHTML=e.taxis,document.querySelector(`#${e.destination} .activity span`).innerHTML=t};document.querySelector(".routes").addEventListener("click",e=>{const t=e.target.parentNode.parentNode.id,i=e.target.classList[0];switch(n.queue=t,i){case"remove_person":n.removePerson();break;case"add_person":n.addPerson();break;case"add_taxi":n.addTaxi();break}console.log(n.queue),v(n.queue),console.log(n.routes)});
