import Chart from 'chart.js/auto';
//import 'chartjs-adapter-date-fns';

const drawChartTen = async (userData) => {

  Chart.getChart("readiness-rmssd-chart")?.destroy()
  Chart.getChart("sns-pns-chart")?.destroy()

	console.log('UserData 10:', userData);

	const readiness = userData.readiness;
	const rmssd = userData.rmssd;
	const sns = userData.sns;
	const pns = userData.pns;
	const labels = userData.daily_result;

  const resultHeading = document.querySelector('.measurement-timespan');
  resultHeading.innerHTML = `Mittaukset ajalta ${new Date(labels[0]).toLocaleDateString("fi-FI")} - ${new Date(labels[labels.length-1]).toLocaleDateString("fi-FI")}`;

	const ctx = document.getElementById('readiness-rmssd-chart');

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'readiness',
					data: readiness,
					borderWidth: 1,
					borderColor: 'lightblue',
					backgroundColor: 'lightblue',
				},
				{
					label: 'rmssd',
					data: rmssd,
					borderWidth: 1,
					borderColor: '#0046AD',
					backgroundColor: '#0046AD',
				},
			],
		},
		options: {
      animation: {
        y: {
          duration: 550,
          easing: 'easeOutSine',
          loop: false
        }
      },
			responsive: true,
			locale: 'fi-FI',
			scales: {
				x: {
          ticks: {
            display: false
          },
					title: {
						display: false,
						text: 'Päiväys',
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'Readiness (%) / RMSSD (ms)',
					},
				},
			},
		},
	});

	const btx = document.getElementById('sns-pns-chart');

	new Chart(btx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'sns',
					data: sns,
					borderWidth: 1,
					borderColor: 'lightblue',
					backgroundColor: 'lightblue',
				},
				{
					label: 'pns',
					data: pns,
					borderWidth: 1,
					borderColor: 'orange',
					backgroundColor: 'orange',
				},
			],
		},
		options: {
      animation: {
        y: {
          duration: 550,
          easing: 'easeOutSine',
          loop: false
        }
      },
			responsive: true,
			locale: 'fi-FI',
			scales: {
				x: {
          ticks: {
            display: false
          },
					title: {
						display: false,
						text: 'Päiväys',
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'sns / pns',
					},
				},
			},
		},
	});
};

const drawChartThirty = async (userData) => {

  Chart.getChart("readiness-rmssd-chart")?.destroy()
  Chart.getChart("sns-pns-chart")?.destroy()

	console.log('UserData 30:', userData);

	const readiness = userData.readiness;
	const rmssd = userData.rmssd;
	const sns = userData.sns;
	const pns = userData.pns;
	const labels = userData.daily_result;

  const resultHeading = document.querySelector('.measurement-timespan');
  resultHeading.innerHTML = `Mittaukset ajalta ${new Date(labels[0]).toLocaleDateString("fi-FI")} - ${new Date(labels[labels.length-1]).toLocaleDateString("fi-FI")}`;

	const ctx = document.getElementById('readiness-rmssd-chart');

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'readiness',
					data: readiness,
					borderWidth: 1,
					borderColor: 'lightblue',
					backgroundColor: 'lightblue',
				},
				{
					label: 'rmssd',
					data: rmssd,
					borderWidth: 1,
					borderColor: '#0046AD',
					backgroundColor: '#0046AD',
				},
			],
		},
		options: {
      animation: {
        y: {
          duration: 550,
          easing: 'easeOutSine',
          loop: false
        }
      },
			responsive: true,
			locale: 'fi-FI',
			scales: {
				x: {
          ticks: {
            display: false
          },
					title: {
						display: false,
						text: 'Päiväys',
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'Readiness / RMSSD (ms)',
					},
				},
			},
		},
	});

	const btx = document.getElementById('sns-pns-chart');

	new Chart(btx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'sns',
					data: sns,
					borderWidth: 1,
					borderColor: 'orange',
					backgroundColor: 'orange',
				},
				{
					label: 'pns',
					data: pns,
					borderWidth: 1,
					borderColor: 'lightblue',
					backgroundColor: 'lightblue',
				},
			],
		},
		options: {
      animation: {
        y: {
          duration: 550,
          easing: 'easeOutSine',
          loop: false
        }
      },
			responsive: true,
			locale: 'fi-FI',
			scales: {
				x: {
          ticks: {
            display: false
          },
					title: {
						display: false,
						text: 'Päiväys',
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'sns / pns',
					},
				},
			},
		},
	});
};

export {drawChartTen, drawChartThirty};
