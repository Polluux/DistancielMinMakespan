function lsa(nb_machines, jobs) {
	//On créé un tableau de nb_machines emplacements, qui représentent le temps d'activité de chaque machines
	machines = new Array(nb_machines).fill(0);
	//Ensuite, pour chaque élément de jobs, on l'attribue à la machine la plus faible
	for(j in jobs){
		machines[indexOfMin(machines)] += jobs[j];
	}
	//On retourne ensuite simplement la plus grand valeur de ce tableau (la machine qui travail le plus longtemps en continu)
	return machines[indexOfMax(machines)];
}

function lpt(nb_machines, jobs) {
	//Tri décroissant de jobs
	jobs.sort(function(a,b){
		return b - a;
	});
	//On utilise simplement l'algorithme lsa, avec le tableau des tâches trié
	return lsa(nb_machines, jobs);
}

function myalgo(nb_machines, jobs) {
	//On créé un tableau de nb_machines emplacements, qui représentent le temps d'activité de chaque machines
	//Cependant, il n'est pas initialisé à 0, mais avec d'autres tableaux, vides, qui représentent les tâches pour cette machine
	machines = new Array(nb_machines).fill(new Array());
	//Ensuite on execute l'algorithme lsa
	for(j in jobs){
		tmp = [];
		tmp[0] = jobs[j];
		indexMin = indexOfMin(machines);
		tmp.push.apply(tmp,machines[indexMin]);
		machines[indexMin] = tmp;
	}
	//Puis on tente de réarranger entre les machines ... bullshit
	return sum(machines[indexOfMax(machines)]);
}


function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = sum(arr[0]);
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (sum(arr[i]) < min) {
            minIndex = i;
            min = sum(arr[i]);
        }
    }

    return minIndex;
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = sum(arr[0]);
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (sum(arr[i]) > max) {
            maxIndex = i;
            max = sum(arr[i]);
        }
    }

    return maxIndex;
}

function sum(arr){
	//Récupérer la somme d'un array, ou simplement la valeur d'un int
	//Permet l'utilisation de lsa dans MyAlgo sans avoir à réécrire les fonctions
	if (arr instanceof Array) {
		return arr.reduce(function(pv, cv) { return pv + cv; }, 0);
	}else{
		return arr;
	}
}

console.log(lsa(3,[2,7,1,3,2,6,2,3,6,2,5]));
console.log(lpt(3,[2,7,1,3,2,6,2,3,6,2,5]));
console.log(myalgo(3,[2,7,1,3,2,6,2,3,6,2,5]));