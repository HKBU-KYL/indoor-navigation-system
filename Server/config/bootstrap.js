/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  await Path.createEach([
    { name: 'RRS701', location: { area: 'RRS Building', floor: '7' }, image: { S: 'S', N: 'N' }, point: { x: 'x', y: 'y' }, relationship: { RRS702: 5, RRS703: 4 } },
    { name: 'RRS702', location: { area: 'RRS Building', floor: '7' }, image: { S: 'S', N: 'N' }, point: { x: 'x', y: 'y' }, relationship: { RRS701: 5, RRS705: 4 } },
    // etc.
  ]);

  const Graph = require('node-dijkstra');
  const route = new Graph();

  var val = await Path.findOne({ name: 'RRS701' });

  route.addNode('RRS701', val.relationship);

  val = await Path.findOne({ name: 'RRS702' });

  route.addNode('RRS702', val.relationship);

  sails.getPath = function (from, to) {

    // const Graph = require('node-dijkstra');
    // const route = new Graph();

    // var val = await Path.findOne({ name: 'RRS701' });

    // route.addNode('RRS701', val.relationship);

    // val = await Path.findOne({ name: 'RRS702' });

    // route.addNode('RRS702', val.relationship);

    // route.addNode('RRS_EXIT_1', { RRS_CROSS_1: 5 });
    // route.addNode('RRS_CROSS_1', { RRS701: 1.6, RRS732: 2.5, RRS_EXIT_1: 5 });
    // route.addNode('RRS701', { RRS_CROSS_1: 1.6, RRS_CROSS_2: 3.5 });
    // route.addNode('RRS_CROSS_2', { RRS701: 3.5, RRS730: 2, RRS_CROSS_3: 6 });
    // route.addNode('RRS_CROSS_3', { RRS_CROSS_2: 6, RRS702: 0.1, RRS703: 1.5, RRS728: 1.6 });
    // route.addNode('RRS702', { RRS_CROSS_3: 0.1 });
    // route.addNode('RRS703', { RRS_CROSS_3: 1.5, RRS728: 1, RRS704: 1.3 });
    // route.addNode('RRS704', { RRS703: 1.3, RRS705: 4.8, RRS728: 1 });
    route.addNode('RRS705', { RRS704: 4.8, RRS706: 1.3 });
    route.addNode('RRS706', { RRS705: 1.3, RRS707: 3.3 });
    // route.addNode('RRS707', { RRS706: 3.3, RRS708: 2.35 });
    // route.addNode('RRS708', { RRS707: 2.35, RRS709: 1.3 });
    // route.addNode('RRS709', { RRS708: 1.3, RRS710: 3.3 });
    // route.addNode('RRS710', { RRS709: 3.3, RRS711: 1.3 });
    // route.addNode('RRS711', { RRS710: 1.3, RRS712: 3.3 });
    // route.addNode('RRS712', { RRS711: 3.3, RRS713: 1.3 });
    // route.addNode('RRS713', { RRS712: 1.3, RRS_CROSS_4: 0.5 });
    // route.addNode('RRS_CROSS_4', { RRS713: 0.5, RRS_CROSS_5: 5.7 });
    // route.addNode('RRS_CROSS_5', { RRS_CROSS_4: 5.7, RRS_EXIT_2: 0.1, RRS715: 1.4 });
    // route.addNode('RRS_EXIT_2', { RRS_CROSS_5: 0.1 });
    // route.addNode('RRS715', { RRS_CROSS_4: 1.4, RRS717: 3.3 });
    // route.addNode('RRS717', { RRS715: 3.3, RRS719: 1.3, RRS716: 0.5 });
    // route.addNode('RRS716', { RRS717: 0.5, RRS719: 0.6 });
    // route.addNode('RRS719', { RRS717: 1.3, RRS716: 0.6, RRS721: 3.3 });
    // route.addNode('RRS721', { RRS719: 3.3, RRS723: 1.3, RRS722: 0.6 });
    // route.addNode('RRS723', { RRS721: 1.3, RRS722: 0.5, RRS725: 2 });
    // route.addNode('RRS725', { RRS723: 2, RRS726: 1.6, RRS27: 2.2 });
    // route.addNode('RRS727', { RRS725: 2.2, RRS726: 1, RRS729: 1.3 });
    // route.addNode('RRS726', { RRS725: 1.6, RRS727: 1 });
    // route.addNode('RRS729', { RRS727: 1.3, RRS730: 4.6 });
    // route.addNode('RRS730', { RRS729: 4.6, RRS_CROSS_2: 2 });
    // route.addNode('RRS732', { RRS_CROSS_1: 2.5, RRS734: 8.15 });
    // route.addNode('RRS734', { RRS732: 8.15, RRS735: 5 });
    // route.addNode('RRS735', { RRS734: 5, RRS_EXIT_3: 0.5 });
    // route.addNode('RRS_EXIT_3', { RRS735: 0.5 });

    return route.path(from, to, { cost: true });

  }

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
