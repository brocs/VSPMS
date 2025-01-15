<template>
    <div class="modal fade" :id="witnessModalId" tabindex="-1" aria-labelledby="witnessModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="witnessModalLabel">Witness Report</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Breadcrumb navigation -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#" @click="goBackToIncidentReport">Incident Report</a></li>
                <li class="breadcrumb-item active" aria-current="page">Witness Report</li>
              </ol>
            </nav>
  
            <form>
              <div class="mb-3">
                <label for="witnessId" class="form-label">Witness ID</label>
                <input type="text" class="form-control" id="witnessId" v-model="witnessData.witnessId">
              </div>
              <div class="mb-3">
                <label for="witnessName" class="form-label">Witness Name</label>
                <input type="text" class="form-control" id="witnessName" v-model="witnessData.witnessName">
              </div>
              <div class="mb-3">
                <label for="witnessPhone" class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="witnessPhone" v-model="witnessData.witnessPhone">
              </div>
              <div class="mb-3">
                <label for="witnessAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="witnessAddress" v-model="witnessData.witnessAddress">
              </div>
            </form>
          </div>
  
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="goBackToIncidentReport">Back</button>
            <button type="button" class="btn btn-primary" @click="goToNextWitnessPage">Next</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'witnessModal',
    props: {
      modalId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        witnessModalId: 'witnessModal',
        witnessData: {
          witnessId: '',
          witnessName: '',
          witnessPhone: '',
          witnessAddress: ''
        }
      };
    },
    mounted() {
      const modalElement = document.getElementById(this.witnessModalId);
      this.modalInstance = new Modal(modalElement);
    },
    methods: {
      goBackToIncidentReport() {
        this.$emit('goBackToIncident'); // Emit an event to return to the incident modal
      },
      goToNextWitnessPage() {
        console.log('Proceeding to the next witness page');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles to adjust layout if necessary */
  </style>
  