<template>
    <div class="sign-in">
		
		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Reset Password</h1>
				<h5 class="font-regular text-muted">Enter your new password to change your password</h5>
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
							<a-form-item class="mb-10" label="New Password" :colon="false">
								<a-input 
								v-model="email"
								v-decorator="[
								'password',
								{ rules: [{ required: true, message: 'Please input new password!' }] },
								]" placeholder="" />
							</a-form-item>
							<small class="form-text text-muted">{{ errors[0] }}</small>
                        </ValidationProvider>
						<ValidationProvider name="password" rules="required" v-slot="{ errors }">
							<a-form-item class="mb-5" label="Confirm Password" :colon="false">
								<a-input 
								v-model="password"
								v-decorator="[
								'password',
								{ rules: [{ required: true, message: 'Please confirm new password!' }] },
								]" type="password" placeholder="" />
							</a-form-item>
							<small class="form-text text-muted">{{ errors[0] }}</small>
						</ValidationProvider>
						<a-form-item>
							<a-button type="primary" block html-type="submit" class="login-form-button">
								<span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								<span v-if="!isLoading">Reset</span>
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