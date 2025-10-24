<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// Data for the form fields
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

// Data for the PrimeVue table
const submittedCards = ref([])

// Data for error messages
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  isAustralian: null,
  gender: null,
  reason: null
})

// Data for the positive feedback message
const friendMessage = ref(null);

// --- FORM LOGIC ---

const submitForm = () => {
  // Trigger validation for all fields on submit
  validateName(true);
  validatePassword(true);
  validateConfirmPassword();
  validateResident(true);
  validateGender(true);
  validateReason(true);

  // Check if there are NO errors before submitting
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.isAustralian && !errors.value.gender && !errors.value.reason) {
    submittedCards.value.push({ ...formData.value });
    clearForm();
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  };
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    isAustralian: null,
    gender: null,
    reason: null
  };
  friendMessage.value = null;
}

// --- VALIDATION FUNCTIONS ---

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match.';
  } else {
    errors.value.confirmPassword = null;
  }
};

const validateResident = (blur) => {
    if (!formData.value.isAustralian) {
        if (blur) errors.value.isAustralian = "You must confirm your residency status.";
    } else {
        errors.value.isAustralian = null;
    }
}

const validateGender = (blur) => {
    if (!formData.value.gender) {
        if (blur) errors.value.gender = "Please select a gender.";
    } else {
        errors.value.gender = null;
    }
}

const validateReason = (blur) => {
    if (formData.value.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters long.";
    } else {
        errors.value.reason = null;
    }
}

const checkReasonForFriend = () => {
  if (formData.value.reason.toLowerCase().includes('friend')) {
    friendMessage.value = 'Great to have a friend!';
  } else {
    friendMessage.value = null;
  }
};
</script>

<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1 class="text-center">Library Registration Form</h1>
      <form @submit.prevent="submitForm" novalidate>
        
        <div class="row mb-3">
            <div class="col-md-12">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" @blur="validateName(true)"
                    @input="validateName(false)" v-model="formData.username" />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-md-6">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" @blur="validatePassword(true)"
                    @input="validatePassword(false)" v-model="formData.password" />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6">
                <label for="confirm-password" class="form-label">Confirm password</label>
                <input type="password" class="form-control" id="confirm-password"
                    v-model="formData.confirmPassword" @blur="validateConfirmPassword" />
                <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            </div>
        </div>
        
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="form-check pt-2">
              <input
                type="checkbox"
                class="form-check-input"
                id="isAustralian"
                v-model="formData.isAustralian"
                @blur="validateResident(true)"
                @change="validateResident(false)"
              />
              <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
            </div>
          </div>
          <div class="col-md-6">
            <label for="gender" class="form-label">Gender</label>
            <select class="form-select" id="gender" v-model="formData.gender" @blur="validateGender(true)" @change="validateGender(false)">
              <option disabled value="">Please select one</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
          </div>
        </div>
        
        <div class="mb-3">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea
            class="form-control"
            id="reason"
            rows="3"
            v-model="formData.reason"
            @input="checkReasonForFriend"
            @blur="validateReason(true)"
          ></textarea>
          <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          <div v-if="friendMessage" class="text-success">{{ friendMessage }}</div>
        </div>
        
        <div class="text-center">
          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </form>
    </div>
  </div>

  <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-md-8 offset-md-2">
          <h4>Registered Users</h4>
          <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
              <Column field="username" header="Username"></Column>
              <Column field="password" header="Password"></Column>
              <Column field="isAustralian" header="Australian Resident">
                  <template #body="slotProps">
                      {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
                  </template>
              </Column>
              <Column field="gender" header="Gender"></Column>
              <Column field="reason" header="Reason"></Column>
          </DataTable>
      </div>
  </div>
</template>

<style scoped>
.text-danger {
  font-size: 0.875em;
  margin-top: 0.25rem;
}
.text-success {
  font-size: 0.875em;
  margin-top: 0.25rem;
  color: green;
}
</style>