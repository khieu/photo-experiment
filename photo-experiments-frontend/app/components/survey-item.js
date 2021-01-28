import Component from '@glimmer/component';
import { action } from '@ember/object';
import fetch from 'fetch';
import ENV from 'photo-experiments-frontend/config/environment';


export default class SurveyItem extends Component {
	backendAddress = 'http://localhost:3000';

	item = null;

	solutions = ENV.solutions;

	ref_expressions = ENV.ref_expressions;

	totalItems = 20;//Object.keys(ENV.solutions).length;

	totalOptionsForEachItem = 6; // the total number of options to choose

	url = '/images/'

	/**
	* User's selected option
	*/
	selectedOption = null;

	constructor(){
		super(...arguments);
		this.item = Math.floor(Math.random() * this.totalItems); // the id of the image
		this.url = this.url + `${this.item}.png`; // the url of the image from the public/images folder
		this.solution = this.solutions[this.item]; // the solution
		this.generated_expression = this.ref_expressions[this.item];

		console.log(this.solution, this.generated_expression)

		const arr = Array.apply(null, Array(this.totalOptionsForEachItem));
        this.options = arr.map(function (x, i) { return i });
        console.log(this.solutions);
	}

	@action
	onSelect(option) {
		console.log(option);
		this.selectedOption = option;
	}

	@action
	onSubmit() {
		if (typeof this.selectedOption === 'number') {
			// TODO: Use the method in service to send request to backend
			// prepare request
			console.log(this.selectedOption);
			const data = {
				id: this.item,
				isCorrect: this.selectedOption === this.solution,
			};
			fetch(`${this.backendAddress}/saveResponse`, {
				method: 'POST',
				headers: {
                	'Content-Type': 'application/json'
            	},
            	body: JSON.stringify(data),
			}).then(response => {
				console.log(response);
			});
		}
	}
};