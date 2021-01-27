Settings = new Mongo.Collection('settings');
Liquidaciones = new Mongo.Collection('liquidaciones');
Nomencladores = new Mongo.Collection('nomencladores');
ObrasSociales = new Mongo.Collection('obrasSociales');
Pacientes = new Mongo.Collection('pacientes');

Animales = new Mongo.Collection('animales');
Rodeos = new Mongo.Collection('rodeos');
Especies = new Mongo.Collection('especies');
Potreros = new Mongo.Collection('potreros');
EventosMasivos = new Mongo.Collection('eventosMasivos');

EventosMasivos.attachSchema(new SimpleSchema({
  estado: {
    type: String,
    label: 'Estado',
    autoform: {
       type: "select2",
       options: function () {
        return [{label: "APLICADO", value: "APLICADO"},{label: "PARA APLICAR", value: "PARA APLICAR"}]
        },
        style: "width:180px",
      },
  },
  tipoEvento:{
    type: String,
    label:"Tipo Evento",
    autoform: {
       type: "select-radio",
       options: function () {
        return [{label: "PESAJE", value: "PESAJE"},{label: "INSEMINADA", value: "INSEMINADA"},{label: "CAMBIO POTRERO", value: "CAMBIO POTRERO"},{label: "MEDICACION", value: "MEDICACION"},{label: "INSEMINA", value: "INSEMINA"},{label: "PREÑADA", value: "PREÑADA"},{label: "FALLECE", value: "FALLECE"},{label: "VENTA", value: "VENTA"},{label: "OTROS", value: "OTROS"}]
        },
        style: "width:250px",
      },
  },
  fecha: {
    type: Date,
    label: 'Fecha Evento',
  },
  detalle: {
    type: String,
    label: 'Detalle',
    optional:true
  },
  animales:{
    type:Array,
    optional:true
  },
  "animales.$":{
    type:Object,
  },
  "animales.$._id":{

    type: String,
    autoValue: function() {
      return Meteor.uuid();  
    }
 
  },
  "animales.$.idAnimal":{

    type: String,
    label:"Detalle",
   optional:true
  },
  "animales.$.idAnimal":{
    type: String,
    decimal: true,
    optional:false,
    label:"Animal",
    autoform: {
       type: "select2",
       options: function () {
        return _.map(Animales.find().fetch(), function (c, i) {
          return {label: c.nombre+" "+c.carabana, value: c._id};
        })},
        style: "width:200px",
      },
 
  },

 
  "animales.$.valor":{
    type: String,
    label: 'Valor',
    optional:true
   
  },
  "animales.$.idEventoAnimal":{
    type: String,
    label: 'ID evento Animal',
    optional:true
   
  },
  
}))
Potreros.attachSchema(new SimpleSchema({
  
  
  fechaUpdate: {
    type: Date,
    label: 'Fecha Update',
    optional:true
  },
  nombrePotrero: {
    type: String,
    label: 'Nombre',
  },
  superficie: {
    type: String,
    label: 'Sup2.',
  },
  detalle: {
    type: String,
    label: 'Detalle',
    optional:true
  },
  animales:{
    type:Array,
    optional:true
  },
  "animales.$":{
    type:Object,
  },
  "animales.$._id":{

    type: String,
    autoValue: function() {
      return Meteor.uuid();  
    }
 
  },
  "animales.$.detalle":{

    type: String,
    label:"Detalle",
   optional:true
  },
  "animales.$.idAnimal":{
    type: String,
    decimal: true,
    optional:false,
    label:"Animal",
    autoform: {
       type: "select2",
       options: function () {
        return _.map(Animales.find().fetch(), function (c, i) {
          return {label: c.nombre+" "+c.carabana, value: c._id};
        })},
        style: "width:200px",
      },
 
  },

   "animales.$.fecha":{
    type: Date,
label: 'Fecha',
    optional:false
   
  },
  rodeos:{
    type:Array,
    optional:true
  },
  "rodeos.$":{
    type:Object,
  },
  "rodeos.$._id":{

    type: String,
    autoValue: function() {
      return Meteor.uuid();  
    }
 
  },
  "rodeos.$.idEspecie":{
    type: String,
    decimal: true,
    optional:false,
    label:"Grupo",
    autoform: {
       type: "select2",
       options: function () {
        return _.map(Especies.find().fetch(), function (c, i) {
          return {label: c.nombreEspecie, value: c._id};
        })},
        style: "width:200px",
      },
 
  },

   "rodeos.$.fecha":{
    type: Date,
label: 'Fecha',
    optional:false
   
  },
}))
Especies.attachSchema(new SimpleSchema({
  
  
  fechaUpdate: {
    type: Date,
    label: 'Fecha Update',
    optional:true
  },
  nombreEspecie: {
    type: String,
    label: 'Nombre',
  },
  esReproductor: {
    type: Boolean,
    label: 'Son Reproductores',
  },
  inseminada: {
    type: Boolean,
    label: 'Estan Inseminadas',
  },
  enCelo: {
    type: Boolean,
    label: 'Tienen Celo',
  },
  preniada: {
    type: Boolean,
    label: 'Estan Preniadas',
  },
  genetica: {
    type: String,
    label: 'Genetica',
    optional:true
  },
   desdeMeses: {
    type: Number,
    label: 'Desde Meses',
  },
  hastaMeses: {
    type: Number,
    label: 'Hasta Meses',
  },
  genero:{
     type: String,
    label: 'Genero',
    autoform: {
       type: "select-radio-inline",
       options: function () {
        return [{label: "MACHO       ", value: "MACHO"},{label: "HEMBRA", value: "HEMBRA"}]
        },
        style: "width:250px",
      },
  }
}))
Rodeos.attachSchema(new SimpleSchema({

  fechaUpdate: {
    type: Date,
    label: 'Fecha Update',
    optional:true
  },
  nombreRodeo: {
    type: String,
    label: 'Nombre',
  },
    idEspecie: {
    type: String,
    decimal: true,
    optional:true,
    label:"Especie",
    autoform: {
       type: "select2",
       options: function () {
        return _.map(Especies.find().fetch(), function (c, i) {
          return {label: c.nombreEspecie, value: c._id};
        })},
        style: "width:150px",
      },
  },

    
   descripcion: {
    type: String,
    optional:true,
    label: 'Descripcion',
  },
  desdeMeses: {
    type: Number,
    label: 'Desde Meses',
  },
  hastaMeses: {
    type: Number,
    label: 'Hasta Meses',
  },
    idEspecie: {
    type: String,
    decimal: true,
    optional:false,
    label:"Especie",
    autoform: {
       type: "select2",
       options: function () {
        return _.map(Especies.find().fetch(), function (c, i) {
          return {label: c.nombreEspecie, value: c._id};
        })},
        style: "width:250px",
      },
  },
   color: {
    type: String,
    label: 'Color',
  },

}));
Animales.attachSchema(new SimpleSchema({
  
eventos:{
    type:Array,
    optional:true
  },
  "eventos.$":{
    type:Object,
  },
  "eventos.$._id":{

    type: String,
    label:"ID"
 
  },
   "eventos.$.fecha":{
    type: Date,

    autoform: {
        style: "width:200px",
      },
  },
  "eventos.$.valor":{
    type: String,
    optional:true,
    autoform: {
        style: "width:100px",
      },
  },
  "eventos.$.tipoEvento":{ 
    type: String,
    label:"Tipo Evento",
    autoform: {
       type: "select2",
       options: function () {
        return [{label: "PESAJE", value: "PESAJE"},{label: "CAMBIO POTRERO", value: "CAMBIO POTRERO"},{label: "INSEMINADA", value: "INSEMINADA"},{label: "MEDICACION", value: "MEDICACION"},{label: "INSEMINA", value: "INSEMINA"},{label: "PREÑADA", value: "PREÑADA"},{label: "FALLECE", value: "FALLECE"},{label: "VENTA", value: "VENTA"},{label: "OTROS", value: "OTROS"}]
        },
        style: "width:250px",
      },
  },
  "eventos.$.detalle":{
    type: String,
    decimal:true,
    optional:true,
    autoform: {
        style: "width:215px",
      },
  },
  fechaUpdate: {
    type: Date,
    label: 'Fecha Update',
    optional:true,
  },
  fechaCelo: {
    type: Date,
    label: 'Fecha Celo',
    optional:true,
  },
   enCelo: {
    type: Boolean,
    label: 'Tiene Celo',
    optional:true
  },
  carabana: {
    type: String,
    label: 'Caravana',
    unique: true
  },
  prenada: {
    type: Boolean,
    label: 'Esta Preñada?',
  },
  inseminada: {
    type: Boolean,
    label: 'Esta inseminada?',
  },
   esReproductor: {
    type: Boolean,
    label: 'Reproductor',
  },
  cuig: {
    type: String,
    label: 'Cuig',
  },
  estado: {
    type: String,
    label: 'Estado',
    autoform: {
       type: "select2",
       options: function () {
        return [{label: "ACTIVO", value: "ACTIVO"},{label: "INACTIVO", value: "INACTIVO"}]
        },
        style: "width:180px",
      },
  },
  nombre: {
    type: String,
    label: 'Nombre',
  },

  raza: {
    type: String,
    label: 'Raza',
  },
  
  categoria: {
    type: String,
    label: 'Categoría de Pedigre',
  },

   esMacho: {
    type: Boolean,
    label: 'Es Macho?',
    optional:true
  },
  fechaNacimento: {
    type: Date,
    label: 'Nacimiento',
  },
  pesoNacimiento: {
    type: String,
    label: 'Peso Nacimiento',
  },



}))


Settings.attachSchema(new SimpleSchema({
  
  valor: {
    type: String,
    label: 'Valor',
  },
  clave: {
    type: String,
    label: 'Clave',
  },
  fecha: {
    type: Date,
     label: 'Fecha',
    optional: true, 

  },
}), { tracker: Tracker });

