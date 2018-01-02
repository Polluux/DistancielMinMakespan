function lsa(nb_machines, jobs) {
	return 10;
}

function lpt(nb_machines, jobs) {
	//Tri décroissant de jobs
	jobs.sort(function(a,b){
		return b - a;
	});
	//On créé un tableau de nb_machines emplacements, qui représente le temps d'activité de chaques machines
	machines = new Array(nb_machines).fill(0);
	//Ensuite, pour chaque élément de jobs, on l'attribue à la machine la plus faible
	for(j in jobs){
		machines[indexOfMin(machines)] += jobs[j];
	}
	//On retourne ensuite simplement la plus grand valeur de ce tableau (la machine qui travail le plus longtemps en continu)
	return machines[indexOfMax(machines)];
}

function myalgo(nb_machines, jobs) {
	return 3
}


function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

//console.log(lpt(3,[1,2,3,4,5,6]));