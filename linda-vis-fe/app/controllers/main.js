/**
 * Created by alina on 30.08.15.
 */
import Ember from 'ember';
import computedFilterByQuery from 'ember-cli-filter-by-query';
c

export default Ember.Controller.extend({
  queryParams: ['term'],
  results: ['treedata'],
  queryResults: computedFilterByQuery('results', 'name', 'term').readOnly(),

  filteredResults: function() {
    return this.get('queryResults');
  }.property('queryResults'),

  actions: {
    submitSearch: function(result) {
      this.transitionTo('results', { queryParams: { term: result } });
    }
  }
});
