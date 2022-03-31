import assert from 'assert';
import {Route} from '../taxi-rank.js';
import MockDate from 'mockdate';

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

describe('The Taxi Rank Route class', () => {
  it('should add a person to a specific queue.', () => {
    const taxiRank = new Route([...taxiRankRoutes]);
    taxiRank.queue = 'Bellville';
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    assert.strictEqual(taxiRank.queue.numPeople, 5);
  });
  it('should remove a person to a specific queue.', () => {
    const taxiRank = new Route([...taxiRankRoutes]);
    taxiRank.queue = 'Bellville';
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.removePerson();
    assert.strictEqual(taxiRank.queue.numPeople, 3);
  });
  it('should add a taxi to a specific queue.', () => {
    const taxiRank = new Route([...taxiRankRoutes]);
    taxiRank.queue = 'Belhar';
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    assert.strictEqual(taxiRank.queue.numTaxisWaiting, 7);
  });
  it('should remove a taxi from the queue once there are enough waiting passengers to fill it.', () => {
    const taxiRank = new Route([...taxiRankRoutes]);
    taxiRank.queue = 'Belhar';
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    taxiRank.addTaxi();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    taxiRank.addPerson();
    assert.strictEqual(taxiRank.queue.numTaxisWaiting, 2);
  });

  it('should return the avgerage wait time of the people in the queue.', () => {
    const taxiRank = new Route([...taxiRankRoutes]);
    taxiRank.queue = 'Makhaza';
    MockDate.set('Mar 31 2022 12:08:00 GMT+0200');
    taxiRank.addPerson();
    MockDate.set('Mar 31 2022 12:10:00 GMT+0200');
    taxiRank.addPerson();
    MockDate.set('Mar 31 2022 12:12:00 GMT+0200');
    taxiRank.addPerson();
    MockDate.set('Mar 31 2022 12:18:00 GMT+0200');
    taxiRank.addPerson();
    MockDate.set('Mar 31 2022 12:20:00 GMT+0200');
    taxiRank.addPerson();
    MockDate.set('Mar 31 2022 12:24:00 GMT+0200');
    taxiRank.addPerson();
    MockDate.set('Mar 31 2022 12:30:00 GMT+0200');
    assert.strictEqual(taxiRank.queue.avgWaitTime, '15 minutes');
  });
  it('should return the number of taxis that have departed in the last hour.', () => {
    const taxiRank = new Route([...taxiRankRoutes]);
    taxiRank.queue = 'Makhaza';
    MockDate.set('Mar 31 2022 12:30:00 GMT+0200');
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson();
    }
    MockDate.set('Mar 31 2022 12:35:00 GMT+0200');
    taxiRank.addTaxi();
    taxiRank.queue;
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson();
    }
    MockDate.set('Mar 31 2022 12:46:00 GMT+0200');
    taxiRank.addTaxi();
    taxiRank.queue;
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson();
    }
    MockDate.set('Mar 31 2022 12:55:00 GMT+0200');
    taxiRank.addTaxi();
    taxiRank.queue;
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson();
    }
    MockDate.set('Mar 31 2022 13:25:00 GMT+0200');
    taxiRank.addTaxi();
    taxiRank.queue;
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson();
    }
    MockDate.set('Mar 31 2022 13:35:00 GMT+0200');
    taxiRank.addTaxi();
    taxiRank.queue;
    MockDate.set('Mar 31 2022 13:45:00 GMT+0200');
    assert.strictEqual(taxiRank.queue.numTaxisDeparted, 4);
  });
});
MockDate.reset();
