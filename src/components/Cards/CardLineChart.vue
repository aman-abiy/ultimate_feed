<template>

	<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<h6>Engagement Overview</h6>			
			<!-- <p>than last year <span class="text-success">+20%</span></p>	 -->
		</template>
		<template #extra>
			<a-badge color="primary" class="badge-dot-primary" text="Engagement" />
			<!-- <a-badge color="primary" class="badge-dot-secondary" text="Sales" /> -->
		</template>
		<chart-line :height="310" :data="lineChartData"></chart-line>
	</a-card>

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartLine from '../Charts/ChartLine' ;
	import { GET_ENGAGEMENT } from '../../store/action_types'
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
			engagements() {
				return this.$store.getters.engagement
			}
		},
		methods: {
			getEngagement() {
				this.$store.dispatch(GET_ENGAGEMENT)
			},
			setValues() {
				this.lineChartData.labels = this.engagements.months
				this.lineChartData.datasets.data = this.engagements.data
			}
		},
		mounted() {
			this.getEngagement()
			this.setValues()
		},
	})

</script>