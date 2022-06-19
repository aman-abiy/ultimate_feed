<template>

	<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<h6>Engagement Overview</h6>
			<p class="view-details-btn">View details</p>			
			<!-- <p>than last year <span class="text-success">+20%</span></p>	 -->
		</template>
		<template #extra>
			<a-badge color="primary" class="badge-dot-primary" text="Engagement" />
			<!-- <a-badge color="primary" class="badge-dot-secondary" text="Sales" /> -->
		</template>
		<chart-line :height="310" :data="lineChartData"></chart-line>
		<br>
		<br>
		<div class="card-title">
			<h6>Active Users</h6>
			<p>than last week <span class="text-success">+23%</span></p>
		</div>
		<div class="card-content">
			<p>We have created multiple options for you to put together and customise into pixel perfect pages.</p>
		</div>
		<a-row class="card-footer" type="flex" justify="center" align="top">
			<a-col :span="6">
				<h4>3,6K</h4>
				<span>Users</span>
			</a-col>
			<a-col :span="6">
				<h4>2m</h4>
				<span>Clicks</span>
			</a-col>
			<!-- <a-col :span="6">
				<h4>$772</h4>
				<span>Sales</span>
			</a-col> -->
			<a-col :span="6">
				<h4>82</h4>
				<span>Items</span>
			</a-col>
		</a-row>
	</a-card>

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartLine from '../Charts/ChartLine' ;
	import { GET_ANALYTICS } from '../../store/action_types'
	export default ({
		components: {
			ChartLine,
		},
		data() {
			return {

				// Data for line chart.
				lineChartData: {
					labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					datasets: [{
						label: "Mobile apps",
						tension: 0.4,
						borderWidth: 0,
						pointRadius: 0,
						borderColor: "#1890FF",
						borderWidth: 3,
						data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
						maxBarThickness: 6

					},
					// {
					// 	label: "Websites",
					// 	tension: 0.4,
					// 	borderWidth: 0,
					// 	pointRadius: 0,
					// 	borderColor: "#B37FEB",
					// 	borderWidth: 3,
					// 	data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
					// 	maxBarThickness: 6

					// }
					],
				},
			}
		},
		computed: {
			analytics() {
				return this.$store.getters.analytics.data
			}
		},
		methods: {
			getAnalytics() {
				this.$store.dispatch(GET_ANALYTICS, { from: this.startDate, to: this.endDate })
			},
			setValues() {
				this.lineChartData.labels = this.analytics.months
				this.lineChartData.datasets.data = this.analytics.data
			}
		},
		mounted() {
			this.getAnalytics()
			this.setValues()
		},
	})

</script>
<style scoped>
.view-details-btn {
	color: #1890FF;
	margin-top: 5px;
}

.view-details-btn:hover {
	cursor: pointer;
}
</style>