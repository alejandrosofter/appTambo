Template.rodeos.rendered=function(){
   Meteor.subscribe('rodeos.all')
   Meteor.subscribe('especies.all');
   Meteor.subscribe('potreros.all');
   consultarRodeos();
    $('#color').colorpicker();
}
function consultarRodeos(){
  Meteor.call("rodeos.all",function(err,res){
    console.log(res)
    Session.set("rodeos",res);
  })
}
Template.modificarRodeo.rendered=function(){
    $('#color').colorpicker();
}
Template.nuevoRodeo.rendered=function(){
    $('#color').colorpicker();
}
Template.accionesRodeos.helpers({
  "cantidadAnimales":function(){
    
    return this.animales.length;
  }
})
Template.rodeosAnimales.rendered=function(){
     Meteor.subscribe('animales.all');
  
     Session.set("coleccionAux","Rodeos");
     Session.set("idAux",this.data._id);
     Session.set("animalesAux",this.data.animales)
}
Template.rodeosAnimales.helpers({

  "nombreRodeo":function(){
   return this.nombreRodeo
    return 0;
  },
  'settings': function(){
        return {
 collection: Session.get("animalesAux"),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'fechaNacimiento',
       label:"Nacimiento",
       headerClass: 'col-md-2',
        fn: function (value, object, key) {
         if(value)  return  new Spacebars.SafeString("<span class=''>"+value.getFecha()+"</span>");
           return "-"
         },
      },
 {
        key: 'nombre',
       label:"Nombre Animal",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          return  new Spacebars.SafeString("<span class=''><b>"+value+"</b></span>");
           
         },
      },
       {
        key: 'carabana',
       label:"Carabana",
       headerClass: 'col-md-1',
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value)return  new Spacebars.SafeString("<span class=''><b>"+value+"</b></span>");
           return '-'
         },
      },
      {
        key: 'cuig',
       label:"Cuig",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value) return  new Spacebars.SafeString("<span class=''><b>"+value+"</b></span>");
          return "-"
           
         },
      },
       {
        key: 'edad',
       label:"Edad Meses",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          return  new Spacebars.SafeString("<span class=''><b>"+Math.round(value)+"</b></span>");
           
         },
      },
       {
        key: 'genero',
       label:"Genero",
       // headerClass: 'col-md-1',
        fn: function (value, object, key) {
          return  new Spacebars.SafeString("<span class=''><b>"+value+"</b></span>");
           
         },
      },
     
  
      
       
      {
          label: '',
         headerClass: 'col-md-1',
          tmpl: Template.accionesRodeosAnimales
        }
      
  
 ]
 };
    }

})
Template.rodeos.events({
  "click #animales":function(){
  var data=this;
  Modal.show("rodeosAnimales",function(){
      return data;
    });
},
"click #btnAgregar":function(){
  var data=this;
  Modal.show("nuevoRodeo",function(){
      return data;
    });
},

'click .update': function(ev) {
    var data=this;
    console.log(data)
    Modal.show("modificarRodeo",function(){
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
     
       Rodeos.remove({_id:ob._id})
    });

  },
})
Template.rodeos.helpers({

 
  'settings': function(){
        return {
 collection: Session.get("rodeos"),
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'nombreRodeo',
       label:"Nombre",
        fn: function (value, object, key) {
         if(value)  return value
           return "-"
         },
      },
     // {
     //    key: 'idEspecie',
     //    label: 'Especie',
     //    fn:function(valor,ob){
     //      var value=Especies.findOne({_id:valor});
     //       if(value)  return  new Spacebars.SafeString("<span class='especie'>"+value.nombreEspecie+"</span>");
     //       return "-"
     //    }
     //  },
      {
        key: 'soloMachos',
        label: 'Generos',
        fn:function(valor,ob){
          var salida=valor?"MACHOS":"";
          salida+=ob.soloHembras?" | HEMBRAS":"";
          return new Spacebars.SafeString(salida)
        }
      },
      {
        key: 'desdeMeses',
        label: 'Rango Edad',
        fn:function(valor,ob){
          var salida="Desde los <b>"+valor+"</b> a <b>"+ob.hastaMeses+"</b> meses";
           return  new Spacebars.SafeString("<span class='especie'>"+salida+"</span>");
          
        }
      },
      
      {
        key: 'color',
        label: 'Color',
        fn:function(valor,ob){
          var color="";
          return new Spacebars.SafeString("<span  class='"+color+"' style=''>"+valor+"</span>")
        }
      },
       
      
      {
          label: '',
         // headerClass: 'col-md-1',
          tmpl: Template.accionesRodeos
        }
      
  
 ]
 };
    }

})