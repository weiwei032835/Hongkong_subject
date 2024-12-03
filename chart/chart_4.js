//圖表 香港來台旅客總人次變化
(function(){
	//全局字型
	Chart.defaults.global.defaultFontFamily = "Noto Sans TC";
	Chart.defaults.global.defaultFontStyle = 600;

	let myContext = document.querySelector(".chart_4 canvas").getContext("2d");
	let myChart = new Chart(myContext, {
		type: "bar", //圖表種類
		data: {
			//X軸 
			labels:["2016", "2017", "2018", "2019", "2020"], 
			//Y軸 
			datasets: [{ 
				display:true,
				label: "旅客總人次",
				data: [147.4521, 154.0765, 150.6536, 159.8223, 16.2318], //以萬為單位。先除10000
				backgroundColor:"#4dbedc",
			}],
			
		},
		options: {
			//寬RWD 高度固定
			maintainAspectRatio: false, 

			//標題
			title: {
				display: false,
				text: "香港來台旅客總人次變化",
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
						labelString: "萬人",
						fontSize:18,
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
						max: 200, //最大
						stepSize: 20, //一階5
						beginAtZero: true, //從零開始
						fontColor: "#143a51",
					}
				}]
			},

			//tooltips
			tooltips: {
				enabled: true, //啟用
				mode: "point", //交錯點顯示規則
				xAlign: "center",
				yAlign: "top",
				callbacks: {
					label: function (tooltipItems, data) {
						let idx = tooltipItems.index;
						let tmpLabel = data.labels[idx];
						let tmpVal = data.datasets[0].data[idx];
						return `${data.datasets[0].label}:${tmpVal | 0}萬人`;
					}
				}
			},

			//資料對應圖標
			legend: {
				display: false,  //是否顯示
				reverse: false, //排序相反
				position: "top", //定位
				onClick: function(){},
				onHover: function(){},
				labels: { //說明標籤
					//boxWidth: 60, //方形寬度 boxWidth usePointStyle 擇一
					usePointStyle: true, //圓形
					fontSize: 18, //會連圖標大小
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
					ctx.font = "600 15px 'Noto Sans TC'";
					this.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index){
							//ctx.fillText(文字,x,y,maxWidth);
							let tmpX = bar._model.x;
							let tmpY = bar._model.y;
							let tmpLabel = bar._model.label;
							let tmpVal = `${ (dataset.data[index] | 0) }萬人`; //萬改天個
							ctx.fillText(tmpVal, tmpX, tmpY-15);
						});
					});
				}
			}
		}
	});
})();