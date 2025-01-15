<template>
    <div>
      <!-- AdhocTaskModal -->
      <AdhocTaskModal 
        :modalId="'adhocTaskModal'" 
        @goToWitnessModal="handleGoToWitnessModal" 
      />
  
      <!-- WitnessModal -->
      <WitnessModal 
        v-if="showWitnessModal" 
        :modalId="'witnessModal'" 
        @closeWitnessModal="handleCloseWitnessModal"
      />
    </div>
  </template>
  
  <script>
  import AdhocTaskModal from '@/components/AdhocTaskModal';
  import WitnessModal from './WitnessModal';
  
  export default {
    components: {
      AdhocTaskModal,
      WitnessModal
    },
    data() {
      return {
        showWitnessModal: false // Controls the visibility of the WitnessModal
      };
    },
    methods: {
      // Handle the event emitted from AdhocTaskModal to show the WitnessModal
      handleGoToWitnessModal() {
        this.showWitnessModal = true;
      },
  
      // Close the WitnessModal
      handleCloseWitnessModal() {
        this.showWitnessModal = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  </style>
  