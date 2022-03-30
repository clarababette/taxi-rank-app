import './style.scss';
import {Route} from './taxi-rank';
import Handlebars from 'handlebars';

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

const nextTaxiSource = `<div class="next-to-depart">
                          {{#if this.nextTaxi}}
                          <div class="ready"><div>Next taxi to depart</div><div class="taxi-icon material-icons-round">airport_shuttle</div><div>arrived @ {{this.nextTaxi}}</div></div>
                          {{else}}
                          <div>There are no available taxis at the moment.</div>
                          {{/if}}
                        </div>`;
const peopleQueueSource = `<div class="people-queue">
                        <div>Passenger Queue</div>
                        <button class="remove_person material-icons-round">remove_circle</button>
                        <span class="num-people">{{this.numPeople}}</span>
                        <button class="add_person material-icons-round">add_circle</button></div>`;
const taxiQueueSource = `<div class="taxi-queue">
                        <div>Taxi Queue</div>
                        <div class="num-taxis">{{this.numTaxisWaiting}}</div>
                        <button class="add_taxi">Add taxi to queue</button></div>`;
const waitTimeSource = `<div class="wait-time">
                        <div>Average passenger wait time</div>
                        <div class="time">{{this.avgWaitTime}}</div>
                        </div>`;
const departedTaxisSource = `<div class="departed-taxis">
                        <div>No. of taxis departed in the last hour</div>
                        <div class="num-departed">{{this.numTaxisDeparted}}</div>
                        </div>`;

const routeSource = `<div class="destination">{{destination}}</div>
${nextTaxiSource}
${peopleQueueSource}
${taxiQueueSource}
${waitTimeSource}
${departedTaxisSource}`;

const allRoutesSource = `{{#each routes}}
<div class="route" id="{{this.destination}}">${routeSource}</div>
{{/each}}`;

const routeTemplate = Handlebars.compile(routeSource);
const allRoutesTemplate = Handlebars.compile(allRoutesSource);

const taxiRank = localStorage.getItem('routes')
  ? new Route(JSON.parse(localStorage.getItem('routes')))
  : new Route(taxiRankRoutes);

document.querySelector('#app').innerHTML = `<div class="routes">
                       ${allRoutesTemplate({
                         routes: taxiRank.detailedRoutes,
                       })} </div>`;

const updateWaitTime = () => {
  taxiRank.detailedRoutes.forEach((route) => {
    document.querySelector(`#${route.destination} .time`).innerHTML =
      route.avgWaitTime;
  });
};

setInterval(updateWaitTime, 60000);

const updatePersonQueueElem = (people, destination) => {
  document.querySelector(`#${destination} .num-people`).innerHTML = people;
};
const updateTaxiQueueElem = (taxis, destination, nextTaxi) => {
  document.querySelector(`#${destination} .num-taxis`).innerHTML = taxis;
  const notOnly = document
    .querySelector(`#${destination} .next-to-depart`)
    .firstElementChild.classList.contains('ready');
  if (!notOnly) {
    document.querySelector(
      `#${destination} .next-to-depart`,
    ).innerHTML = `<div class="ready"><div>Next taxi to depart</div><div class="taxi-icon material-icons-round">airport_shuttle</div><div>arrived @ ${nextTaxi}</div></div>`;
  }
};

const wait = false;

document.querySelector('.routes').addEventListener('click', (event) => {
  const route = event.target.parentNode.parentNode.id;
  const action = event.target.classList[0];
  const buttons = ['.remove_person', '.add_person', '.add_taxi'];
  buttons.forEach((button) => {
    document.querySelector(`#${route} ${button}`).disabled = true;
  });
  taxiRank.queue = route;
  const prevDeparted = taxiRank.queue.numTaxisDeparted;
  switch (action) {
    case 'remove_person':
      updatePersonQueueElem(taxiRank.removePerson(), route);
      break;
    case 'add_person':
      updatePersonQueueElem(taxiRank.addPerson(), route);
      break;
    case 'add_taxi':
      taxiRank.addTaxi();
      updateTaxiQueueElem(
        taxiRank.queue.numTaxisWaiting,
        route,
        taxiRank.queue.nextTaxi,
      );
      break;
    default:
      break;
  }

  const departure = new Promise((resolve, reject) => {
    if (taxiRank.queue.numTaxisDeparted > prevDeparted) {
      document.querySelector(
        `#${route} .next-to-depart`,
      ).innerHTML = `<div class="departing"><div>DEPARTING</div><div class="taxi-icon material-icons-round">airport_shuttle</div><div>NOW</div></div>`;
      setTimeout(() => {
        document.querySelector(`#${taxiRank.queue.destination}`).innerHTML =
          routeTemplate(taxiRank.queue);
        resolve();
      }, 5000);
    } else {
      resolve();
    }
  });

  departure.then(() => {
    buttons.forEach(
      (button) =>
        (document.querySelector(`#${route} ${button}`).disabled = false),
    );
  });
  localStorage.setItem('routes', JSON.stringify(taxiRank.routes));
});
