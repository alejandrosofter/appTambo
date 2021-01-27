var addHooks = {

  onSuccess: function(formType, result) {
    swal("Bien!","Se ha agregado el registro!","success");
    Modal.hide()
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },

};
var addHooks3 = {

  onSuccess: function(formType, result) {
    swal("Bien!","Se ha agregado el registro!","success");
    console.log(this)
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },

};
var addHooks4 = {

  onSuccess: function(formType, result) {
    var data=EventosMasivos.findOne({_id:Session.get("eventoAux")._id});
    console.log(data)
      Session.set("animalesAux",data.animales)
    swal("Bien!","Se ha agregado el registro!","success");
 
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },

};
var addHooksAnimal = {

  onSuccess: function(formType, result) {
    swal("Bien!","Se ha agregado el registro!","success");
    consultarAnimales();
    Modal.hide()
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar "+error,"error");
  },

};

var addHooks2 = {
formToDoc: function(doc) {
  Meteor.call("quitarDeAnimales",doc,Session.get("coleccionAux"),Session.get("idAux"),function(err,res){
     
    })
  return doc
},
  onSuccess: function(formType, result) {
    Meteor.call("consultarDeAnimales",Session.get("coleccionAux"),Session.get("idAux"),function(err,res){
     Session.set("animalesAux",res)
    })
    swal("Bien!","Se ha agregado el registro!","success");

  },
  onError: function(formType, error) {

    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },

};
var addHooks3 = {
formToDoc: function(doc) {
  Meteor.call("quitarDeRodeos",doc,Session.get("coleccionAux"),Session.get("idAux"),function(err,res){
     
    })
  return doc
},
  onSuccess: function(formType, result) {
    Meteor.call("consultarDeRodeos",Session.get("coleccionAux"),Session.get("idAux"),function(err,res){
     Session.set("rodeosAux",res)
    })
    swal("Bien!","Se ha agregado el registro!","success");

  },
  onError: function(formType, error) {

    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },

};
var addEventoHooks = {
formToDoc: function(doc) {
  Session.set("auxAnimal",doc);
  return doc
},
  onSuccess: function(formType, result) {
    Meteor.call("actualizarAnimal",Session.get("auxAnimal"),Session.get("idAnimalSeleccion"),function(err,res){
      Modal.hide();
      consultarAnimales();
     swal("Bien!","Se ha agregado el evento!","success");

    })
    

  },
  onError: function(formType, error) {
console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },

};

var updateHooks = {
  onSuccess: function(formType, result) {
    swal("Bien!","Se ha modificado el registro!","success");
    Modal.hide()
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },
 
};
var updateHooksAnimal = {
  onSuccess: function(formType, result) {
    consultarAnimales();
    swal("Bien!","Se ha modificado el registro!","success");
    Modal.hide()
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },
 
};
var agrego=false;

var updateHooks = {
  onSuccess: function(formType, result) {
    swal("Bien!","Se ha modificado el registro!","success");
    Modal.hide()
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },
 
};

var addHooksNueva = {

  onSuccess: function(formType, result) {
    Session.set("dataUltimaCarga",this.insertDoc);
    setLiquidacion();
    Modal.hide()
    setTimeout(function(){ 
      
    Modal.show("nuevaLiquidacion_factura",function(){
      return Session.get("liquidacion");
    });
     }, 1000);
    
    //swal("Bien!","Se ha agregado el registro!","success");
    
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },

};
var updateHooksFact = {
  before:{
    update:function(doc){
      console.log(doc)
      return doc
    }
},
  onSuccess: function(formType, result) {
    swal("Bien!","Se ha modificado el registro!","success");
    setLiquidacion();
    Modal.hide()
  },
  onError: function(formType, error) {
    console.log(error)
    swal("Ops!","Hay errores en el formulario, por favor verifique y vuelva a intentar","error");
  },
 
};

AutoForm.addHooks(['nuevoAnimal_',"nuevoAnimal_"], addHooksAnimal);
AutoForm.addHooks(['updateAnimal_','updateAnimal_'], updateHooksAnimal);

AutoForm.addHooks(['nuevoRodeo_',"nuevoRodeo_"], addHooks);
AutoForm.addHooks(['updateRodeo_','updateRodeo_'], updateHooks);

AutoForm.addHooks(['nuevaEspecie_',"nuevaEspecie_"], addHooks);
AutoForm.addHooks(['updateEspecie_','updateEspecie_'], updateHooks);

AutoForm.addHooks(['nuevoPotrero_',"nuevoPotrero_"], addHooks);
AutoForm.addHooks(['modificarPotrero_','modificarPotrero_'], updateHooks);


AutoForm.addHooks(['nuevoEventoMasivo_',"nuevoEventoMasivo_"], addEventoHooks);
AutoForm.addHooks(['modificarEventoMasivo_','modificarEventoMasivo_'], updateHooks);

AutoForm.addHooks(['nuevoAnimalEvento_',"nuevoAnimalEvento_"], addHooks4);
AutoForm.addHooks(['nuevoEvento_',"nuevoEvento_"], addEventoHooks);

AutoForm.addHooks(['nuevoAnimalPotrero_',"nuevoAnimalPotrero_"], addHooks2);
AutoForm.addHooks(['nuevoAnimalRodeo_',"nuevoAnimalRodeo_"], addHooks2);
AutoForm.addHooks(['nuevoRodeoPotrero_',"nuevoRodeoPotrero_"], addHooks3);


function consultarAnimales()
{
  Meteor.call("animales.find",function(err,res){
    Session.set("animales.find",res);
  })
}