Template.eventosMasivos.rendered=function(){
   Meteor.subscribe('especies.all');
    Meteor.subscribe('animales.all');
 Meteor.subscribe('eventosMasivos.all');
}
Template.accionesEventosMasivos.helpers({
  "cantidadAnimales":function(){
  return this.animales.length;
},
 
})
Template.eventosMasivos.helpers({

  'settings': function(){
        return {
 collection: EventosMasivos.find(),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false, 
 fields: [
 {
        key: 'fecha',
       label:"Fecha",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
         if(value) return  new Spacebars.SafeString("<span style=''>"+value.getFecha()+"</span>");
         return "-"
         },
      },
 {
        key: 'tipoEvento',
       label:"Tipo Evento",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value)  return  new Spacebars.SafeString("<span class=''>"+value+"</span>");
           return "-"
         },
      },
      
     {
        key: 'detalle',
       label:"Detalle",
       headerClass: 'col-md-2',
        fn: function (value, object, key) {
         if(value) {
          return  new Spacebars.SafeString("<span class=''>"+value+"</span>");
         }
           return "-"
         
         
      }
    },
    {
        key: 'animales',
       label:"Animales",
        fn: function (value, object, key) {
         if(value) {
          var sal="";
          for(var i=0;i<value.length;i++){
            var animalAux=Animales.findOne({_id:value[i].idAnimal});
            sal+=animalAux?animalAux.nombre:'-';
            sal+=": <b>"+(value[i].valor?value[i].valor:"-")+"</b> | ";
          }
          return  new Spacebars.SafeString("<span class=''>"+sal+"</span>");
         }
           return "-"
         
         
      }
    },
    {
        key: 'estado',
       label:"Estado",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
         if(value){
          var color=value=="APLICADO"?"green":"red";
          return  new Spacebars.SafeString("<span style='color:"+color+"'>"+value+"</span>");
         }  


           return "-"
         },
      },
     
       
      {
          label: '',
          headerClass: 'col-md-2',
          tmpl: Template.accionesEventosMasivos
        }
      
  
 ]
 };
    }

})
Template.eventosMasivosAnimales.events({
'mouseover tr': function(ev) {
    $("#tablaAnimales").find(".acciones").hide();
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
     Meteor.call("quitarAnimalEvento",ob._id,Session.get("eventoAux")._id,function(err,res){
            var data=EventosMasivos.findOne({_id:Session.get("eventoAux")._id});
            Session.set("animalesAux",data.animales)
     })
    });

  },
})
Template.eventosMasivosAnimales.helpers({

 
  'settings': function(){
        return {
 collection: Session.get("animalesAux"),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [

 {
        key: 'id',
       label:"Animal",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          var animal=Animales.findOne({_id:object.idAnimal});
          if(animal)  return  new Spacebars.SafeString("<span class='nombrePotrero'>"+animal.nombre+" "+animal.carabana+"</span>");
           return "-"
         },
      },
       {
        key: 'valor',
       label:"Valor",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
         if(value)  return  new Spacebars.SafeString("<span class=''>"+value+"</span>");
           return "-"
         },
      },
     
    
      
       
      {
          label: '',
         headerClass: 'col-md-1',
          tmpl: Template.accionesAnimalesEventos
        }
      
  
 ]
 };
    }

})
Template.eventosMasivos.events({

"click .animalesEventos":function(){
  var data=this;
  Session.set("animalesAux",data.animales)
  Session.set("eventoAux",data)
  Modal.show("eventosMasivosAnimales",function(){
      return data;
    });
},

'click .update': function(ev) {
    var data=this;
    Modal.show("modificarEventoMasivo",function(){
      return data
    });
  },
  'click #btnAgregar': function(ev) {
    var data=this;
    Modal.show("nuevoEventoMasivo",function(){
      return data
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
     
       EventosMasivos.remove({_id:ob._id})
    });

  },
  'click .aplicar': function(ev) {
    var ob=this;

    swal({
      title: "Estas Seguro de aplicar?",
      text: "Esto ingresara a los animales el evento ingresado",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si  !",
      closeOnConfirm: true
    }, function() {
     Meteor.call("aplicarEventoMasivo",ob._id,function(err,res){
      swal("genial!","se ingresaron los eventos!")
     })
    });

  },
  'click .desaplicar': function(ev) {
    var ob=this;

    swal({
      title: "Estas Seguro de desaplicar?",
      text: "Esto quitara los eventos a los animales seleccionados",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si  !",
      closeOnConfirm: true
    }, function() {
      Meteor.call("desaplicarEventoMasivo",ob._id,function(err,res){
      swal("genial!","se quitaron los eventos!")
     })
    });

  },
})