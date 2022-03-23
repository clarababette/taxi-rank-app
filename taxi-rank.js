// ROUTE DATA STRUCTURE
// [{
//   destination: string,
//   people: number,
//   taxis: number,
//   activity: [taxi arrived @ TIME || taxi departed @ TIME]
// }]


export class Route {
  constructor(routes) {
    this._routes = routes;
  
  }
  addPerson() {
    this._people++;
  }
  removePerson() {
    this._people--;
  }
  addTaxi() {
    this._taxis++;
    const time = new Date();
    this._activity = [`Taxi arrived @ ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, ...this._activity];
  }
  updateQueue() {
    while (Math.floor(this._people / 11) > 0 && this._taxis > 0) {
      this._people -= 11;
      this._taxis--;
      const time = new Date();
      this._activity = [`Taxi departed @ ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, ...this._activity];
    }
    const routeIndex = this._routes.findIndex(route => route.destination == this._destination);
    console.log(routeIndex)
    this._routes[routeIndex] = {
      destination: this._destination,
      people: this._people,
      taxis: this._taxis,
      activity: this._activity
    }
  }

  get routes() {
    return this._routes;
  }

  set queue(destination) {
    const queue = this._routes.find(route => route.destination == destination);
    this._destination = queue.destination;
    this._people = queue.people;
    this._taxis = queue.taxis;
    this._activity = queue.activity;

  }

  get queue() {
    this.updateQueue();
    return {
      destination: this._destination,
      people: this._people,
      taxis: this._taxis,
      activity: this._activity
    }
  }
}
