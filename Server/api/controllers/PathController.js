/**
 * PathController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - getPath
    getPath: async function (req, res) {
        console.log('### Quering getPath with ');

        // https://github.com/albertorestifo/node-dijkstra

        var path;

        var from = req.params.from;
        var to   = req.params.to;
        var ios = req.params.ios;

        console.log('from: ' + from + ', to: ' + to);

        path = sails.getPath(from, to);

        // console.log(path);

        console.log('Finish quering with the value is ' + path);
        console.log('//////////////////////////////////////////////////');

        if(ios == 'ios') {

            if(!path){
                return res.view('pages/route', {layout: null, 'msg': 'No Found'});
            }

            return res.view('pages/route', { layout: null, 'path':path, 'msg': from + " > " + to + "   ~ " });
        }

        

        return res.ok(path);
    },
  
    // action - getPaths (mulitple destination)
    getPath_mulitpleDestination: async function (req, res) {

        // var from = req.params.from;
        // var destination_Arr = req.params.to.toUpperCase().split('-');

        // var paths_arr = [];

        // // https://github.com/albertorestifo/node-dijkstra

        // const Graph = require('node-dijkstra');

        // const route = new Graph();

        // route.addNode('A', { B: 1 });
        // route.addNode('B', { A: 1, C: 2, D: 4 });
        // route.addNode('C', { B: 2, D: 1 });
        // route.addNode('D', { C: 1, B: 4 });

        // // step 1
        
        // destination_Arr.forEach((dest, index) => {
        //     paths_arr.push(route.path(from, dest, { cost: true }));
        //     from = dest;
        // });

        // // console.log(path);

        // return res.ok(paths_arr);

        var val = await Path.findOne({ name: 'RRS701' });

        return res.ok(val.location.area);
    },

    getPointDetail: async function (req, res) {
        console.log('### Quering the getPointDetail with ');

        var point = req.params.point;
        var from = req.params.from;

        console.log('point: ' + point + ', from: ' + from);

        var val = await Path.findOne({ where: {name: point}, select: ['name', 'location', 'image'] });

        if(val){
            if(from){

                console.log('From ' + from);
                
                // val.image.S
            }
        }else{
            val = 'No this point.';
        }

        console.log('Finish quering with the value is ' + val);
        console.log('//////////////////////////////////////////////////');

        return res.ok(val);
    },

};

