import './style.scss';
import { Route } from './taxi-rank';

const taxiRankRoutes = [
  {
      destination: 'Makhaza',
      people: 12,
      taxis: 0,
      activity: []
  },
  {
      destination: 'Belhar',
      people: 34,
      taxis: 0,
      activity: []
  },
  {
      destination: 'Bellville',
      people: 23,
      taxis: 0,
      activity: []
  },
  
]

const taxiRank = new Route(taxiRankRoutes);

const routeElems = taxiRank.routes.map((route) => {
  const activity = route.activity.map(act => `<div>${act}</div>`).join(' ');
 return `<div class="route" id="${route.destination}">
    <div class="destination">${route.destination}</div>
    <div class="people">
      <div>Passengers waiting</div>
      <button class="remove_person material-icons-round">remove_circle</button>
      <span>${route.people}</span>
      <button class="add_person material-icons-round">add_circle</button></div>
    <div class="taxis">
      <div>Taxis ready to depart</div>
        <span>${route.taxis}</span>
        <button class="add_taxi material-icons-round">add_circle</button></div>
    <div class="activity"><div class="material-icons-round">
airport_shuttle
</div><div><span>${activity}</span></div></div>
  </div>`
})

const rankElem = `<div class="routes">
                       ${routeElems.join(' ')}
                    </div>`

document.querySelector('#app').innerHTML = rankElem;

const updateQueueElem = (queue) => {
  const activity = queue.activity.map(act => `<div>${act}</div>`).join(' ');
  document.querySelector(`#${queue.destination} .people span`).innerHTML = queue.people;
  document.querySelector(`#${queue.destination} .taxis span`).innerHTML = queue.taxis;
  document.querySelector(`#${queue.destination} .activity span`).innerHTML = activity;
}

document.querySelector('.routes').addEventListener('click', (event) => {
  const route = event.target.parentNode.parentNode.id;
  const action = event.target.classList[0];
  taxiRank.queue = route;
  switch (action) {
    case 'remove_person':
      taxiRank.removePerson();
      break;
    case 'add_person':
      taxiRank.addPerson();
      break;
    case 'add_taxi':
      taxiRank.addTaxi();
      break;
    default:
      break;
  }
  console.log(taxiRank.queue)
  updateQueueElem(taxiRank.queue)
  console.log(taxiRank.routes)
})
