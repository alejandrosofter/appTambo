Template.especies.rendered=function(){
  Meteor.subscribe('especies.all')
}
Template.especies.events({
"click #btnAgregar":function(){
  var data=this;
  Modal.show("nuevaEspecie",function(){
      return data;
    });
},
"click .update":function(){
  var data=this;
  Modal.show("modificarEspecie",function(){
      return data;
    });
},
'mouseover tr': function(ev) {
    $("#tabla").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },
   'click .delete': function(ev) {
    var ob=this;
    swal({
      title: "Estas Seguro de quitar?",
      text: "Una vez realizada no podrás cambiar la información!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si  !",
      closeOnConfirm: true
    }, function() {
     
       Especies.remove({_id:ob._id})
    });

  },
})

Template.especies.helpers({

 
  'settings': function(){
        return {
 collection: Especies.find(),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'nombreEspecie',
       label:"Especie",
        fn: function (value, object, key) {
         if(value)  return  new Spacebars.SafeString("<span class='nombreEspecie'>"+value+"</span>");
           return "-"
         },
      },
       {
        key: 'genero',
       label:"Genero",
        fn: function (value, object, key) {
         if(value)  return value
           return "-"
         },
      },
      {
        key: '_id',
       label:"Opciones",
        fn: function (value, object, key) {
         if(value) {
          var iconoReproductor=object.esReproductor?"   <span style='color:green; font-size: 20px' class='fas fa-mars' title='ES REPRODUCTOR'></span> ":"";
          var iconoInseminada=object.inseminada?"   <span style='color:#c400ff; font-size: 20px' class='fas fa-syringe' title='INSEMINA'></span> ":"";
          var iconoPrenada=object.preniada?"   <span style='color:orange; font-size: 20px' class='fas fa-baby-carriage' title='PRENADA'></span> ":"";
          var iconoCelo=object.enCelo?"   <span style='color:#ff00c8; font-size: 20px' class='fab fa-hotjar' title='EN CELO'></span> ":"";
          var nombres=iconoReproductor+iconoPrenada+iconoInseminada+iconoCelo;
          return  new Spacebars.SafeString("<span class=''>"+nombres+"</span>");
         }
           return "-"
         
         
      }
    },
       {
        key: 'genetica',
       label:"Genetica",
        fn: function (value, object, key) {
         if(value)  return value;
           return "-"
         },
      },
       {
        key: 'desdeMeses',
       label:"Rango Edad",
        fn: function (value, object, key) {
         var salida="Desde los <b>"+value+"</b> a <b>"+object.hastaMeses+"</b> meses";
           if(object.hastaMeses)return  new Spacebars.SafeString("<span class='especie'>"+salida+"</span>");
           return  new Spacebars.SafeString("<span style='color:red'>SIN RANGO <small></small></span>");
         },
      },
      {
          label: '',
          headerClass: 'col-md-1',
          tmpl: Template.accionesEspecies
        }
      
  
 ]
 };
    }

})