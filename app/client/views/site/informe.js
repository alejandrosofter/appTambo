function consultarServer(nombreVariable){
  Meteor.call(nombreVariable,function(err,res){
    
    res=ripArr(res);
    Session.set(nombreVariable,res);
  })
}
function ripArr(arr)
{
  for(var i=0;i<arr.length;i++) {
    arr[i].otros=arr[i]._id;
    arr[i]._id=String(i);
  }
  return arr;
}
Template.informe.rendered=function(){
   Meteor.subscribe('especies.all');
  consultarServer("consultarTotales");
}
Template.informe.helpers({

  'consultarTotales': function(){
        return {
 collection: Session.get("consultarTotales"),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 showNavigation:"never",
 showNavigationRowsPerPage:false,
 showRowCount:false,
 fields: [

 {
        key: 'cantidad',
       label:"Cantidad",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value)  return  new Spacebars.SafeString("<span class=''>"+value+" ANIMALES "+object.otros.estado+"</span>");
           return "-"
         },
      },
       {
        key: 'cantidad',
       label:"Promedio Edad",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          var valor=Math.round(object.totalEdad/object.cantidad);
          if(valor)  return  new Spacebars.SafeString("<span class=''>"+valor+" MESES </span>");
           return "-"
         },
      },
       
      
      
  
 ]
 };
    }

})
Template.chartAnimales.rendered=function(){
  google.charts.load('current', {'packages':['annotationchart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'VACAS');
        data.addColumn('string', 'TOROS');
        data.addColumn('string', 'VACAS PRENIADAS');
        data.addColumn('number', 'TERNEROS');
        data.addColumn('string', 'TERNERAS');
        data.addColumn('string', 'VAQUILLONAS');
        data.addRows([
          [new Date(2314, 2, 15), 12400, undefined, undefined,
                                  10645, undefined, undefined],
          [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter',
                                  12374, undefined, undefined],
          [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall',
                                  15766, 'Gallantors', 'First Encounter'],
          [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!',
                                  34334, 'Gallantors', 'Statement of shared principles'],
          [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties',
                                  66467, 'Gallantors', 'Mysteries revealed'],
          [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost',
                                  79463, 'Gallantors', 'Omniscience achieved']
        ]);

        var chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));

        var options = {
          displayAnnotations: true
        };

        chart.draw(data, options);
      } 
}
// function consultaPesoEventos()
// {
//   Meteor.call("consultaPesoEventos",function(err,res){
//     Session.set("consultaPesoEventos",res);
//     google.charts.load('current', {'packages':['annotationchart']});
//     google.charts.setOnLoadCallback(drawChart);
//   })
// }
// function drawChart() {
//         var data = new google.visualization.DataTable();
//         data.addColumn('date', 'Date');
//         var arrEspecies=Especies.find({}).fetch();
//         console.log(arrEspecies)
//         for(var i=0;i<arrEspecies.length;i++)
//         data.addColumn('number', arrEspecies[i].nombreEspecie);

//         // data.addColumn('string', 'MEDICACION');
//         data.addRows([
         
//         ]);

//         var chart = new google.visualization.AnnotationChart(document.getElementById('chart1'));

//         var options = {
//           displayAnnotations: true,
//            curveType: 'function',
//         };

//         chart.draw(data, options);
//       }
