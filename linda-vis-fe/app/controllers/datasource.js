import Ember from "ember";
import treeselection_data from "../utils/tree-selection-data-module";

export default Ember.Controller.extend({
    isToggled: true,
    treeContent: function() {
        console.log('DATASOURCE CONTROLLER');
        var dataInfo = this.get('model'); // data sources
        if (!dataInfo){
	  return{};
        }

        this.set('selectedDatasource', dataInfo);
      var searchResults = this.get('searchResults');
      console.log(this.get(term));
        var previousSelection = this.get('previousSelection');
        if (previousSelection.length === 0) {
            return treeselection_data.initialize(dataInfo);
        } else {
            return treeselection_data.restore(dataInfo, previousSelection);
        }
    }.property('model', 'previousSelection', 'searchResults'), /** SEARCH **/
    previousSelection: [],
    dataSelection: [],
    selectedDatasource: null,
    searchResults: null,
    resetSelection: function() {
        this.get('dataSelection').length = 0;
    }.observes('model'),
    actions: {
        visualize: function() {
            var self = this;
            var selection = this.get('dataSelection');
            var datasource = this.get('selectedDatasource');
            var selected = treeselection_data.getDataSelection(selection, datasource);
            var dataselection = this.store.createRecord('dataselection', selected);
console.log('VISUALIZE');
            dataselection.save().then(function(responseDataselection) {
                console.log("SAVED DATA SELECTION. TRANSITION TO VISUALIZATION ROUTE .....");
                console.dir(responseDataselection);
                self.transitionToRoute('visualization', 'dataselection', responseDataselection.id);
            });
        },
      search: function() {
        var term = this.get('term');
        var dataInfo = this.get('model');
        this.get('searchResults');
        results = treeselection_data.search(dataInfo, term);
        this.set('searchResults', results);
        console.log('SEARCH RESULTS');
        console.dir(results);
        treeselection_data.initialize(search);
        return treeselection_data.initialize(dataInfo);
        return treeselection_data.restore(dataInfo, previousSelection);

      },
        toggle: function() {
            var toggled = this.get('isToggled');
            if (toggled) {
                this.set('isToggled', false);
            } else {
                this.set('isToggled', true);
            }
        }
    }
});
