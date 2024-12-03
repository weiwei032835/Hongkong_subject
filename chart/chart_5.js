//圖表 香港居民來台居留、定居人數統計表
(function(){
	//全局字型
	Chart.defaults.global.defaultFontFamily = "Noto Sans TC";
	Chart.defaults.global.defaultFontStyle = 600;

	let myContext = document.querySelector(".chart_5 canvas").getContext("2d");
	let myChart = new Chart(myContext, {
		type: 'horizontalBar', //圖表種類
		//type: "bar", //圖表種類
		data: {
			//X軸 
			labels:["2016", "2017", "2018", "2019", "2020", ["2021", "上半"]], 
			//Y軸 
			datasets: [
				{ 
					display:true,
					label: "居留許可",
					data: [4057, 4015, 4148, 5858, 10813, 4697],
					backgroundColor:"#fab43a",
				},
				{ 
					display:true,
					label: "定居許可",
					data: [1086, 1074, 1090, 1474, 1576, 920],
					backgroundColor:"#4dbedc",
				},
			],
			
		},
		options: {
			//寬RWD 高度固定
			maintainAspectRatio: false, 

			//indexAxis :"y",

			//標題
			title: {
				display: false,
				text: "香港人淨移出",
				fontSize: 30,
				fontColor:"#143a51",
			}, 
			
			//軸設定
			scales: {
				//x軸
				xAxes: [{
					//軸標題
					scaleLabel: {
						display: false,
						labelString: "年分",
						fontSize: 18,
						fontColor: "#f00",
					},
					//數值間距
					ticks: {
						display: true,
						fontColor: "#143a51",
					},
					//格線
					gridLines: {
						display: false,
						color: "#000",
					},
				}],

				//y軸
				yAxes: [{
					//軸標題
					scaleLabel: {
						display: true,
						labelString: "人數",
						fontSize:15,
						fontColor:"#143a51",
					},
					//格線
					gridLines: {
						display: true,
						color: "#999",
					},
					//數值間距
					ticks: {
						display: true,
						min: 0, //最小
						max: 12000, //最大
						stepSize: 2000, //一階5
						beginAtZero: true, //從零開始
						fontColor: "#143a51",
					}
				}]
			},

			//tooltips
			tooltips: {
				enabled: true, //啟用
				mode: "point", //交錯點顯示規則
				xAlign: "left",
				yAlign: "top",
				callbacks: {
					label: function (tooltipItems, data) {
						let datasetIdx = tooltipItems.datasetIndex;
						let idx = tooltipItems.index;
						let tmpLabelX = tooltipItems.xLabel;
						let tmpLabel = data.datasets[datasetIdx].label;
						let tmpVal = data.datasets[datasetIdx].data[idx];
						return `${tmpLabel}: ${tmpVal}人`;
					}
				}
			},

			//tooltips
			tooltips: {
				enabled: true, //啟用
				mode: "point", //交錯點顯示規則
				xAlign: "center",
				yAlign: "top",
			},

			//資料對應圖標
			legend: {
				display: true,  //是否顯示
				reverse: false, //排序相反
				position: "bottom", //定位
				onClick: function(){},
				onHover: function(){},
				labels: { //說明標籤
					//boxWidth: 60, //方形寬度 boxWidth usePointStyle 擇一
					usePointStyle: true, //圓形
					//fontSize: 18, //會連圖標大小
					fontColor:"#143a51",
					padding: 20,
				}
			},

			animation: {
				onComplete: function () {
					var chartInstance = this.chart;
					var ctx = chartInstance.ctx;
					var height = chartInstance.controller.boxes[0].top;
					ctx.textAlign = "center";
					ctx.fillStyle = "#143a51";
					ctx.font = "600 12px 'Noto Sans TC'";
					this.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index){
							//ctx.fillText(文字,x,y,maxWidth);
							let tmpX = bar._model.x;
							let tmpY = bar._model.y;
							let tmpLabel = bar._model.label;
							let tmpVal = `${dataset.data[index]}人`;
							//tmpVal = tmpVal<10000 ? `${tmpVal/1000}千` : `${tmpVal/10000}萬`;
							ctx.fillText(tmpVal, tmpX+20, tmpY);
						});
					});
				}
			}
		}

	});

})();