Template.potreros.rendered=function(){
   Meteor.subscribe('potreros.all');
   Meteor.subscribe('animales.all')
   Meteor.subscribe('rodeos.all')
}
Template.potrerosAnimales.rendered=function(){
     Meteor.subscribe('animales.all');
     Meteor.subscribe('especies.all'); 
     
     Meteor.subscribe('especies.all'); 
  
     Session.set("coleccionAux","Potreros");
     Session.set("idAux",this.data._id);
     Session.set("animalesAux",this.data.animales)
}
Template.rodeosAnimalesPotrero.rendered=function(){
     Meteor.subscribe('especies.all');
  
     Session.set("coleccionAux","Potreros");
     Session.set("idAux",this.data._id);
     Session.set("rodeosAux",this.data.rodeos)
}
Template.potreros.events({
"click #btnAgregar":function(){
  var data=this;
  Modal.show("nuevoPotrero",function(){
      return data;
    });
},
"click #animales":function(){
  var data=this;
  Modal.show("potrerosAnimales",function(){
      return data;
    });
},
"click #rodeos":function(){
  var data=this;
  Modal.show("rodeosAnimalesPotrero",function(){
      return data;
    });
},

'click .update': function(ev) {
    var data=this;
    Modal.show("modificarPotrero",function(){
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
     
       Potreros.remove({_id:ob._id})
    });

  },
})
Template.accionesPotreros.helpers({
  "cantidadAnimales":function(){
    if(this.animales)return this.animales.length;
    return 0;
  },
  "cantidadRodeos":function(){
    if(this.rodeos)return this.rodeos.length;
    return 0;
  }
})
Template.potreros.helpers({

 
  'settings': function(){
        return {
 collection: Potreros.find(),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'nombrePotrero',
       label:"Potrero",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value)  return  new Spacebars.SafeString("<span class='nombrePotrero'>"+value+"</span>");
           return "-"
         },
      },
     {
        key: 'superficie',
       label:"Sup2.",
       headerClass: 'col-md-2',
        fn: function (value, object, key) {
         if(value)  return  new Spacebars.SafeString("<span class='superficie'>"+value+"</span>");
           return "-"
         },
      },
     
       
      {
          label: '',
         headerClass: 'col-md-2',
          tmpl: Template.accionesPotreros
        }
      
  
 ]
 };
    }

})

Template.rodeosAnimalesPotrero.helpers({

 
  'settings': function(){
        return {
 collection: Session.get("rodeosAux"),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'fecha',
       label:"Fecha",
       headerClass: 'col-md-2',
        fn: function (value, object, key) {
         if(value)  return  new Spacebars.SafeString("<span class=''>"+value.getFecha()+"</span>");
           return "-"
         },
      },
 {
        key: 'id',
       label:"Especie",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          var aux=Especies.findOne({_id:object.idEspecie});
          if(aux)  return  new Spacebars.SafeString("<span class=''>"+aux.nombreEspecie+"</span>");
           return "-"
         },
      },
      {
        key: 'animales',
       label:"Animales",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          var aux=Rodeos.findOne({_id:object.idRodeo});
          var sal="";
          for(var i=0;i<value.length;i++){
            var animal=Animales.findOne({_id:value[i].idAnimal})
          }
          if(aux)  return  new Spacebars.SafeString("<span class=''>"+aux.nombreRodeo+"</span>");
           return "-"
         },
      },
     
    
      
       
      {
          label: '',
         headerClass: 'col-md-1',
          tmpl: Template.accionesPotrerosAnimales
        }
      
  
 ]
 };
    }

})
Template.potrerosAnimales.events({
  'mouseover tr': function(ev) {
    $("#tablaRodeosAnimal").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();

    $("#tablaAnimales").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
    
  },
 
  "click #activaGrupo":function(){
    if( $('#activaGrupo').is(':checked') )
    $("#agregaEspecie").show();
     else  $("#agregaEspecie").hide() 
  }
})
Template.grupo.helpers({

 "nombreGrupo":function(){
  var grupo=Rodeos.findOne({_id:this.idRodeo});
  if(grupo)return grupo.nombreRodeo;
  return "-"
 },
})
Template.potrerosAnimales.helpers({

 "grupos":function(){
  return this.rodeos
 },
   'settingsRodeos': function(){
        return {
 collection: this.rodeos,
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'idRodeo',
       label:"Grupo",
       headerClass: 'col-md-2',
        fn: function (value, object, key) {
          var grupo=Rodeos.findOne({_id:value});
  if(grupo)return grupo.nombreRodeo;
  return "-"
         },
      },
 {
          label: '',
         headerClass: 'col-md-1',
          tmpl: Template.accionesGruposAnimales
        }

  ]
  }},
  'settings': function(){
        return {
 collection: Session.get("animalesAux"),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'fecha',
       label:"Fecha",
       headerClass: 'col-md-2',
        fn: function (value, object, key) {
         if(value)  return  new Spacebars.SafeString("<span class=''>"+value.getFecha()+"</span>");
           return "-"
         },
      },
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
        key: 'id',
        label: 'Genero',
        headerClass: 'col-md-1',
        fn:function(valor,object){
            var animal=Animales.findOne({_id:object.idAnimal});
            return animal.esMacho?"MACHO":"HEMBRA"
         }
      },
      {
        key: 'id',
        label: 'Edad Meses',
        headerClass: 'col-md-2',
        fn:function(valor,object){
            var animal=Animales.findOne({_id:object.idAnimal});
            var diff_ms = Date.now() - animal.fechaNacimento.getTime();
            var age_dt = new Date(diff_ms); 
        
            return Math.round(diff_ms/1000/60/60/24/30);
         }
      },
     
    
      
       
      {
          label: '',
         headerClass: 'col-md-1',
          tmpl: Template.accionesPotrerosAnimales
        }
      
  
 ]
 };
    }

})
