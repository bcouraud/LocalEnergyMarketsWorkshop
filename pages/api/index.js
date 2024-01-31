// npm i numeric  for Linear Programming https://www.npmjs.com/package/numeric   and https://ccc-js.github.io/numeric2/documentation.html 
//import { data } from '../../../data/data'

import { abs } from 'numeric';
console.log("Hellooooo")
var result_optim_values = 0
var TemperatureOptim = 0
var PowerOptim = 0
var weight_env = 0.5;
var weight_cost = 0.5;
var Temperaturemin =[];
for (var i = 0; i <= 12; i++) {
  Temperaturemin.push(18);
}
var Optimfeasible = 0;
//import { apiHandler, usersRepo } from 'helpers/api';
let data = require('../../data/users.json');
var numeric = require("numeric")
let datacommunity = require('../../data/community.json');
// convert keys to array
// console.log("data users Keys", dataKeys)
// // print the number of keys
// console.log("number of keys", dataKeys.length);
// let databids = require('../../data/bids_users.json');
var nbtrialsleft = 10


const fs = require('fs');
function saveDataUsers() {
  fs.writeFileSync('data/users.json', JSON.stringify(data));
}
function saveDataCommunity() {
  fs.writeFileSync('data/community.json', JSON.stringify(datacommunity));
}



const { spawn } = require("child_process");


export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(data)
    // console.log(json(data))
  } else if (req.method === 'POST') {
    const newdata = JSON.parse(req.body)
    console.log(data)
    console.log("hllo")
    // //console.log(req)
    //console.log(req.socket.remoteAddress)
    //console.log(req.headers['x-forwarded-for'])
    let refererURL = req.headers.referer
    let findPart2 = refererURL.search("Part2");
    console.log("Partie 2:") 
    console.log(findPart2)
    let findPart1 = refererURL.search("Part1");
    console.log("Partie 1:") 
    console.log(findPart1)

    let findPart3 = refererURL.search("Part3");
    console.log("Partie 3 XXXXXXXXXXX:") 
    console.log(findPart3)
    // const ls = spawn("ls", ["-la"]);

    // ls.stdout.on("data", data => {
    //     console.log(`stdout: ${data}`);
    // });
    
    // ls.stderr.on("data", data => {
    //     console.log(`stderr: ${data}`);
    // });
    
    // ls.on('error', (error) => {
    //     console.log(`error: ${error.message}`);
    // });
    
    // ls.on("close", code => {
    //     console.log(`child process exited with code ${code}`);
    // });

    ////console.log(datacommunity)
    // //console.log(datacommunity[0].consumption)
    // data = data_origin //JSON.parse(data_origin)
    // const newdata =     {
    //     id: 39,
    //     value: [15,2,1,4]
    //   }
      // //console.log(newdata.id)
    //  //console.log(newdata.consumption)
  //  
  // const newdataJSON = JSON.parse(req.body)
  // //console.log(newdataJSON.id)

      var bool =0
    //   //console.log(data.filter(item => {
    //     return item.id === 19
    // }))
  //console.log("datacommunity:")
    //console.log(datacommunity[0].consumption.length)

    var index = data.findIndex((el) => el.id === newdata.id)
    if (index ===-1){
      data.push(newdata)
      for (var i=0;i<datacommunity[0].consumption.length; i++){
        datacommunity[0].consumption[i] += newdata.consumption[i]
        datacommunity[0].production[i] += newdata.production[i]
        index = data.length
      }
      console.log("Member already existing")
    }else {



      if(findPart2>0)
      {
        nbtrialsleft= Math.max(data[index].numberoftrialsleft-1,newdata.numberoftrialsleft)
      }

    if (nbtrialsleft>=-1){
      data[index] = {
        id: newdata.id,
        consumption: newdata.consumption,
        production: newdata.production,
        pricebid1: newdata.pricebid1,
        pricebid2: newdata.pricebid2,
        pricebid3: newdata.pricebid3,
        pricebid4: newdata.pricebid4,
        pricebid5: newdata.pricebid5,
        pricebid6: newdata.pricebid6,
        numberoftrialsleft: Math.max(-1,nbtrialsleft)
      }
        console.log("price bid:")
        console.log(newdata.pricebid1)

    }
      // for (var i=1;i<datacommunity[0].consumption.length; i++){
      //   datacommunity[0].consumption[i] -= data[index].consumption[i]
      //   datacommunity[0].production[i] -= data[index].production[i]
      // }
// //console.log(newdata.pricebid1)
// //console.log(data[index].pricebid1)


      //reinitialize datacommunity data to 0
      for (var i=0;i<datacommunity[0].consumption.length; i++){
        datacommunity[0].consumption[i] = 0
        datacommunity[0].production[i] = 0 
      }
      //console.log("datalengh:")
//console.log(data.length)
      for (var i=0;i<data.length;i++){
        for (var j = 0;j<datacommunity[0].consumption.length; j++){
          datacommunity[0].consumption[j] += data[i].consumption[j]
          datacommunity[0].production[j] += data[i].production[j]           
        }
      }
    }
    if(findPart3<0) // if we are not using part 3, as in part 3, asking for optim does not send the pricing nor consumption data... 
    {
    saveDataUsers()
    saveDataCommunity()
    }
    ////console.log(data)
// data[index] = {
//   id: 19,
//   value: [5,6,7],
// }
// //console.log(index)
// //console.log(data)
// saveData()

//     data.forEach(item => {
//       if(item.id == 19) {
//         //console.log(item.value);
//       }
//     })

   
//     var dataInfo = data.map( function(donnee) {
//      // //console.log(newdata.id)

//         if( donnee.id === newdata.id){
//             var valeur = donnee.value
//             donnee.value = newdata.value
//             bool = 1

//         }
//         if (bool ===0){ 
         
//           data.push(newdata)

//         } 
        
//         saveData()
//        });
//       // var mydata = JSON.parse(data)
//       //  for (let i in mydata.id) {
//       //   x += mydata.id[i];
//       // }
//       //  //console.log(dataInfo);
//       //  //console.log(data)

//     var allid = data.map(x => x.id)
//     var allvalues = data.map(x => x.consumption)
//     // //console.log(allvalues.length)
//    // //console.log(allvalues)
// //   //  //console.log(allvalues[0].length)
//    var profilecommunity = allvalues[0]

//        for (let j = 1;j<allvalues.length; j++){
//                 for  (let i = 0; i < allvalues[0].length; i++) {
//                     var temp = allvalues[j]
//                     profilecommunity[i] += temp[i]
//                 }
//             }
//     //data.push(req.body)
//     // //console.log(profilecommunity)



//      var allvalues = data.map(x => x.production)
//    //  //console.log(allvalues.length)
//     // //console.log(allvalues)
//  //   //  //console.log(allvalues[0].length)
//     var profilecommunity = allvalues[0]
 
//         for (let j = 1;j<allvalues.length; j++){
//                  for  (let i = 0; i < allvalues[0].length; i++) {
//                      var temp = allvalues[j]
//                      profilecommunity[i] += temp[i]
//                  }
//              }
     //data.push(req.body)
    //  //console.log(profilecommunity)
    // //console.log(datacommunity[1])

    //console.log("here")

    let communityproduction_30min = []
    let communityconsumption_30min = []


    // if (findPart2>0){
    //   //console.log("we are in Part 2")

    //   // for (let i = 0;i<=6; i++) {
    //   //   communityproduction_30min.push( datacommunity[0].production.slice(i*30*8,(i+1)*30*8).reduce((a, b) => a + b, 0)/60)
    //   //   communityconsumption_30min.push( datacommunity[0].consumption.slice(i*30*8,(i+1)*30*8).reduce((a, b) => a + b, 0)/60)
    //   // }
    //   // datacommunity[1].production = communityproduction_30min
    //   // datacommunity[1].consumption = communityconsumption_30min      
    // }
    // if (findPart1>0){
    //   //console.log("we are in Part 1")
    // }

    for (let i = 0;i<=48; i++) {
      communityproduction_30min.push( datacommunity[0].production.slice(i*30,(i+1)*30).reduce((a, b) => a + b, 0)/60)
      communityconsumption_30min.push( datacommunity[0].consumption.slice(i*30,(i+1)*30).reduce((a, b) => a + b, 0)/60)
    }
    datacommunity[1].production = communityproduction_30min
    datacommunity[1].consumption = communityconsumption_30min
    
    var reply = [] 
    // reply.consumption = datacommunity[1].consumption
    // reply.production = datacommunity[1].production
    if (findPart3>0){
      Optimfeasible=1;
      Temperaturemin = [newdata.tempmin1, newdata.tempmin2, newdata.tempmin3, newdata.tempmin4, newdata.tempmin5, newdata.tempmin6, newdata.tempmin7, newdata.tempmin8, newdata.tempmin9, newdata.tempmin10, newdata.tempmin11, newdata.tempmin12 ]
      weight_env = newdata.w_env;
      weight_cost = newdata.w_cost;
      
  







    var result_optim;
    // const python = spawn('C:/Users/XXXXX/AppData/Local/Programs/Python/Python39/python.exe',['./python/optim.py',Temperaturemin, weight_env, weight_cost])
    const python = spawn('python.exe',['./python/optim.py',Temperaturemin, weight_env, weight_cost])
      python.stdout.on('data',function (data){
        result_optim=data.toString();
    });
    python.stderr.on('data',data=> {
      console.error(`stderr: ${data}`);
    });
    python.on('exit',(code)=>{
      console.log(`exit python: ${code}, ${result_optim}`);
      result_optim=result_optim.replace('[', '');
      result_optim=result_optim.replace(']', '');
      result_optim_values =  result_optim.split(',').map(Number);
      console.log(result_optim_values)

      TemperatureOptim= result_optim_values.slice(-12)
      TemperatureOptim[TemperatureOptim.length -1] = TemperatureOptim[TemperatureOptim.length -2]
      PowerOptim= result_optim_values.slice(0,12)
      console.log(PowerOptim)
      console.log(TemperatureOptim)
      for (i=0; i < TemperatureOptim.length; i++){

        // check if array value is false or NaN
        if (TemperatureOptim[i] === false || Number.isNaN(TemperatureOptim[i]) ) {
            Optimfeasible = 0;
        }
    
      }
      reply.temperatureoptimal = TemperatureOptim;
      reply.poweroptimal = PowerOptim;
      reply.isfeasible = Optimfeasible;
  
      
  console.log(reply.numberofusers )
  // console.log("redisplay")
  console.log(JSON.stringify(reply))
  // console.log(nbtrialsleft)
  res.status(201).json(JSON.stringify(reply))

    })





  }
    // res.status(201).json(JSON.stringify(reply))

    //console.log("la")

    var quantitiesEnergy = []
    var dailyprices =[]
    var missingquantities = []
    // run Local energy market clearing
    // var x = numeric.solveLP([1,1],                   /* minimize [1,1]*x                */
    //   [[-1,0],[0,-1],[-1,-2]], /* matrix of inequalities          */
    //   [0,0,-3]                 /* right-hand-side of inequalities */
    //   );       
// //console.log(numeric.trunc(x.solution,1e-12));
reply = datacommunity[1]
if (findPart2>0){
  //console.log("we are in Part 2")


var Pd0 = []
var Pg0 = []
var Cd = []
var Cg = []


var Desiredimports = 0
// var text = []
// //console.log("hello")
// //console.log(text)
// //console.log(data[j].text)
// var a = data[j]
// //console.log(a[text])
// for (var key in data[j]) {
//  if (data[j].hasOwnProperty(key)) {
//    if(key == text){
//      //console.log(key + " -> " + data[j][key]);
//    }
//  }
// }




//console.log(Object.keys(data).length)

//console.log("beginning")
//console.log(data.length)

var pricebidtimeslot = []
var a = []
// to keep track of the index corresponding to the user who just sent his bid
var counterPg = 0
var counterPd = 0
var indxPg = -1
var indxPd = -1
var keeptrack = []
var price = -1
// for (var timeslot=1;timeslot<=6;timeslot++){
  for (var timeslot=0;timeslot<6;timeslot++){
    Desiredimports = 0
   Pd0 = []
   Pg0 = []
   Cd = []
   Cg = []
   price = 0
   //console.log(timeslot)
   counterPd = 0
   counterPg = 0
   indxPd = -1
   indxPg = -1
   keeptrack = []
   price = -1
  for (var j=0;j<data.length;j++){
    let production_30min = []
    let consumption_30min = []
    let temp = 0;
    production_30min = data[j].production.slice(timeslot*30*8,(timeslot+1)*30*8).reduce((a, b) => a + b, 0)/60;
    consumption_30min = data[j].consumption.slice(timeslot*30*8,(timeslot+1)*30*8).reduce((a, b) => a + b, 0)/60;
    temp = production_30min-consumption_30min;
    let time = timeslot+1
     pricebidtimeslot = "pricebid"+time.toString()

     a = data[j]
    if (temp > 0){
      Pg0.push(Math.max(0.001,temp))
      Cg.push(Math.abs(a[pricebidtimeslot]))
      if (j === index){
        indxPg = counterPg
        //console.log("generator")
        Desiredimports = -temp;

      }
      counterPg = counterPg +1

      keeptrack.push("Pg")
    }else{
      Pd0.push(Math.max(0.01,Math.abs(temp)))
      Cd.push(a[pricebidtimeslot])
      if(isNaN(a[pricebidtimeslot])){
console.log("is nan for user:")
console.log(j)
console.log("among user number:")
console.log(data.length)

      }
      if (j === index){
        indxPd = counterPd
        //console.log("consumer")
        Desiredimports = -temp;

      }
      counterPd = counterPd +1

      keeptrack.push("Pd")

    }
  }
  Pg0.push(9999999999)
  Cg.push(15.8)  
  console.log("Pg0: ")
  console.log(Pg0)
  console.log("Pd0: ")

  console.log(Pd0)
  // Pd0.push(0.1)
  // Cd.push(0.1)   
//console.log(Pg0)
//console.log(Pd0)
//console.log(Cg)
//console.log(Cd)
// we add the grid so the problem is solvable

var Pd = Pd0.map(i => i / 1000);
var Pg = Pg0.map(i => i / 1000);
// var Pg = Pg0;
// var Pd = Pd0;
var A1 = numeric.identity(Pg.length);
var A2 = numeric.identity(Pd.length);
// //console.log(A1)

let A3 = [];
for (var i=0;i<Pg.length;i++){
  let temp = [];
  for (var j=0;j<Pd.length;j++){
    temp.push(0);
  }
  A3.push(temp);
}



let A4= [];
for (var i=0;i<Pd.length;i++){
  let temp = [];
  for (var j=0;j<Pg.length;j++){
    temp.push(0);
  }
  A4.push(temp);
}
// //console.log(A4)

// A = [A1 zeros(size(Pg,2),size(Pd,2)); zeros(size(Pd,2),size(Pg,2)) A2];
var a1 = numeric.dim(A1)
var a3 = numeric.dim(A3)


var A = [];

for (var i=0;i<a1[0];i++){
  let temp = [];
  for (var j=0;j<a1[1];j++){
    temp.push(A1[i][j])
  }
  for (var j=0;j<a3[1];j++){
    temp.push(A3[i][j])
  } 
  A.push(temp);
}

var a2 = numeric.dim(A2)
var a4 = numeric.dim(A4)
for (var i=0;i<a4[0];i++){
  let temp = [];
  for (var j=0;j<a4[1];j++){
    temp.push(A4[i][j])
  }
  for (var j=0;j<a2[1];j++){
    temp.push(A2[i][j])
  } 
  A.push(temp);
}

var a = numeric.dim(A)


var Id = numeric.identity(a[0]);
for (var i=0;i<a[0];i++){
  A.push(Id[i]);
}

for (var i=0;i<a[0];i++){
  let temp = Id[i].map(i => -1*i);
  A.push(temp);
}


// //console.log("Dimenson de A: ")
// //console.log(numeric.dim(A))


let Aeq = []
for (var i=0;i<Pg.length;i++){
  Aeq.push(1);
}
for (var i=0;i<Pd.length;i++){
  Aeq.push(-1);
}
var beq = 0;
var b = [];
for (var i=0;i<Pg.length;i++){
  b.push(Pg[i]);
}
for (var i=0;i<Pd.length;i++){
  b.push(Pd[i]);
}
for (var i=0;i<a[0];i++){
  b.push(1000);
}

for (var i=0;i<a[0];i++){
  b.push(0);
}

var c = [];
for (var i=0;i<Cg.length;i++){
if(isNaN(Cg[i])){
  console.log("is nan Cg:" )
  console.log(Cg[i])
  console.log("for i:")
  console.log(i)
}
  c.push(Cg[i]);
}
for (var i=0;i<Cd.length;i++){
  c.push(-Cd[i]);
  if(isNaN(Cd[i])){
    console.log("is nan Cd:" )
    console.log(Cd[i])
    console.log("for i:")
    console.log(i)
  }
}
console.log("prices:")
console.log(c)
var sol = numeric.solveLP(c,                      /* minimize [1,2,3]*x                */
  A, /* matrix A of inequality constraint */
  b,                      /* RHS b of inequality constraint    */
  [Aeq],                    /* matrix Aeq of equality constraint */
 [beq]                           /* vector beq of equality constraint */
  );
// var x = numeric.solveLP(c,                      /* minimize [1,2,3]*x                */
//   A, /* matrix A of inequality constraint */
//   b               /* vector beq of equality constraint */
//   );


//console.log(keeptrack)
//console.log(sol)
var x = numeric.trunc(sol.solution,1e-7)
console.log(x)
console.log("voila ici")

  //console.log("Resultat de l'optimisation: "+ x)
  var xfinal = x.map(i => i * 1000);

   //console.log(xfinal)

// //console.log("taille de Pg: "+Pg.length)
//Let's determine the price: first identify the last generator who got awarded production. if he sold everything, the price is given by last demand awarded energy. otherwise, price = price of last generator
for (var i =0;i<Pg.length; i++){
  if (price <0){
  if (Math.abs(xfinal[i]-Pg0[i])>1 && xfinal[i]>0 ){ // price is the generator's price
    price = Cg[i]
    // //console.log(i)
    // //console.log(xfinal[i-1])
    // //console.log(Pg[i-1])
    // if (Math.abs(xfinal[i-1] - Pg0[i-1])<1) {// the last generator was awarded everything ==> the price is given by demand
    //console.log("here")

      }

    }
}
  if (price<0) { // if the price is not given by a generator
      //console.log("la")

      for (var j =0;j<Pd.length; j++){

        if (Math.abs(xfinal[Pg.length+j]-Pd0[j])>1 && xfinal[Pg.length+j]>0 ){ // price is the demand's price
          price = Cd[j]
          //console.log(j)
          //console.log(xfinal[Pg.length+j])

        }
      
      }
  }


//console.log("the price is: "+price)

if (indxPg >=0){
  //console.log("user got awarded production of " + xfinal[indxPg] )
  //console.log(indxPg)
  quantitiesEnergy.push(-1*xfinal[indxPg] )
  dailyprices.push(price)
  missingquantities.push(Desiredimports-xfinal[indxPg])
  //console.log(Desiredimports)
  //console.log(xfinal[Pg.length+indxPd])

}else{
  //console.log("user got awarded consumption of " + xfinal[Pg.length+indxPd])
  //console.log(Pg.length+indxPd)
  //console.log(indxPg)
  //console.log(indxPd)
  quantitiesEnergy.push( xfinal[Pg.length+indxPd] )
  dailyprices.push(price)

  //console.log(Desiredimports)
  //console.log(xfinal[Pg.length+indxPd])
  
  missingquantities.push(Desiredimports-xfinal[Pg.length+indxPd])

}



}



}

if (findPart3<0)
{
  console.log("price:")
  console.log(dailyprices)
  // console.log(Pd.length)
  // console.log(Pd.length)
  
reply.quantitiesenergy = quantitiesEnergy
reply.dailyprices = dailyprices
reply.missingquantities = missingquantities
reply.numberoftrialsleft  = nbtrialsleft
var numberUsers = Object.keys(data).length;
reply.numberofusers = numberUsers

console.log(reply.numberofusers )
// console.log("redisplay")
console.log(JSON.stringify(reply))
// console.log(nbtrialsleft)
res.status(201).json(JSON.stringify(reply))
}




//  Pd0 = [250, 300, 120 ,80, 40, 70, 60, 45, 30, 35, 25, 10]; // /500
//  Pg0 = [120, 50, 200, 400 ,60 ,50, 60, 100, 70 ,50, 70 ,45, 50, 60, 50]; // /500

// // var Pd0 = [50,25,10]; // /500
// // var Pg0 = [120, 50]; // /500

// var Pd = Pd0.map(i => i / 500);
// var Pg = Pg0.map(i => i / 500);
// // Pd = [1, 2, 3];
// // Pg = [1,2];

//  Cd = [200,110,100,90,85,75,65,40,38,31,24,16];
//  Cg = [0,0,15,30,32.5,34,36,37.5,39,40,60,70,100,150,200];
// var Cd = [200,24,8];
// var Cg = [21,30];

//  Cd = [[-1,0],[1,2],[3,4]]; //[5,6,7];
// Cg = [8,9];
// //console.log(Pg.length)
// var A1 = numeric.identity(Pg.length);
// var A2 = numeric.identity(Pd.length);
// // //console.log(A1)

// let A3 = [];
// for (var i=0;i<Pg.length;i++){
//   let temp = [];
//   for (var j=0;j<Pd.length;j++){
//     temp.push(0);
//   }
//   A3.push(temp);
// }



// let A4= [];
// for (var i=0;i<Pd.length;i++){
//   let temp = [];
//   for (var j=0;j<Pg.length;j++){
//     temp.push(0);
//   }
//   A4.push(temp);
// }
// // //console.log(A4)

// // A = [A1 zeros(size(Pg,2),size(Pd,2)); zeros(size(Pd,2),size(Pg,2)) A2];
// var a1 = numeric.dim(A1)
// var a3 = numeric.dim(A3)


// var A = [];

// for (var i=0;i<a1[0];i++){
//   let temp = [];
//   for (var j=0;j<a1[1];j++){
//     temp.push(A1[i][j])
//   }
//   for (var j=0;j<a3[1];j++){
//     temp.push(A3[i][j])
//   } 
//   A.push(temp);
// }

// var a2 = numeric.dim(A2)
// var a4 = numeric.dim(A4)
// for (var i=0;i<a4[0];i++){
//   let temp = [];
//   for (var j=0;j<a4[1];j++){
//     temp.push(A4[i][j])
//   }
//   for (var j=0;j<a2[1];j++){
//     temp.push(A2[i][j])
//   } 
//   A.push(temp);
// }

// var a = numeric.dim(A)


// var Id = numeric.identity(a[0]);
// for (var i=0;i<a[0];i++){
//   A.push(Id[i]);
// }

// for (var i=0;i<a[0];i++){
//   let temp = Id[i].map(i => -1*i);
//   A.push(temp);
// }


// //console.log("Dimenson de A: ")
// //console.log(numeric.dim(A))


// let Aeq = []
// for (var i=0;i<Pg.length;i++){
//   Aeq.push(1);
// }
// for (var i=0;i<Pd.length;i++){
//   Aeq.push(-1);
// }
// var beq = 0;
// var b = [];
// for (var i=0;i<Pg.length;i++){
//   b.push(Pg[i]);
// }
// for (var i=0;i<Pd.length;i++){
//   b.push(Pd[i]);
// }
// for (var i=0;i<a[0];i++){
//   b.push(1000);
// }

// for (var i=0;i<a[0];i++){
//   b.push(0);
// }

// var c = [];
// for (var i=0;i<Cg.length;i++){
//   c.push(Cg[i]);
// }
// for (var i=0;i<Cd.length;i++){
//   c.push(-Cd[i]);
// }

// var sol = numeric.solveLP(c,                      /* minimize [1,2,3]*x                */
//   A, /* matrix A of inequality constraint */
//   b,                      /* RHS b of inequality constraint    */
//   [Aeq],                    /* matrix Aeq of equality constraint */
//  [beq]                           /* vector beq of equality constraint */
//   );
// // var x = numeric.solveLP(c,                      /* minimize [1,2,3]*x                */
// //   A, /* matrix A of inequality constraint */
// //   b               /* vector beq of equality constraint */
// //   );



// var x = numeric.trunc(sol.solution,1e-7)
//   //console.log("Resultat de l'optimisation: ")

//    //console.log(x)
// A = [A1 zeros(size(Pg,2),size(Pd,2)); zeros(size(Pd,2),size(Pg,2)) A2];
// Aeq = [ones(1,size(Pg,2)) -ones(1,size(Pd,2))];
// beq = 0;
// b = [Pg'; Pd'];
// c = [Cg'; -Cd'];
// lb = - ones(1,size(Pg,2)+size(Pd,2));
// ub = 1000*ones(1,size(Pg,2)+size(Pd,2)); % a reprendre
// % x = linprog(c, A, b, Aeq, beq, lb', ub')

// [x fval flag report lambda] = linprog(c, A, b, Aeq, beq, lb', ub')



  }
}
