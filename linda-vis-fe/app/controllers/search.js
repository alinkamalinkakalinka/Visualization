/**
 * Created by alina on 30.08.15.
 */
import Ember from "ember";
import treeselection_data from "../utils/tree-selection-data-module";

App.IndexController = Ember.ArrayController.extend ({
  search: '',
  titleFilter: null,
  actions:{
    query: function() {
      // the current value of the text field
      var query = this.get('search');
      this.set('titleFilter', query);
    },
    addNote: function () {
      this.transitionToRoute('main');
    }
  },
  arrangedContent: function() {
    var search = this.get('search');
    binding = Ember.Binding.from("App.tree-selection.content").to("content");
    binding.connect(this);
    if (!search) { return this.get('content') }

    return this.get('content').filter(function(note) {
      return note.get('title').indexOf(search) != -1;
    })
  }.property('content', 'titleFilter')
});
