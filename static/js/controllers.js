function au_clavier() {
	single_instance(document.getElementById('input_au_clavier').value);
}

function alea() {
	// get values
	var filename = document.getElementById('input_alea_filename').value;
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

	// calculate instance
	instances.map(x => x.calculate());

	// write nicely in a file
	
	var txt = " ---~~ Roxane Bellot & Alexandre Boudine  ~~---\n \n \n \
---~~ Entrées\n \n \
nombre de machines : " + m + "\n \
nombre de jobs: " + n + "\n \
nombre d'instances : " + k + "\n \n \n \
---~~ Résultats";


	var rlsa = []
	var rlpt = []
	var rmyalgo = []

	for (var i = 0; i < k; i++ ){
		txt += "\n \n -- Instance n°" + i + "\n" + instances[i].toString();
		var mi = Math.max(instances[i].borne_max, instances[i].borne_moy);
		rlsa.push(instances[i].lsa / mi);
		rlpt.push(instances[i].lpt / mi);
		rmyalgo.push(instances[i].myalgo / mi);
	}

	// calculate stats

	var sumrlsa = 0;
	rlsa.map(x => parseInt (sumrlsa += x));
	var sumrlpt = 0;
	rlpt.map(x => parseInt (sumrlpt += x));
	var sumrmyalgo = 0;
	rmyalgo.map(x => parseInt (sumrmyalgo += x));

	txt += "\n \n ---~~ Statistiques\n\n";
	txt += "\n ratio d'approximation moyen LSA  : " + sumrlsa/rlsa.length;
	txt += "\n ratio d'approximation moyen LPT  : " + sumrlpt/rlpt.length;
	txt += "\n ratio d'approximation moyen MyAlgo  : " + sumrmyalgo/rmyalgo.length;




	// download
	// thanks https://stackoverflow.com/questions/3665115/
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);

}


function from_file() {
	file = document.getElementById('input_from_file').files[0];
	fr = new FileReader();
	fr.onload = deal_with_it;
	fr.readAsText(file)
	function deal_with_it() {
		single_instance(fr.result);
	}
}

function single_instance(input) {
	input = input.split(':').map(x => parseInt (x));
	var nb_jobs = input[1];
	var jobs = input.slice(2);

	if (jobs.length == nb_jobs){
		var instance = new Instance(input[0], jobs);
		instance.calculate();
		instance.populate();
	}

}

