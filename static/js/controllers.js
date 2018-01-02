function au_clavier() {
	var input = document.getElementById('input_au_clavier').value.split(':').map(x => parseInt (x));
	var nb_jobs = input[1];
	var jobs = input.slice(2);

	if (jobs.length == nb_jobs){
		var instance = new Instance(input[0], jobs);
		instance.calculate();
		instance.populate();
	}
}

function alea() {
	// get values
	var n =   parseInt(document.getElementById('input_alea_n').value);
	var m =   parseInt(document.getElementById('input_alea_m').value);
	var k =   parseInt(document.getElementById('input_alea_k').value);
	var min = parseInt(document.getElementById('input_alea_min').value);
	var max = parseInt(document.getElementById('input_alea_max').value);
	var diff = max - min + 1;

	// generate instances
	var instances = [];
	for (var i = 0; i < k; i++ ){
		//generate jobs
		var jobs = [];
		for (var j = 0; j < n; j++ ){
			jobs.push(Math.floor((Math.random() * diff) + min));
		}
		instances.push(new Instance(m, jobs));
	}
}