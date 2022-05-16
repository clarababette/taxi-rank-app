import './style.scss';
import routes from './taxi-rank.js';

const taxiRankRoutes = [
  {
    destination: 'Makhaza',
    people: [],
    taxis: [],
    departed: [],
  },
  {
    destination: 'Belhar',
    people: [],
    taxis: [],
    departed: [],
  },
  {
    destination: 'Bellville',
    people: [],
    taxis: [],
    departed: [],
  },
];

// const taxiRank = localStorage.getItem('routes')
//   ? new Route(JSON.parse(localStorage.getItem('routes')))
//   : new Route(taxiRankRoutes);

// const updateStorage = () => {
//   localStorage.setItem('routes', JSON.stringify(taxiRank.routes));
// };

import Alpine from 'alpinejs'
 
window.Alpine = Alpine

Alpine.data('taxiRank', routes)
 
Alpine.start()



//busy: false,
    // routes: taxiRank.detailedRoutes,
    // removePassenger(destination) {
    //   taxiRank.removePerson(destination);
    //   this.routes = taxiRank.detailedRoutes
    //   updateStorage()
    // },
    // addPassenger(destination) {
    //   taxiRank.addPerson(destination);
    //   this.routes = taxiRank.detailedRoutes
    //   updateStorage()
    // },
    // addTaxi(destination) {
    //   taxiRank.addTaxi(destination);
    //  this.routes = taxiRank.detailedRoutes
    //   updateStorage()
    // },

// document.querySelector('#app').innerHTML = `<div class="routes">
//                        ${allRoutesTemplate({
//                          routes: taxiRank.detailedRoutes,
//                        })} </div>`;

// const updateWaitTime = () => {
//   taxiRank.detailedRoutes.forEach((route) => {
//     document.querySelector(`#${route.destination} .time`).innerHTML =
//       route.avgWaitTime;
//   });
// };

// setInterval(updateWaitTime, 60000);

// const updatePersonQueueElem = (people, destination) => {
//   document.querySelector(`#${destination} .num-people`).innerHTML = people;
// };
// const updateTaxiQueueElem = (taxis, destination, nextTaxi) => {
//   document.querySelector(`#${destination} .num-taxis`).innerHTML = taxis;
//   const notOnly = document
//     .querySelector(`#${destination} .next-to-depart`)
//     .firstElementChild.classList.contains('ready');
//   if (!notOnly) {
//     document.querySelector(
//       `#${destination} .next-to-depart`,
//     ).innerHTML = `<div class="ready"><div>Next taxi to depart</div><div class="taxi-icon material-icons-round">airport_shuttle</div><div>arrived @ ${nextTaxi}</div></div>`;
//   }
// };

// const wait = false;

// document.querySelector('.routes').addEventListener('click', (event) => {
//   const route = event.target.parentNode.parentNode.id;
//   const action = event.target.classList[0];
//   const buttons = ['.remove_person', '.add_person', '.add_taxi'];
//   buttons.forEach((button) => {
//     document.querySelector(`#${route} ${button}`).disabled = true;
//   });
//   taxiRank.queue = route;
//   const prevDeparted = taxiRank.queue.numTaxisDeparted;
//   switch (action) {
//     case 'remove_person':
//       updatePersonQueueElem(taxiRank.removePerson(), route);
//       break;
//     case 'add_person':
//       updatePersonQueueElem(taxiRank.addPerson(), route);
//       break;
//     case 'add_taxi':
//       taxiRank.addTaxi();
//       updateTaxiQueueElem(
//         taxiRank.queue.numTaxisWaiting,
//         route,
//         taxiRank.queue.nextTaxi,
//       );
//       break;
//     default:
//       break;
//   }

//   const departure = new Promise((resolve, reject) => {
//     if (taxiRank.queue.numTaxisDeparted > prevDeparted) {
//       document.querySelector(
//         `#${route} .next-to-depart`,
//       ).innerHTML = `<div class="departing"><div>DEPARTING</div><div class="taxi-icon material-icons-round">airport_shuttle</div><div>NOW</div></div>`;
//       setTimeout(() => {
//         document.querySelector(`#${taxiRank.queue.destination}`).innerHTML =
//           routeTemplate(taxiRank.queue);
//         resolve();
//       }, 5000);
//     } else {
//       resolve();
//     }
//   });

//   departure.then(() => {
//     buttons.forEach(
//       (button) =>
//         (document.querySelector(`#${route} ${button}`).disabled = false),
//     );
//   });
//   localStorage.setItem('routes', JSON.stringify(taxiRank.routes));
// });
