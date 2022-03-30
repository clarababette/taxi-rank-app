import moment from 'moment';

export class Route {
  constructor(routes) {
    this._routes = routes;
  }
  addPerson() {
    this._people = [...this._people, new Date()];
    return this._people.length;
  }
  removePerson() {
    this._people.shift();
    return this._people.length;
  }
  addTaxi() {
    this._taxis = [...this._taxis, new Date()];
    return {
      nextTaxi: this._taxis[0]
        ? moment(this._taxis[0]).format('LT')
        : undefined,
      numTaxisWaiting: this._taxis.length,
    };
  }
  updateQueue() {
    while (Math.floor(this._people.length / 11) > 0 && this._taxis.length > 0) {
      this._people.splice(0, 11);
      this._taxis.shift();
      this._departed = [...this._departed, moment().toISOString()];
    }
    const routeIndex = this._routes.findIndex(
      (route) => route.destination == this._destination,
    );
    this._routes[routeIndex] = {
      destination: this._destination,
      people: this._people,
      taxis: this._taxis,
      departed: this._departed,
    };
  }

  avgWaitTime(destination = this._destination) {
    const queue = this._routes.find(
      (route) => route.destination == destination,
    );
    const milliseconds =
      queue.people.reduce((sum, time) => {
        return (
          sum + moment.duration(moment().diff(moment(time))).asMilliseconds()
        );
      }, 0) / queue.people.length;
    return moment.duration(milliseconds, 'milliseconds').humanize();
  }

  recentlyDeparted(departed = this._departed) {
    return departed.filter((time) =>
      moment(time).isBetween(moment().subtract(1, 'hours'), moment()),
    );
  }

  get detailedRoutes() {
    return this._routes.map((route) => {
      return {
        destination: route.destination,
        numPeople: route.people ? route.people.length : 0,
        nextTaxi: route.taxis[0]
          ? moment(route.taxis[0]).format('LT')
          : undefined,
        numTaxisWaiting: route.taxis.length,
        avgWaitTime: route.people[0]
          ? this.avgWaitTime(route.destination)
          : 'There are no passengers waiting at this time.',
        numTaxisDeparted: route.departed
          ? this.recentlyDeparted(route.departed).length
          : 0,
      };
    });
  }

  get routes() {
    return this._routes;
  }

  set queue(destination) {
    const queue = this._routes.find(
      (route) => route.destination == destination,
    );
    this._destination = queue.destination;
    this._people = queue.people;
    this._taxis = queue.taxis;
    this._departed = queue.departed;
  }

  get queue() {
    this.updateQueue();
    return {
      destination: this._destination,
      numPeople: this._people.length,
      nextTaxi: this._taxis[0]
        ? moment(this._taxis[0]).format('LT')
        : undefined,
      numTaxisWaiting: this._taxis.length,
      avgWaitTime: this.avgWaitTime(),
      numTaxisDeparted: this._departed ? this.recentlyDeparted().length : 0,
    };
  }
}
