import Ember from "ember";
import treeselection_data from "../utils/tree-selection-data-module";

export default Ember.Controller.extend({
  isToggled: true,
  treeContent: function () {
    console.log('DATASOURCE CONTROLLER');
    var dataInfo = this.get('model'); // data sources
    if (!dataInfo) {
      return {};
    }
    var searchResults = this.get("searchResults");
    console.log('azaza');
    console.dir(searchResults);

    if (searchResults){
      return searchResults;
    }
    this.set('selectedDatasource', dataInfo);
   // this.set('searchResults', data);
  //
//    var searchResults = this.get('searchResults');
    var previousSelection = this.get('previousSelection');

    // NOTE: Why are you calling treeselection_data.search both here and in the search action ?
    //       Also, why are you calling restore in the else branch?

    if (previousSelection.length === 0) {
      return treeselection_data.initialize(dataInfo);
    } else {
      return treeselection_data.restore(dataInfo, previousSelection);
    }

  }.property('model', 'previousSelection', 'searchResults'),
  previousSelection: [],
  dataSelection: [],
  selectedDatasource: null,
  searchResults: null,
  resetSelection: function () {
    this.get('dataSelection').length = 0;
  }.observes('model'),
  actions: {
    visualize: function () {
      var self = this;
      var selection = this.get('dataSelection');
      var datasource = this.get('selectedDatasource');
      var selected = treeselection_data.getDataSelection(selection, datasource);
      var dataselection = this.store.createRecord('dataselection', selected);
      console.log('VISUALIZE');
      dataselection.save().then(function (responseDataselection) {
        console.log("SAVED DATA SELECTION. TRANSITION TO VISUALIZATION ROUTE .....");
        console.dir(responseDataselection);
        self.transitionToRoute('visualization', 'dataselection', responseDataselection.id);
      });
    },
    search: function () {
      var term = this.get('term');
      var dataInfo = this.get('model');
      var results = treeselection_data.search(dataInfo, term);
      console.log('SEARCH RESULTS1');
      console.dir(results);
       this.set("searchResults", results);
      //}, function(err) {
      //  console.error(err);
      //});

      console.log('Keyword');
      console.dir(term);

    },
    toggle: function () {
      var toggled = this.get('isToggled');
      if (toggled) {
        this.set('isToggled', false);
      } else {
        this.set('isToggled', true);
      }
    }
  }
});
