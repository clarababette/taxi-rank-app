import './style.css';
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
 return `<tr id="${route.destination}">
    <td class="destination">${route.destination}</td>
    <td class="people"><button class="remove_person">-</button><span>${route.people}</span><button class="add_person">+</button></td>
    <td class="taxis"><span>${route.taxis}</span><button class="add_taxi">+</button></td>
    <td class="activity">${route.activity}</td>
  </tr>`
})

const rankElem = `<table class="queues">
                      <tr>
                        <th>Destination</th>
                        <th>Passenger Queue</th>
                        <th>Taxi Queue</th>
                        <th>Activity</th>
                       </tr>
                       ${routeElems.join(' ')}
                    </table>`

document.querySelector('#app').innerHTML = rankElem;

const updateQueueElem = (queue) => {
  document.querySelector(`#${queue.destination} .people span`).innerHTML = queue.people;
  document.querySelector(`#${queue.destination} .taxis span`).innerHTML = queue.taxis;
  document.querySelector(`#${queue.destination} .activity`).innerHTML = queue.activity;
}

document.querySelector('.queues').addEventListener('click', (event) => {
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
