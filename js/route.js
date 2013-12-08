

var Router = Backbone.Router.extend({
  stages : spreadsheet.stages,

  routes: {
    "(:stage)(/:section)":  "slideToStage"
  },

  populateSlides : function() {
    var s = [];
    var num_sections = 3;

    for(stage_num in this.stages) {
      stage = this.stages[stage_num];

      // override number of sections for a stage here
      switch(stage) {
        case "project": num_sections = 2;
      }

      for (i=1; i<num_sections+1; i++) {

        s.push({
          'stage': stage,
          'section': i,
        });
      } 
    }
    return s;
  },

  initialize: function(options) {
    // this.slides = new SlideCollection(this.populateSlides());
    this.slides = new SlideCollection(this.stages);
    this.view = new SlideView({
      el: $('#slide'),
      collection: this.slides,
    });
  },

  slideToStage: function(stage, section) {
    stage = stage ? stage : "project";
    section = section ? section : 1;
    this.view.render(stage, parseInt(section));
  }

});

$(document).ready(function() { 

  window.router = new Router();
  Backbone.history.start();

});