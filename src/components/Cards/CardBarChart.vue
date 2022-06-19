<template>

	<!-- Active Users Card -->
	<a-card :bordered="false" class="dashboard-bar-chart">
		<div class="row date-filter">
			<div class="col-5">
				<label for="startDate">Start Date: </label>
				<input v-model="startDate" class="datePicker" type="date" name="startDate" id="startDate">
			</div>
			<div class="col-5">
				<label for="endDate">End Date: </label>
				<input v-model="endDate" class="datePicker" type="date" name="endDate" id="endDate">
			</div>
			<div class="col-2">
				<button v-on:click="filter" class="btn filter-btn"><strong>Filter</strong></button>
			</div>
		</div>
		<hr>
		<div class="card-title">
			<h6>Impression</h6>
			<p>than last week <span class="text-success">+23%</span></p>
		</div>
		<chart-bar :height="220" :data="barChartData"></chart-bar>
		<div class="card-title">
			<h6>Activities</h6>
			<p>than last week <span class="text-success">+23%</span></p>
		</div>
		<chart-bar :height="220" :data="barChartData"></chart-bar>
	</a-card>
	<!-- Active Users Card -->

</template>

<script>

	// Bar chart for "Active Users" card.
	import ChartBar from '../Charts/ChartBar' ;
	import { GET_ANALYTICS } from '../../store/action_types'

	export default ({
		components: {
			ChartBar,
		},
		data() {
			return {
				// Data for bar chart.
				barChartData: {
					labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
					datasets: [{
						label: "Sales",
						backgroundColor: '#fff',
						borderWidth: 0,
						borderSkipped: false,
						borderRadius: 6,
						data: [850, 600, 500, 620, 900, 500, 900, 630, 900],
						maxBarThickness: 20,
					}, ],
				},
				startDate: null,
				endDate: null
			}
		},
		computed: {
			analytics() {
				return this.$store.getters.analytics.data
			}
		},
		methods: {
			getAnalytics() {
				this.$store.dispatch(GET_ANALYTICS)
			},
			filter() {

			}
		}
	})

</script>
<style scoped>
.date-filter .col {
        margin: 0px;
        padding: 0px;
    }
    
.date-filter label {
	font-size: 14px;
	color: #6c757d;
	padding: 0px;
	margin: 0px;
	margin-right: 5px;
}

.datePicker {
	padding: 1px 5px 1px 5px;
	border-radius: 5px;
	box-shadow: none !important;
	border: 1px solid rgb(68, 68, 68);
	background-color: #EDF6FC;
	border-color: #E1EEFB;
	color: #6c757d;
}

.datePicker:hover {
	background-color: #eff2f4;
}

.datePicker:focus {
	border: none !important;
	box-shadow: none !important;
	border: 2px solid grey;
}

.datePicker:active {
	border: none !important;
	box-shadow: none !important;
	border: 2px solid grey;
}

.filter-btn {
	background-color: #EDF6FC;
	border-color: #E1EEFB;
	color: #1890FF;
	height: 30px;
	font-size: 15px;
	padding: 3px 10px 3px 10px;
}
</style>