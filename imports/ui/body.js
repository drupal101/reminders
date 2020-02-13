
// Imports
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './Calendar.js';
import '../api/task.js';
import './body.html';

import { addEntry } from './Calendar.js';


require('bootstrap');

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
 
Template.body.helpers({
	tasks() {    
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
			// If hide completed is checked, filter tasks
			return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
		}

		// Otherwise, return all of the tasks
		// Show newest tasks at the top
		return Tasks.find({}, { sort: { createdAt: -1 } });
		},

  	incompleteCount() {
		return Tasks.find({ checked: { $ne: true } }).count();
		 },
	}
);


Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    var date = new Date();

    // Get value from form element
    const target = event.target;
	const text_title = target.text_Title.value;
	const text_details = target.text_Details.value;

	// Insert a task into the collection
    Tasks.insert({
			id: 1,
            title: text_title,
            start: '2020-02-14',
            allDay: true,
            description: text_details,
    });

	// Add this event to the calendar
	addEntry(text_title, text_details);

    // Clear form
    target.text_Title.value = '';
	},

    'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
	},

});