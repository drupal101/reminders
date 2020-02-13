
import './Calendar.html';
import 'fullcalendar';
import { Tasks } from '../api/tasks.js';
import moment from 'moment';

// On document ready
$(function() {

	// initialize calendar
	$('#calendar').fullCalendar({
		// Options
		weekends: true,

		header: {
			left: ' ',
			center: 'title',
			right: 'today prev,next'
		},

		buttonIcons: {
			 prev: 'left-single-arrow',
			 next: 'right-single-arrow',
			 prevYear: 'left-double-arrow',
			 nextYear: 'right-double-arrow'
		},
	
		/*************************************/
		/*Mongodb Sources */
		events: (start, end, timezone, callback) => {

			var events = [];

			Tasks.find({}).forEach(function(err, docs) {
			console.log("title - " +  $(this).attr('title') + $(this).attr('start'));

			events.push({
				title: $(this).attr('title'),
				start: $(this).attr('start')
			});
			})
			if (events) {
                callback(events);
            }
		},

		/*************************************/
		// Functions / callbacks
		dayClick: function(date) {
			alert("Clicked on " + date.format());
		},
		eventClick: function(event) {
			    alert("Event title: " + event.title + "\nEvent description: " +     event.description + "\nEvent time: " +    moment(event.start).format("hh:mm A"));
		},
	});
});

/*************************************/
// Add new entry to database
export function addEntry( text_title, text_details) {
	Tasks.find({}).forEach(function(err, docs) {
			console.log("title - " +  $(this).attr('title') + $(this).attr('start'));
	})
};

