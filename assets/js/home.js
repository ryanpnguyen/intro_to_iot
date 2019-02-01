setActivePage('nav_home');

if (document.querySelector('.jscolor').value == '000000'){
	document.getElementById('off-button').classList.add('disabled');
	document.getElementById('set-default-button').classList.add('disabled');
} else {
	document.getElementById('off-button').classList.remove('disabled');
	document.getElementById('set-default-button').classList.remove('disabled');	
}

function submit(setDefault=false, useDefault=false, turnOff=false){
	if (setDefault){
		document.getElementById('set-as-default').checked = true;
	}

	if (useDefault){
		document.getElementById('change-to-default').checked = true;
	}

	if (turnOff){
		document.getElementById('turn-off').checked = true;
	}

	document.getElementById('color-form').submit();
}

var	data = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};

var ctx = document.getElementById('temperature-chart');
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    // options: options
});