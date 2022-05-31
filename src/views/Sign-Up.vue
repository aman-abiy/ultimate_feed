<template>
	<div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Register</h1>
				<h5 class="font-regular text-muted">Enter your email and password to sign up</h5>
				<span class="text-center text-danger">{{ error }}</span>
				<!-- Sign In Form -->
				<ValidationObserver v-slot="{ handleSubmit }">
					<a-form
						id="components-form-demo-normal-login"
						:form="form"
						class="login-form"
						v-on:submit.prevent="handleSubmit(signUp)"
						:hideRequiredMark="true"
					>
						<ValidationProvider name="email" rules="required" v-slot="{ errors }">
							<a-form-item class="mb-10" label="firstName" :colon="false">
								<a-input 
								v-model="firstName"
								v-decorator="[
								'firstName',
								{ rules: [{ required: true, message: 'Please input your first name!' }] },
								]" placeholder="First Name" />
							</a-form-item>
							<small class="form-text text-muted">{{ errors[0] }}</small>
                        </ValidationProvider>
						<ValidationProvider name="email" rules="required" v-slot="{ errors }">
							<a-form-item class="mb-10" label="lastName" :colon="false">
								<a-input 
								v-model="lastName"
								v-decorator="[
								'lastName',
								{ rules: [{ required: true, message: 'Please input your last name!' }] },
								]" placeholder="Last Name" />
							</a-form-item>
							<small class="form-text text-muted">{{ errors[0] }}</small>
                        </ValidationProvider>
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
						<ValidationProvider name="email" rules="required" v-slot="{ errors }">
							<a-form-item class="mb-10" label="Phone" :colon="false">
								<a-input 
								v-model="phone"
								v-decorator="[
								'phone',
								{ rules: [{ required: true, message: 'Please input your phone number!' }] },
								]" placeholder="Phone Number" />
							</a-form-item>
							<small class="form-text text-muted">{{ errors[0] }}</small>
                        </ValidationProvider>
						<ValidationProvider name="email" rules="required" v-slot="{ errors }">
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
								<span v-if="!isLoading">REGISTER</span>
							</a-button>
						</a-form-item>
					</a-form>
				</ValidationObserver>
				<!-- / Sign In Form -->

				<p class="font-semibold text-muted">Already have an account? <router-link :to="{ name: 'Sign-In' }" class="font-bold text-dark">Sign In</router-link></p>
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
import { SIGNUP } from '../store/action_types'
	export default ({
		data() {
			return {
				// Binded model property for "Sign In Form" switch button for "Remember Me" .
				rememberMe: true,
				firstName: null,
				lastName: null,
				email: null,
				phone: null,
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
			signUp() {
				const authObj = {
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					phone: this.phone,	
					password: this.password
				}
				this.$store.dispatch(SIGNUP, authObj)
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