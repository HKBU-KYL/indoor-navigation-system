/**
 * PathController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - getPath
    getPath: async function (req, res) {

        // https://github.com/albertorestifo/node-dijkstra

        var path;

        var from = req.params.from;
        var to   = req.params.to;

        path = sails.getPath(from, to);

        // console.log(path);

        return res.ok(path);
    },
  
    // action - getPaths (mulitple destination)
    getPath_mulitpleDestination: async function (req, res) {

        var from = req.params.from;
        var destination_Arr = req.params.to.toUpperCase().split('-');

        var paths_arr = [];

        // https://github.com/albertorestifo/node-dijkstra

        const Graph = require('node-dijkstra');

        const route = new Graph();

        route.addNode('A', { B: 1 });
        route.addNode('B', { A: 1, C: 2, D: 4 });
        route.addNode('C', { B: 2, D: 1 });
        route.addNode('D', { C: 1, B: 4 });

        // step 1
        
        destination_Arr.forEach((dest, index) => {
            paths_arr.push(route.path(from, dest, { cost: true }));
            from = dest;
        });

        // console.log(path);

        return res.ok(paths_arr);
    },

};

