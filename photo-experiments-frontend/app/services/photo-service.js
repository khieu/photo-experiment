import Service from '@ember/service';
import fetch from 'fetch';

export default class PhotoService extends Service {
	/**
	* TODO: Better to have the fetch in this service
	* id: {Number} id of the photo 
	* answer: {Number} the answer that user selects
	* @return Promise
 	*/
	saveResposne(id, answer) {
		const data = {
				id,
				answer
		};
		return fetch(`${this.backendAddress}/saveResponse`, {
			method: 'POST',
			headers: {
            	'Content-Type': 'application/json'
        	},
        	body: JSON.stringify(data),
		})
	}
}
