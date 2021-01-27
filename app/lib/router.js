applicationController = RouteController.extend({
  layoutTemplate: 'layoutApp',
	  loadingTemplate: 'loaderGral',
	  notFoundTemlplate: 'notFound',

	  waitOn: function() {
		return [
			
		];
	  },
	  onBeforeAction: function(pause) {
		this.render('loaderGral');
		if ( !Meteor.user() )
			{this.render('login');}
 	else		{this.next();}
	  },
	  action: function () {
		if (!this.ready()) {
		  this.render('loaderGral');
		}
		else {
		  this.render();

		}
	  }
	});
applicationControllerLiquida = RouteController.extend({
  layoutTemplate: 'layoutApp',
	  loadingTemplate: 'loaderGral',
	  notFoundTemlplate: 'notFound',

	  waitOn: function() {
		return [
			// Meteor.subscribe('liquidaciones.all',Meteor.user())
		];
	  },
	  onBeforeAction: function(pause) {
		this.render('loaderGral');
		if ( !Meteor.user() )
			{this.render('login');}
 	else		{this.next();}
	  },
	  action: function () {
		if (!this.ready()) {
      console.log(Meteor.user())
		  this.render('loaderGral');
		}
		else {
		  this.render();

		}
	  }
	});
Router.route('/', {
 path: '/',
 // layoutTemplate: 'layoutVacio',
    template:"inicio",
		controller: applicationController,
});
Router.route('/inicio', {
 path: '/inicio',
 // layoutTemplate: 'layoutVacio',
    template:"inicio",
		controller: applicationController,
});
Router.route('/eventosMasivos', {
 path: '/eventosMasivos',
 // layoutTemplate: 'layoutVacio',
    template:"eventosMasivos",
		controller: applicationController,
});
Router.route('/especies', {
 path: '/especies',
 // layoutTemplate: 'layoutVacio',
    template:"especies",
		controller: applicationController,
});
Router.route('/potreros', {
 path: '/potreros',
 // layoutTemplate: 'layoutVacio',
    template:"potreros",
		controller: applicationController,
});
Router.route('animales', {
		path: '/animales',
    template:"animales",
		controller: applicationController,
})
Router.route('rodeos', {
		path: '/rodeos',
    template:"rodeos",
		controller: applicationController,
})
Router.route('settings', {
		path: '/settings',
    template:"settings",
		controller: applicationController,
})
Router.route('informe', {
		path: '/informe',
    template:"informe",
		controller: applicationController,
})
Router.route('usuarios', {
		path: '/usuarios',
    template:"usuarios",
		controller: applicationController,
})