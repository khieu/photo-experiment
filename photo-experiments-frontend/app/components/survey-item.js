import Component from '@glimmer/component';
import { action } from '@ember/object';
import { SOLUTIONS } from '../constants/solutions'
import fetch from 'fetch';

export default class SurveyItem extends Component {
	backendAddress = 'http://localhost:3000';

	item = null;

	totalItem = Object.keys(SOLUTIONS).length;

	url = '/images/'

	/**
	* User's selected option
	*/
	selectedOption = null;

	constructor(){
		super(...arguments);
		this.item = Math.floor(Math.random() * this.totalItem); // the id of the image
		this.url = this.url + `${this.item}.png`; // the url of the image from the public/images folder
		this.numOptions = SOLUTIONS[this.item].totalOptions; // the total number of options to choose
		this.solution = SOLUTIONS[this.item].solution; // the solution

		const arr = Array.apply(null, Array(this.numOptions));
        this.options = arr.map(function (x, i) { return i });
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