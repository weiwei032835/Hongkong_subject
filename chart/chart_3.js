//圖表 台灣是否應該保護和歡迎香港人來台
(function(){
	//全局字型
	Chart.defaults.global.defaultFontFamily = "Noto Sans TC";
	Chart.defaults.global.defaultFontStyle = 600;

	let myContext = document.querySelector(".chart_3 canvas").getContext("2d");
	let myChart = new Chart(myContext, {
		type: "pie", //圖表種類
		data: {
			labels: ["還算贊成", "不太贊成", "一點也不贊成", "非常贊成",  "沒意見",  "其他"], //項目 
			datasets: [{ //數據 資料 
				data: [32.4, 28.1, 22.4, 9.1,  4.6,  3.4],
				backgroundColor: ["#f8cd64", "#97dbf2", "#67c17b", "#ff6e5f",  "#b3b3b3",   "#ff99ff"],
			}]
		},
		options: {
			maintainAspectRatio: false, //寬RWD 高度固定

			//標題
			title: {
				display: false,
				text: "台灣是否應該保護和歡迎香港人來台",
				fontSize: 30,
			}, 

			 //資料對應圖標
			legend: {
				display: false,  //是否顯示
				reverse: true, //排序相反
				position: "bottom", //定位
				onClick: function(){},
				onHover: function(){},
				labels: { //說明標籤
					//boxWidth: 60, //方形寬度 boxWidth usePointStyle 擇一
					usePointStyle: true, //圓形
					fontSize: 18, //會連圖標大小
					fontColor: "deeppink",
					padding: 20,
				}
			},

			tooltips: {
				enabled: true,
				mode: "point",
				callbacks: {
					label: function (tooltipItems, data) {
						let idx = tooltipItems.index;
						let tmpLabel = data.labels[idx];
						let tmpVal = data.datasets[0].data[idx];
						return `${tmpLabel} ${tmpVal}%`;
					}
				}
			},

			animation: {
				onComplete: function () {
					var chartInstance = this.chart;
					var ctx = chartInstance.ctx;
					
					ctx.textAlign = "center";
					ctx.fillStyle = "#143a51";
					ctx.font = "15px 'Noto Sans TC'";

					this.data.datasets.forEach(function (dataset, i) {
						var meta = chartInstance.controller.getDatasetMeta(i);
						meta.data.forEach(function (bar, index) {
							let tmpX = bar.tooltipPosition().x; //取tooltip座標
							let tmpY = bar.tooltipPosition().y;
							let tmpLabel = bar._model.label;
							let tmpVal = dataset.data[index];
							
							//手動對位
							switch (index) {
								case 0:
									ctx.fillText(`${tmpVal}%`, tmpX+10, tmpY+15);
									ctx.fillText(tmpLabel, tmpX+20, tmpY+30);
									break;
								case 1:
									ctx.fillText(`${tmpVal}%`, tmpX+10, tmpY+15);
									ctx.fillText(tmpLabel, tmpX+10, tmpY+30);
									break;
								case 2:
									ctx.fillText(`${tmpVal}%`, tmpX-20, tmpY+5);
									ctx.fillText(tmpLabel, tmpX-20, tmpY+20);
									break;
								case 3:
									ctx.fillText(`${tmpVal}%`, tmpX-30, tmpY-40);
									ctx.fillText(tmpLabel, tmpX-30, tmpY-25);
									break;
								case 4:
									ctx.fillText(`${tmpVal}%`, tmpX-25, tmpY-60);
									ctx.fillText(tmpLabel, tmpX-25, tmpY-45);
									break;
								case 5:
									ctx.fillText(`${tmpVal}%`, tmpX-10, tmpY-80);
									ctx.fillText(tmpLabel, tmpX-10, tmpY-65);
									break;
								default:
									break;
							}
						});
					});
				}
			}
		}
	});
})();