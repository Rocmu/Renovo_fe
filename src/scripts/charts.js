import Chart from 'chart.js/auto';
//import 'chartjs-adapter-date-fns';

const drawChartTen = async (userData) => {

  Chart.getChart("readiness-rmssd-chart")?.destroy()
  Chart.getChart("sns-pns-chart")?.destroy()
  Chart.getChart("bpm-chart")?.destroy()
  Chart.getChart("age-chart")?.destroy()

	console.log('UserData 10:', userData);

	const readiness = userData.readiness;
	const rmssd = userData.rmssd;
	const sns = userData.sns;
	const pns = userData.pns;
  const age = userData.phy_age;
  const bpm = userData.bpm
	const labels = userData.daily_result;

  const resultHeading = document.querySelector('.measurement-timespan');
  resultHeading.innerHTML = `Mittaukset ajalta ${labels[0]} - ${labels[labels.length-1]}`;

  const resultHeading2 = document.querySelector('.measurement-timespan-2');
  resultHeading2.innerHTML = `Mittaukset ajalta ${labels[0]} - ${labels[labels.length-1]}`;

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
					borderWidth: 2,
					borderColor: 'lightblue',
					backgroundColor: 'lightblue',
				},
				{
					label: 'pns',
					data: pns,
					borderWidth: 2,
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

  const dtx = document.getElementById('bpm-chart');

	new Chart(dtx, {
		data: {
			labels: labels,
			datasets: [
				{
          type: 'bar',
					label: 'Pulssi',
					data: bpm,
					borderWidth: 2,
					borderColor: '#C66AB5',
					backgroundColor: '#C66AB5',
				}
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
						text: 'Pulssi',
					},
				},
			},
		},
	});

  const etx = document.getElementById('age-chart');

	new Chart(etx, {
		data: {
			labels: labels,
			datasets: [
				{
          type: 'bar',
					label: 'Ikä',
					data: age,
					borderWidth: 2,
					borderColor: '#999999',
					backgroundColor: '#999999',
				}
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
						text: 'Fysiologinen ikä (vuosi)',
					},
				},
			},
		},
	});

};

const drawChartThirty = async (userData) => {

  Chart.getChart("readiness-rmssd-chart")?.destroy()
  Chart.getChart("sns-pns-chart")?.destroy()
  Chart.getChart("bpm-chart")?.destroy()
  Chart.getChart("age-chart")?.destroy()

	console.log('UserData 30:', userData);

	const readiness = userData.readiness;
	const rmssd = userData.rmssd;
	const sns = userData.sns;
	const pns = userData.pns;
  const age = userData.phy_age;
  const bpm = userData.bpm
	const labels = userData.daily_result;

  const resultHeading = document.querySelector('.measurement-timespan');
  resultHeading.innerHTML = `Mittaukset ajalta ${labels[0]} - ${labels[labels.length-1]}`;

  const resultHeading2 = document.querySelector('.measurement-timespan-2');
  resultHeading2.innerHTML = `Mittaukset ajalta ${labels[0]} - ${labels[labels.length-1]}`;

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
					borderWidth: 2,
					borderColor: 'orange',
					backgroundColor: 'orange',
				},
				{
					label: 'pns',
					data: pns,
					borderWidth: 2,
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

  const dtx = document.getElementById('bpm-chart');

	new Chart(dtx, {
		data: {
			labels: labels,
			datasets: [
				{
          type: 'bar',
					label: 'Pulssi',
					data: bpm,
					borderWidth: 2,
					borderColor: '#C66AB5',
					backgroundColor: '#C66AB5',
				}
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
						text: 'Pulssi',
					},
				},
			},
		},
	});

  const etx = document.getElementById('age-chart');

	new Chart(etx, {
		data: {
			labels: labels,
			datasets: [
				{
          type: 'bar',
					label: 'Ikä',
					data: age,
					borderWidth: 2,
					borderColor: '#999999',
					backgroundColor: '#999999',
				}
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
						text: 'Fysiologinen ikä (vuosi)',
					},
				},
			},
		},
	});
};

export {drawChartTen, drawChartThirty};
