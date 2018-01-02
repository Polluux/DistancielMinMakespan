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
		this.borne_max = Math.max(...this.jobs); // compatibilité ?;
		var sum = 0;
		for( var i = 0; i < this.jobs.length; i++ ){
		    sum += this.jobs[i]
		}
		this.borne_moy = sum/this.nb_machines;
		document.getElementById('loader').classList.remove('active');
	}

	populate(){
		document.getElementById('result_lsa').textContent = this.lsa; 
		document.getElementById('result_lpt').textContent = this.lpt; 
		document.getElementById('result_myalgo').textContent = this.myalgo; 
		document.getElementById('borne_max').textContent = this.borne_max
		document.getElementById('borne_moy').textContent = this.borne_moy;
	}

	toString(){
		var txt = "Borne inférieure \"maximum\" = " + this.borne_max + "\n";
		txt += "Borne inférieure \"moyenne\" = " + this.borne_moy + "\n";
		txt += "Résultat LSA = " + this.lsa + "\n";
		txt += "Résultat LPT = " + this.lpt + "\n";
		txt += "Résultat MyAlgo = " + this.myalgo + "\n";
		return txt;
	}
}