/**
 * Created by alina on 30.08.15.
 */

import Ember from "ember";

Ember.Handlebars.helper('autocomplete', Ember.View.extend({
  templateName: 'controls/autocomplete',

  filteredList: function() {
    binding = Ember.Binding.from("App.Data.value").to("content");
    binding.connect(this);
      filter = this.get('filter');

    if (!filter) { return content; }

    return list.filter(function(item) {
      return item.name.indexOf(filter) !== -1;
    });
  }.property('list.@each', 'filter')
}));
