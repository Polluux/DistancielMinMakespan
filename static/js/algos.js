function lsa(nb_machines, jobs) {
	//On créé un tableau de nb_machines emplacements, qui représentent le temps d'activité de chaque machines
	machines = new Array(nb_machines).fill(0);
	//Ensuite, pour chaque élément de jobs, on l'attribue à la machine la plus faible
	for(j in jobs){
		machines[indexOfMin(machines)[0]] += jobs[j];
	}
	//On retourne ensuite simplement la plus grand valeur de ce tableau (la machine qui travail le plus longtemps en continu)
	return machines[indexOfMax(machines)[0]];
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
		indexMin = indexOfMin(machines)[0];
		tmp.push.apply(tmp,machines[indexMin]);
		machines[indexMin] = tmp;
	}
	//Puis on tente de réarranger entre les machines ... bullshit
	condition = true;
	//console.log(machines);
	while(condition){
		machinesTmp = JSON.stringify(machines);
		rearrange(machines);
		if(machinesTmp == JSON.stringify(machines)){
			condition = false;
		}
		//console.log(machines);
	}
	return sum(machines[indexOfMax(machines)[0]]);
}

function rearrange(machines){
	//Pour chaque machine max
	for(i in indexOfMax(machines)){
		index = indexOfMax(machines)[i];
		//Tester pour chaque autre machine
		for(m in machines){
			diff = sum(machines[index]) - sum(machines[m]);
			//Qui n'est pas une max
			if(diff > 0){
				//Pour chacunes des tâches de la machine max
				for(t in machines[index]){
					//Plus petite que la différence
					if(machines[index][t] < diff){
						console.log(1);
						//On la met dans l'autre machine
						// /!\
						tmp = [];
						tmp[0] = machines[index][t];
						tmp.push.apply(tmp,machines[m])
						machines[m] = tmp;
						machines[index].splice(t,1);
						return machines;
					//Sinon
					}else{
						//Associée à chacunes des tâches de la machine autre
						for(t2 in machines[m]){
							//Dont la différence des deux tâches engendre une amélioration
							if(machines[index][t] - machines[m][t2] < diff && machines[index][t] - machines[m][t2] > 0){
								//console.log("La tache "+t2+" de la machine "+m+" est plus petite que la tâche "+t+" de la machine "+i)
								//Alors on procède à l'échange
								// /!\
								tmp = [];
								tmp[0] = machines[index][t];
								tmp2 = [];
								tmp2[0] = machines[m][t2];
								machines[index].splice(t,1);
								machines[m].splice(t2,1);
								tmp.push.apply(tmp,machines[m])
								tmp2.push.apply(tmp2,machines[index])
								machines[m] = tmp;
								machines[index] = tmp2;
								return machines;
							}
						}
					}
				}
			}
		}
	}
	//On arrive ici, si il n'y a plus de possibilités d'améliorations
	return machines;
}


//Retourne LES index du plus petit élément de arr
function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = sum(arr[0]);
    var minIndex = [0];

    for (var i = 1; i < arr.length; i++) {
        if (sum(arr[i]) < min) {
            minIndex = [i];
            min = sum(arr[i]);
        }else if(sum(arr[i]) == min){
        	minIndex.push.apply(minIndex,[i]);
        }
    }

    return minIndex;
}

//Retourne LES index du plus grand élément de arr
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = sum(arr[0]);
    var maxIndex = [0];

    for (var i = 1; i < arr.length; i++) {
        if (sum(arr[i]) > max) {
            maxIndex = [i];
            max = sum(arr[i]);
        }else if(sum(arr[i]) == max){
        	maxIndex.push.apply(maxIndex,[i]);
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