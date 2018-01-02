class Instance {
	constructor(nb_machines, jobs){
		this.nb_machines = nb_machines;
		this.jobs = jobs;
	}

	calculate(){
		document.getElementById('loader').classList.add('active');
		this.lsa 	= lsa(this.nb_machines, this.jobs);
		this.lpt 	= lpt(this.nb_machines, this.jobs);
		this.myalgo = myalgo(this.nb_machines, this.jobs);
		document.getElementById('loader').classList.remove('active');
	}

	populate(){
		document.getElementById('result_lsa').textContent = this.lsa; 
		document.getElementById('result_lpt').textContent = this.lpt; 
		document.getElementById('result_myalgo').textContent = this.myalgo; 
		document.getElementById('borne_max').textContent = Math.max(...this.jobs); // compatibilité ?
		var sum = 0;
		for( var i = 0; i < this.jobs.length; i++ ){
		    sum += this.jobs[i]
		}
		document.getElementById('borne_moy').textContent = sum/this.nb_machines;
	}
}