import { Meteor } from 'meteor/meteor'; 

function checkAnimales(arr,Coleccion,idColeccion,idAnimal)
{
  for(var i=0;i<arr.length;i++)
       if(arr[i].idAnimal==idAnimal)
        Coleccion.update(
        {_id: idColeccion }, 
        { $pull: { "animales": { "_id": arr[i]._id } } },
        { getAutoValues: false } // SIN ESTE PARAMETRO NO QUITA!!
        )
}
function checkRodeos(arr,Coleccion,idColeccion,idRodeo)
{
  for(var i=0;i<arr.length;i++)
       if(arr[i].idRodeo==idRodeo)
        Coleccion.update(
        {_id: idColeccion }, 
        { $pull: { "rodeos": { "_id": arr[i]._id } } },
        { getAutoValues: false } // SIN ESTE PARAMETRO NO QUITA!!
        )
}
function getAnimales(){
 
    //var match = { $match: {esMacho:{$eq:soloMachos},estado:"ACTIVO",edad:{$gte:desdeMeses,$lte:hastaMeses}} } ;
    var match = { $match: {}} ;
    var proyecto2={
      $project: {
            edad: {$floor:"$edad"},
            document: "$$ROOT"

        } 
      };
    var proyecto = {
      $project: {
        _id: 1,
        
        genero: { $cond:[{$eq:["$esMacho",true] },"MACHO", "HEMBRA" ] },
        esHembra: { $cond:[{$eq:["$esMacho",false] },true, false ] },
        esMacho: "$esMacho",
        edad:{ $divide: [{ $subtract: [new Date(), "$fechaNacimento"] }, (30 * 24 * 60 * 60 * 1000) ] },
        carbana: "$carbana" ,
        estado:"$estado",
        nombre:"$nombre",
        carabana:"$carabana",
        esReproductor:"$esReproductor",
        inseminada:"$inseminada",
        prenada:"$prenada",
        cuig:"$cuig",
        raza:"$raza",
        fechaCelo:"$fechaCelo",
        eventos:"$eventos",
        pesoNacimiento:"$pesoNacimiento",
        categoria:"$categoria",
        fechaNacimento:"$fechaNacimento",
        
        
      }
    };
    var pipeline = [ proyecto,match ];

    return Animales.aggregate(pipeline);
}
function getEspecie(dataAnimal)
{
  var arr=Especies.find().fetch();
  var idEspecie=null;
  for(var i=0;i<arr.length;i++){
    var celo=estaCelo(dataAnimal);
    if(celo.enCelo && arr[i].enCelo)return arr[i]
    if(dataAnimal.prenada && arr[i].preniada)return arr[i]
    if(dataAnimal.esReproductor && arr[i].esReproductor)return arr[i]
    if(dataAnimal.inseminada && arr[i].inseminada)return arr[i];
  console.log(dataAnimal.edad,arr[i].hastaMeses,arr[i].desdeMeses)
    if(dataAnimal.edad>=arr[i].desdeMeses && dataAnimal.edad<=arr[i].hastaMeses && dataAnimal.genero==arr[i].genero) idEspecie= arr[i]
  }
return idEspecie;
}
function quitarEventosAnimal(dataEventoAnimal){
  console.log(dataEventoAnimal)
return Animales.update(
        {_id: dataEventoAnimal.idAnimal }, 
        { $pull: { "eventos": { "_id": dataEventoAnimal._id } } },
        { getAutoValues: false } // SIN ESTE PARAMETRO NO QUITA!!
        )
}
function agregarEventosAnimal(dataEventoAnimal,eventoMasivo){
  var datosEvento={_id:dataEventoAnimal._id, idAnimal:dataEventoAnimal,detalle:eventoMasivo.detalle,fecha:eventoMasivo.fecha,tipoEvento:eventoMasivo.tipoEvento,detalle:eventoMasivo.detalle,valor:dataEventoAnimal.valor};
return Animales.update(
        {_id: dataEventoAnimal.idAnimal }, 
        { $push: { "eventos": datosEvento } },
        )
}
function estaCelo(animal)
{
if(!animal.esMacho && !animal.prenada){
  const ahora = new Date();
  const diffTime = Math.abs(ahora - animal.fechaCelo);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  var celos=Math.round(diffDays/20);
  var resto=diffDays%20;
  return {enCelo:celos%2,diasFinaliza:resto};

}
return {enCelo:false,diasFinaliza:0};

}
function consultaEventosAnimales()
{
  var match = { $match: {estado:"ACTIVO",tipoEvento:"PESO"}};
      var unw = { $unwind: "$eventos" };

    var proyecto = {
      $project: {
        _id: 1,
        
        genero: { $cond:[{$eq:["$esMacho",true] },"MACHO", "HEMBRA" ] },
        esMacho: "$esMacho",
        edad:{ $divide: [{ $subtract: [new Date(), "$fechaNacimento"] }, (30 * 24 * 60 * 60 * 1000) ] },
        carbana: "$carbana" ,
        estado:"$estado",
        nombre:"$nombre",
        esReproductor:"$esReproductor",
        inseminada:"$inseminada",
        prenada:"$prenada",
        fechaCelo:"$fechaCelo",
        cuig:"$cuig",
        raza:"$raza",
        eventos:"$eventos",
        pesoNacimiento:"$pesoNacimiento",
        categoria:"$categoria",
        fechaNacimento:"$fechaNacimento",
        fechaEvento:"$eventos.fecha",
        valorEvento:"$eventos.valor",
        tipoEvento:"$eventos.tipoEvento",
        
        
      }
    };
    var pipeline = [ proyecto,match,unw ];

    return Animales.aggregate(pipeline);
}
function getObjectoGraph(animal,arrEspecies)
{
  
  var aux=[];
  aux.push(animal.fechaEvento);
  for(var i=0;i<arrEspecies.length;i++)aux.push(arrEspecies)
}
Meteor.methods({
  "consultaPesoEventos":function()
  {
    // var arrEspecies=Especies.find().fetch();
    //  var arr=consultaEventosAnimales();
    //  var salida=[];
     
    //  for(var i=0;i<arr.length;i++)salida.push(getObjectoGraph(arr[i]),arrEspecies);
  },
  "consultarTotales":function()
  {
    //var match = { $match: {esMacho:{$eq:soloMachos},estado:"ACTIVO",edad:{$gte:desdeMeses,$lte:hastaMeses}} } ;
    
    var match = { $match: {}};
    var grupo={$group: {totalEdad:{$sum:"$edad"},cantidad:{$sum:1},_id:{estado:"$estado"}}};

    var proyecto = {
      $project: {
        _id: 1,
        
        genero: { $cond:[{$eq:["$esMacho",true] },"MACHO", "HEMBRA" ] },
        esHembra: { $cond:[{$eq:["$esMacho",false] },true, false ] },
        esMacho: "$esMacho",
        edad:{ $divide: [{ $subtract: [new Date(), "$fechaNacimento"] }, (30 * 24 * 60 * 60 * 1000) ] },
        carbana: "$carbana" ,
        estado:"$estado",
        nombre:"$nombre",
        carabana:"$carabana",
        esReproductor:"$esReproductor",
        inseminada:"$inseminada",
        prenada:"$prenada",
        fechaCelo:"$fechaCelo",
        cuig:"$cuig",
        raza:"$raza",
        eventos:"$eventos",
        pesoNacimiento:"$pesoNacimiento",
        categoria:"$categoria",
        fechaNacimento:"$fechaNacimento",
        
        
      }
    };
    var pipeline = [ proyecto,match,grupo ];

    return Animales.aggregate(pipeline);
  },
  "quitarAnimalEvento":function(id,idEventoMasivo)
  {
    return EventosMasivos.update(
        {_id: idEventoMasivo }, 
        { $pull: { "animales": { "_id": id } } },
        { getAutoValues: false } // SIN ESTE PARAMETRO NO QUITA!!
        )
  },
  "desaplicarEventoMasivo":function(id)
  {
   var eventoMasivo=EventosMasivos.findOne({_id:id});
    var arr=eventoMasivo.animales;
    for(var i=0;i<arr.length;i++)quitarEventosAnimal(arr[i],eventoMasivo);
      EventosMasivos.update({_id:id},{$set:{estado:"PARA APLICAR"}});
  },
"aplicarEventoMasivo":function(id)
  {
    var eventoMasivo=EventosMasivos.findOne({_id:id});
    var arr=eventoMasivo.animales;
    for(var i=0;i<arr.length;i++) agregarEventosAnimal(arr[i],eventoMasivo);
      EventosMasivos.update({_id:id},{$set:{estado:"APLICADO"}});
    
  },
  "eventos.quitar":function(idEvento,idAnimal)
  {
    return Animales.update(
        {_id: idAnimal }, 
        { $pull: { "eventos": { "_id": idEvento } } },
        { getAutoValues: false } // SIN ESTE PARAMETRO NO QUITA!!
        )
  },
  "animales.find":function(){
    var arr=getAnimales();
    for(var i=0;i<arr.length;i++){
      var celo=estaCelo(arr[i]);
      var especieAnimal=getEspecie(arr[i]);
      arr[i].especie=especieAnimal;
      arr[i].tieneCelo=celo.enCelo;
      arr[i].edad=Math.round(arr[i].edad);
      arr[i].diasFinalizaCelo=celo.diasFinaliza;
      arr[i].idEspecie=especieAnimal?especieAnimal._id:null;
    }
    return arr;
  },
  "rodeos.all":function(){
    var arr= Rodeos.find().fetch();
   return arr;
  },
  "actualizarAnimal":function(doc,idAnimal){
    if(doc.tipoEvento=="FALLECE")Animales.update({_id:idAnimal},{$set:{estado:"INACTIVO"}});
    if(doc.tipoEvento=="VENTA")Animales.update({_id:idAnimal},{$set:{estado:"INACTIVO"}});
  },
  "consultarDeAnimales":function(colString,id)
  {
    var Coleccion=eval(colString);
    return Coleccion.findOne({_id:id}).animales?Coleccion.findOne({_id:id}).animales:[]
  },
  "consultarDeRodeos":function(colString,id)
  {
    var Coleccion=eval(colString);
    return Coleccion.findOne({_id:id}).rodeos?Coleccion.findOne({_id:id}).rodeos:[]
  },
  "quitarDeAnimales":function(doc,tipo){
    var Coleccion=eval(tipo);
    var arr=Coleccion.find({}).fetch();
    for(var i=0;i<arr.length;i++)
      checkAnimales(arr[i].animales?arr[i].animales:[],Coleccion,arr[i]._id,doc.idAnimal)
     
  },
  "quitarDeRodeos":function(doc,tipo){
    var Coleccion=eval(tipo);
    var arr=Coleccion.find({}).fetch();
    for(var i=0;i<arr.length;i++)
      checkRodeos(arr[i].rodeos?arr[i].rodeos:[],Coleccion,arr[i]._id,doc.idRodeo)
     
  },
"pacientes.save"(data){
  var existe=Pacientes.findOne({nroAfiliado:data.nroAfiliado,idObraSocial:data.idObraSocial});
  if(existe)return Pacientes.update({_id:existe._id},{$set:{nombrePaciente:data.nombrePaciente,nroAfiliado:data.nroAfiliado,fechaUpdate:data.fechaUpdate,idUsuarioCambia:data.idUsuarioCambia}});
  return Pacientes.insert(data);
},
  'users.cargarInicial'(data) {
  	var hayUsuarios = Meteor.users.find().count()>0;
     if (!hayUsuarios) {
     	var perfil={nombres:"alejandro",rol:"administrador"};

        Accounts.createUser({ username:"admin", password:"admin", profile: perfil });
      }
  },
  "liquidaciones.guardar"(idLiquidacion,facturas){
    return Liquidaciones.update({_id:idLiquidacion},{$set:{estado:"CHECKEADO",facturas:facturas}});
      
  },
  "obrasSociales.all"()
  {
    return ObrasSociales.find().fetch()
  },
  "liquidaciones.buscar"(desde,hasta,usuario)
  {
    var userLogueado=Meteor.users.findOne({_id:Meteor.userId()});
    
    if(userLogueado){

    if(userLogueado.profile.rol==="secretaria")return Liquidaciones.find({idUsuario:userLogueado._id,fecha: {$gte : desde,$lte:hasta}}).fetch();
    console.log(usuario)
    var match={fecha: {$gte : desde,$lte:hasta}};
    if(usuario)match['idUsuario']=usuario._id;
    console.log(match)
    return Liquidaciones.find(match).fetch()
}
return [];
  
  },
  "liquidaciones.buscarMasivo"(fechaDesde,fechaHasta,idObraSocial){
console.log(fechaDesde,fechaHasta,idObraSocial);

    var liquidaciones=Liquidaciones.find({fecha:{$gte:fechaDesde,$lte:fechaHasta}}).fetch();
    var data=[];
    console.log(Liquidaciones.find().fetch())
    if(liquidaciones)
    for(var i=0;i<liquidaciones.length;i++){
      var idLiquidacion=liquidaciones[i]._id;
       var arr= getFacturasOs(liquidaciones[i].facturas,idObraSocial);
       var profesional=getUsuario(liquidaciones[i].idUsuario);
       data.push({estado:liquidaciones[i].estado, profesional:profesional,facturas:arr,idObraSocial:idObraSocial,idLiquidacion:idLiquidacion})
        
    }
    return data;
  },
  'nomencladores.all'() {
    return Nomencladores.find({})
  },
  "users.perfil"(id)
  {
    return Meteor.users.findOne({_id:id}).profile;
  },
  'users.list'(data) {
    return Meteor.users.find().fetch(); 
  },
  
  'users.one'(id) {
    return Meteor.users.find({_id:id}); 
  },
  'users.add'(usuario,clave,perfil) {
  	return Accounts.createUser({ username:usuario, password:clave, profile: perfil });
  },
  'users.update'(_id,usuario,perfil) {
  	return Meteor.users.update({_id:_id},{$set:{profile:perfil,username:usuario}});
  },
  'users.remove'(_id) {
  	return Meteor.users.remove({_id:_id});
  }, 
  'users.resetPassword'(_id,clave) {
  	return Accounts.setPassword(_id,clave);
  },
  'settings.generarVariables'(){
    if (!Settings.findOne({ clave: "hostInyeccion"  })) Settings.insert({ clave: "hostInyeccion", valor: "192.155.543.5" });
    if (!Settings.findOne({ clave: "usuarioInyeccion"  })) Settings.insert({ clave: "usuarioInyeccion", valor: "root" });
    if (!Settings.findOne({ clave: "claveInyeccion"  })) Settings.insert({ clave: "claveInyeccion", valor: "vertrigo" });
    if (!Settings.findOne({ clave: "dbInyeccion"  })) Settings.insert({ clave: "dbInyeccion", valor: "asociacion" });
    if (!Settings.findOne({ clave: "proxNroLiquidacion"  })) Settings.insert({ clave: "proxNroLiquidacion", valor: "1" });
  },
  'settings.remove'(id) {
    return Settings.remove({_id:id}); 
  },
  "settings.autoincrementaNroLiquidacion"(){
    console.log("fdd")
    var nuevoValor=Number(Settings.findOne({ clave: "proxNroLiquidacion"  }).valor)+1;
    Settings.update({clave:"proxNroLiquidacion"},{$set:{valor:nuevoValor}});
    console.log("cambio")
  },
  "remote.syncLiquidacion":function(idLiquidacion,idOs)
  {
     var Future = Npm.require('fibers/future');
    var fut1 = new Future();
    var exec = Npm.require("child_process").exec;
    var path = process.cwd() + '/../web.browser/app/shellPython/syncLiquidacion.py';
    
    var command="python "+path+" "+idLiquidacion+" "+idOs; 
  
      exec(command,function(error,stdout,stderr){ 
        console.log(stdout)
        fut1.return(stderr);
      });
      return fut1.wait();
    
    return fut1.wait();
  },
  "remote.syncOs":function()
  {
    Future = Npm.require('fibers/future');
    var fut1 = new Future();
    var exec = Npm.require("child_process").exec;

    var path = process.cwd() + '/../web.browser/app/shellPython/importarOs.py';
    
    var command="python "+path; 
      exec(command,function(error,stdout,stderr){
        if(error){
          console.log(error);
          throw new Meteor.Error(500,command+" failed");
        }
        console.log(stdout)
        fut1.return(stdout.toString());
      });
      return fut1.wait();
    
    return fut1.wait();
  },
  'liquidaciones.one'(id) {
    
    return Liquidaciones.findOne({_id:id});
  },
  'liquidaciones.remove'(id) {
    
    return Liquidaciones.remove({_id:id});
  },
  "liquidaciones.updateFactura"(data,res){
    console.log(data);
    console.log(res);
    return true
  },
  'liquidaciones_factura.remove'(idLiquidacion,id) {
    return Liquidaciones.update(
        {_id: idLiquidacion }, 
        { $pull: { "facturas": { "_id": id } } },
        { getAutoValues: false } // SIN ESTE PARAMETRO NO QUITA!!
        )
  },

});
if(Meteor.isServer){


Meteor.publish('animales.all', function () {
  return Animales.find();
});
Meteor.publish('eventosMasivos.all', function () {
  return EventosMasivos.find();
});
Meteor.publish('potreros.all', function () {
  return Potreros.find();
});
Meteor.publish('rodeos.all', function () {
  return Rodeos.find();
});
Meteor.publish('especies.all', function () {
  return Especies.find();
});
Meteor.publish('settings.all', function () {
  return Settings.find();
});

}