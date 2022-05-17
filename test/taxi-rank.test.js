import assert from 'assert';
import Route from '../taxi-rank.js';
import MockDate from 'mockdate';

global.window = {}
import 'mock-local-storage'
window.localStorage = global.localStorage

describe('The Taxi Rank', () => {
  it('should add a person to a specific queue.', () => {
    const taxiRank = Route();
    taxiRank.addPerson('Bellville');
    taxiRank.addPerson('Bellville');
    taxiRank.addPerson('Bellville');
    taxiRank.addPerson('Bellville');
    taxiRank.addPerson('Bellville');
    const routeIndex = taxiRank.routeIndex('Bellville')
    assert.strictEqual(taxiRank.detailedRoutes[routeIndex].numPeople, 5);
  });
  it('should remove a person to a specific queue.', () => {
   const taxiRank = Route();
    taxiRank.addPerson('Bellville');
    taxiRank.addPerson('Bellville');
    taxiRank.addPerson('Bellville');
    taxiRank.addPerson('Bellville');
    taxiRank.removePerson('Bellville');
    const routeIndex = taxiRank.routeIndex('Bellville')
    assert.strictEqual(taxiRank.detailedRoutes[routeIndex].numPeople, 3);
  });
  it('should add a taxi to a specific queue.', () => {
     const taxiRank = Route();
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    const routeIndex = taxiRank.routeIndex('Belhar')
    assert.strictEqual(taxiRank.detailedRoutes[routeIndex].numTaxisWaiting, 7);
  });
  it('should remove a taxi from the queue once there are enough waiting passengers to fill it.', () => {
     const taxiRank = Route();
    taxiRank.queue = 'Belhar';
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    taxiRank.addTaxi('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    taxiRank.addPerson('Belhar');
    const routeIndex = taxiRank.routeIndex('Belhar')
    assert.strictEqual(taxiRank.detailedRoutes[routeIndex].numTaxisWaiting, 2);
  });

  it('should return the avgerage wait time of the people in the queue.', () => {
    const taxiRank = Route();
    MockDate.set('Mar 31 2022 12:08:00 GMT+0200');
    taxiRank.addPerson('Makhaza');
    MockDate.set('Mar 31 2022 12:10:00 GMT+0200');
    taxiRank.addPerson('Makhaza');
    MockDate.set('Mar 31 2022 12:12:00 GMT+0200');
    taxiRank.addPerson('Makhaza');
    MockDate.set('Mar 31 2022 12:18:00 GMT+0200');
    taxiRank.addPerson('Makhaza');
    MockDate.set('Mar 31 2022 12:20:00 GMT+0200');
    taxiRank.addPerson('Makhaza');
    MockDate.set('Mar 31 2022 12:24:00 GMT+0200');
    taxiRank.addPerson('Makhaza');
    MockDate.set('Mar 31 2022 12:30:00 GMT+0200');
    const routeIndex = taxiRank.routeIndex('Makhaza')
    assert.strictEqual(taxiRank.detailedRoutes[routeIndex].avgWaitTime, '15 minutes');
  });
  it('should return the number of taxis that have departed in the last hour.', () => {
     const taxiRank = Route();
    MockDate.set('Mar 31 2022 12:30:00 GMT+0200');
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson('Makhaza');
    }
    taxiRank.detailedRoutes
    MockDate.set('Mar 31 2022 12:35:00 GMT+0200');
    taxiRank.addTaxi('Makhaza');
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson('Makhaza');
    }
     taxiRank.detailedRoutes
    MockDate.set('Mar 31 2022 12:46:00 GMT+0200');
    taxiRank.addTaxi('Makhaza');
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson('Makhaza');
    }
     taxiRank.detailedRoutes
    MockDate.set('Mar 31 2022 12:55:00 GMT+0200');
    taxiRank.addTaxi('Makhaza');
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson('Makhaza');
    }
     taxiRank.detailedRoutes
    MockDate.set('Mar 31 2022 13:25:00 GMT+0200');
    taxiRank.addTaxi('Makhaza');
    for (let i = 0; i < 12; i++) {
      taxiRank.addPerson('Makhaza');
    }
     taxiRank.detailedRoutes
    MockDate.set('Mar 31 2022 13:35:00 GMT+0200');
    taxiRank.addTaxi('Makhaza');
    taxiRank.detailedRoutes
    MockDate.set('Mar 31 2022 13:45:00 GMT+0200');

    const routeIndex = taxiRank.routeIndex('Makhaza')
    assert.strictEqual(taxiRank.detailedRoutes[routeIndex].numTaxisDeparted, 4);
  });
});
MockDate.reset();
