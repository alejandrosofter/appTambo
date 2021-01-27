Template.animales.rendered=function(){
   Meteor.subscribe('especies.all')
    Meteor.subscribe('rodeos.all')
 Meteor.subscribe('animales.all')
  Meteor.subscribe('potreros.all');
  this.filter = new ReactiveTable.Filter('filtroEspecies', ['idEspecie']);
  this.filterEstado = new ReactiveTable.Filter('filtroEstados', ['estado']);
  this.filterCarabana = new ReactiveTable.Filter('filtroCarabana', ['carabana']);
   this.filterNombreAnimal = new ReactiveTable.Filter('filtroNombre', ['nombre']);
  consultarAnimales();
  $("#especies").select2();

}
function consultarAnimales()
{
  Meteor.call("animales.find",function(err,res){
    console.log(res)
    Session.set("animales.find",res);
  })
}
Template.animales.events({
   "change #especies": function (event, template) {
      var input = $(event.target).val();
      
        if(input!="")template.filter.set({"$eq":input});
        else template.filter.set();
      
   },
   "keyup #carabana": function (event, template) {
      var input = $(event.target).val();
        if(input!="")template.filterCarabana.set({'$regex': input, $options: 'i'});
        else template.filterCarabana.set();
      
   },
   "keyup #nombreAnimal": function (event, template) {
      var input = $(event.target).val();
        if(input!="")template.filterNombreAnimal.set({'$regex': input, $options: 'i'});
        else template.filterNombreAnimal.set();
      
   },
   "click .estadosFiltro": function (event, template) {
      var input = $("input:radio[name ='estados']:checked").val();
     
        if(input!="")template.filterEstado.set({"$eq":input});
        else template.filterEstado.set();
      
   },
"click #btnAgregar":function(){
  var data=this;
  Modal.show("nuevoAnimal",function(){
      return data;
    });
},

'click .update': function(ev) {
    var data=this;
    console.log(data)
    Modal.show("modificarAnimal",function(){
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
       Animales.remove({_id:ob._id});
       consultarAnimales()
    });

  },
})
Template.eventosAnimal.events({

'mouseover tr': function(ev) {
    $("#tablaEventos").find(".acciones").hide();
    $(ev.currentTarget).find(".acciones").show();
    
  },
   'click .delete': function(ev) {
    var ob=this;
    swal({   title: "Estas Seguro de quitar?",   text: "Una vez que lo has quitado sera permanente!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Si, borralo!",   closeOnConfirm: false },
    function(){
     Meteor.call("eventos.quitar",ob._id,Session.get("idAnimalSeleccion"),function(err,res){
      swal("Bien!","Se ha quitado el evento");
      consultarAnimales();
     })
    
    
    });

  },
})

Template.accionesAnimales.helpers({
"tieneEventos":function(){
  if(this.eventos)return this.eventos.length>0;
  return false
},
"cantidadEventos":function(){
  if(this.eventos)return this.eventos.length;
  return 0
}
})
Template.nuevoEvento.helpers({
  "idEvento":function(){
    return Meteor.uuid();
  }
})
Template.accionesAnimales.events({
"click .eventos":function(){
  var data=this;
   Session.set("idAnimalSeleccion",data._id);
  Modal.show("eventosAnimal",function(){
    return data
  })
},
"click .nuevoEvento":function(){
   var data=this;
   Session.set("idAnimalSeleccion",data._id);
  Modal.show("nuevoEvento",function(){
    return data
  })
}
})
Template.filtroEspecies.helpers({
  "especies":function(){
    return Especies.find().fetch()
  } 
})
Template.filtroEspecies.events({

});

Template.animales.helpers({

 
  'settings': function(){
        return {
 collection: Session.get("animales.find"),
 rowsPerPage: 10,
 class: "table table-hover table-condensed",
 showFilter: false,
 filters: ['filtroEspecies',"filtroEstados","filtroCarabana","filtroNombre"], 
 fields: [
 {
        key: 'carabana',
       label:"Carabana",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value)  return  new Spacebars.SafeString("<span class='carabana'>"+value+"</span>");
           return "-"
         },
      },
      {
        key: 'cuig',
       label:"Cuig",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
         if(value) return  new Spacebars.SafeString("<span style=''>"+value+"</span>");
         return "-"
         },
      },

     {
        key: 'nombre',
       label:"Nombre",
        fn: function (value, object, key) {
         if(value) {
         
          var iconoReproductor=object.esReproductor?"   <span style='color:green; font-size: 20px' class='fas fa-mars' title='ES REPRODUCTOR'></span> ":"";
          var iconoInseminada=object.inseminada?"   <span style='color:#c400ff; font-size: 20px' class='fas fa-syringe' title='INSEMINA'></span> ":"";
          var iconoPrenada=object.prenada?"   <span style='color:orange; font-size: 20px' class='fas fa-baby-carriage' title='PRENADA'></span> ":"";
          var iconoCelo=object.tieneCelo?"   <span style='color:#ff00c8; font-size: 20px' class='fab fa-hotjar' title='EN CELO'></span> "+'<span title="DIAS FINALIZA CELO" class="label label-danger">'+object.diasFinalizaCelo+'</span> ':"";
          var nombres=value+iconoReproductor+iconoPrenada+iconoInseminada+iconoCelo;
          return  new Spacebars.SafeString("<span class='nombreAnimal'>"+nombres+"</span>");
         }
           return "-"
         
         
      }
    },
      {
        key: 'especie',
        label: 'Grupo',
        fn:function(valor,ob){
          if(valor)return valor.nombreEspecie;
          return "-"
        }
      },
      {
        key: 'esMacho',
        label: 'Genero',
        headerClass: 'col-md-1',
        fn:function(valor,ob){
          var value=valor?'MACHO':"HEMBRA";
           if(value)  return  new Spacebars.SafeString("<span class='genero'>"+value+"</span>");
           return "-"
         }
      },
      {
        key: 'edad',
        label: 'Edad Meses',
        headerClass: 'col-md-1',
        fn:function(valor,ob){
     
    return Math.round(valor);
         }
      },
      {
        key: 'estado',
       label:"Estado",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
         if(value){
          var color=value=="INACTIVO"?"red":"green";
          return  new Spacebars.SafeString("<span style='color:"+color+"'>"+value+"</span>");
         }  


           return "-"
         },
      },
       
      
       
      {
          label: '',
          headerClass: 'col-md-2',
          tmpl: Template.accionesAnimales
        }
      
  
 ]
 };
    }

})

Template.eventosAnimal.helpers({

 
  'settings': function(){
        return {
 collection: this.eventos,
 rowsPerPage: 100,
 class: "table table-hover table-condensed",
 showFilter: false,
 fields: [
 {
        key: 'fecha', 
       label:"Fecha",
       headerClass: 'col-md-1',
        fn: function (value, object, key) {
          if(value)  return  new Spacebars.SafeString("<span class='fecha'>"+value.getFecha()+"</span>");
           return "-"
         },
      },
       {
        key: 'tipoEvento', 
       label:"Tipo Evento",
       headerClass: 'col-md-2',
        fn: function (value, object, key) {
          if(value)  return  new Spacebars.SafeString("<span class=''>"+value+"</span>");
           return "-"
         },
      },
    
    
      {
        key: 'detalle',
        label: 'Detalle',
        fn:function(valor,ob){
           if(valor)  return  new Spacebars.SafeString("<span class='detalle'>"+valor+"</span>");
           return "-"
        }
      },
      {
        key: 'valor',
        label: 'Valor',
        fn:function(valor,ob){
           if(valor) {
            var valor=ob.tipoEvento=="PESAJE"?(valor+" <b>KG</b>"):valor;
             return  new Spacebars.SafeString("<span class='valor'>"+valor+"</span>");
           }
           return "-"
        }
      },
      
       
      {
          label: '',
         // headerClass: 'col-md-1',
          tmpl: Template.accionesEventos
        }
      
  
 ]
 };
    }

})