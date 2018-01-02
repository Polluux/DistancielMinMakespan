function au_clavier() {
	var input = document.getElementById('input_au_clavier').value.split(' : ').map(x => parseInt (x));
	var nb_jobs = input[1];
	var jobs = input.slice(2);

	if (jobs.length == nb_jobs){
		var instance = new Instance(input[0], jobs);
		instance.calculate();
		instance.populate();
	}
}