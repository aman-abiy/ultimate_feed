<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Sign In</h1>
				<h5 class="font-regular text-muted">Enter your email and password to sign in</h5>
				<!-- Sign In Form -->
				<span class="text-center text-danger">{{ error }}</span>

				<ValidationObserver v-slot="{ handleSubmit }">
					<a-form
						id="components-form-demo-normal-login"
						:form="form"
						class="login-form"
						v-on:submit.prevent="handleSubmit(login)"
						:hideRequiredMark="true">
						<ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
							<a-form-item class="mb-10" label="Email" :colon="false">
								<a-input 
								v-model="email"
								v-decorator="[
								'email',
								{ rules: [{ required: true, message: 'Please input your email!' }] },
								]" placeholder="Email" />
							</a-form-item>
							<small class="form-text text-muted">{{ errors[0] }}</small>
                        </ValidationProvider>
						<ValidationProvider name="password" rules="required" v-slot="{ errors }">
							<a-form-item class="mb-5" label="Password" :colon="false">
								<a-input 
								v-model="password"
								v-decorator="[
								'password',
								{ rules: [{ required: true, message: 'Please input your password!' }] },
								]" type="password" placeholder="Password" />
							</a-form-item>
							<small class="form-text text-muted">{{ errors[0] }}</small>
						</ValidationProvider>
						<a-form-item class="mb-10">
							<a-switch v-model="rememberMe" /> Remember Me
						</a-form-item>
						<a-form-item>
							<a-button type="primary" block html-type="submit" class="login-form-button">
								<span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								<span v-if="!isLoading">SIGN IN</span>
							</a-button>
						</a-form-item>
					</a-form>
					<!-- / Sign In Form -->
                </ValidationObserver>
				<p class="font-semibold text-muted">Don't have an account? <router-link :to="{ name: 'Sign-Up' }" class="font-bold text-dark">Sign Up</router-link></p>
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
			</a-col>
			<!-- Sign In Image Column -->

		</a-row>
		
	</div>
</template>

<script>
import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { LOGIN } from '../store/action_types'
	export default ({
		data() {
			return {
				// Binded model property for "Sign In Form" switch button for "Remember Me" .
				rememberMe: true,
				email: null,
				password: null
			}
		},
		computed: {
			isLoading() {
				return this.$store.getters.account.isLoading
			},
			account() {
				return this.$store.getters.account.data
			},
			error() {
				return this.$store.getters.errorMsg
			}
		},
		methods: {
			// // Handles input validation after submission.
			// handleSubmit(e) {
			// 	e.preventDefault();
			// 	this.form.validateFields((err, values) => {
			// 		if ( !err ) {
			// 			console.log('Received values of form: ', values) ;
			// 		}
			// 	});
			// },
			login() {
				const authObj = {
					email: this.email,
					password: this.password
				}
				this.$store.dispatch(LOGIN, authObj)
			}
		},		
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
	})

extend('email', email);

extend('required', {
  ...required,
  message: 'This field is required'
});
</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>