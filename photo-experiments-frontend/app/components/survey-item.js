import Component from '@glimmer/component';
import { action } from '@ember/object';
import { SOLUTIONS } from '../constants/solutions'

export default class SurveyItem extends Component {
	item = null;

	totalItem = Object.keys(SOLUTIONS).length;

	url = '/images/'

	/**
	* User's selected option
	*/
	selectedOption = null;

	constructor(){
		super(...arguments);
		this.item = Math.floor(Math.random() * this.totalItem);
		this.url = this.url + `${this.item}.png`
		this.numOptions = SOLUTIONS[this.item].totalOptions;
		this.solution = SOLUTIONS[this.item].solution;

		const arr = Array.apply(null, Array(this.numOptions));
        this.options = arr.map(function (x, i) { return i });
	}

	@action
	onSelect(option) {
		this.selectedOption = option;
	}

	@action
	onSubmit() {
		if (this.selectedOption) {
			console.log(this.selectedOption);
		}
	}
};