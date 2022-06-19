<template>

	<!-- Layout Footer -->
	<a-layout-footer>

		<!-- Footer Navigation Menu -->
		<a-menu mode="horizontal">
			<a-menu-item>Company </a-menu-item>
			<a-menu-item>About Us</a-menu-item>
			<a-menu-item>Team </a-menu-item>
			<a-menu-item>Products</a-menu-item>
			<a-menu-item>Pricing</a-menu-item>
		</a-menu>
		<!-- / Footer Navigation Menu -->
		
		<!-- Copyright Notice -->
		<p class="copyright">
			Copyright © {{ year }} Ultimate Feed
		</p>
		<!-- / Copyright Notice -->

	</a-layout-footer>
	<!-- / Layout Footer -->

</template>

<script>

	export default ({
		data() {
			return {
				year: null
			}
		},
		methods: {
			getYear() {
				const date = new Date(Date.now())
				this.year = date.getFullYear()
			}
		},
		created() {
			this.getYear()
		}
	})

</script>

<style lang="scss" scoped>

	.nav-link svg {
		margin-right: 5px;
		vertical-align: middle;
	}
	.nav-link span {
		vertical-align: middle;
	}
	.ant-menu-submenu-popup {
		width: 100%;
	}

</style>