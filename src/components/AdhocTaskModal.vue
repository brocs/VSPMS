<template>
  <div class="modal fade" :id="adhocTaskModalId" tabindex="-1" aria-labelledby="adhocTaskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="adhocTaskModalLabel">
            {{
            currentStep === 'incident' ? 'Incident Report' :
            currentStep === 'witness' ? 'Witness' :
            currentStep === 'ppe' ? 'PPE' :
            currentStep === 'cause' ? 'Cause' :
            currentStep === 'firstAid' ? 'First Aid' :
            currentStep === 'victim' ? 'Victim' :
            currentStep === 'victimHistory' ? 'Victim History' :
            currentStep === 'rescuer' ? 'Rescuer' :
            currentStep === 'primarySurvey' ? 'Primary Survey' :
            currentStep === 'secondarySurvey' ? 'Secondary Survey' :
            'Head to Toe Exam'
            }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Breadcrumb navigation -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item" :class="{ active: currentStep === 'incident' }" v-if="currentStep !== 'incident'">Incident Report</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'witness' }" v-if="currentStep === 'witness'">Witness</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'ppe' }" v-if="currentStep === 'ppe'">PPE</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'cause' }" v-if="currentStep === 'cause'">Cause</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'firstAid' }" v-if="currentStep === 'firstAid'">First Aid</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'victim' }" v-if="currentStep === 'victim'">Victim</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'victimHistory' }" v-if="currentStep === 'victimHistory'">Victim History</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'rescuer' }" v-if="currentStep === 'rescuer'">Rescuer</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'primarySurvey' }" v-if="currentStep === 'primarySurvey'">Primary Survey</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'secondarySurvey' }" v-if="currentStep === 'secondarySurvey'">Secondary Survey</li>
              <li class="breadcrumb-item" :class="{ active: currentStep === 'headToeExam' }" v-if="currentStep === 'headToeExam'">Head to Toe Exam</li>
            </ol>
          </nav>

          <!-- Forms based on the current step -->
          <form v-if="currentStep === 'incident'">
            <div class="row">
              <!-- Left side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="incidentId" class="form-label">Incident ID</label>
                  <input type="text" class="form-control" id="incidentId" v-model="taskData.incidentId">
                </div>
                <div class="mb-3">
                  <label for="ppeId" class="form-label">PPE ID</label>
                  <input type="text" class="form-control" id="ppeId" v-model="taskData.ppeId">
                </div>
                <div class="mb-3">
                  <label for="incidentType" class="form-label">Incident Type</label>
                  <input type="text" class="form-control" id="incidentType" v-model="taskData.incidentType">
                </div>
                <div class="mb-3">
                  <label for="incidentDate" class="form-label">Incident Date</label>
                  <input type="date" class="form-control" id="incidentDate" v-model="taskData.incidentDate">
                </div>
                <div class="mb-3">
                  <label for="incidentReportDate" class="form-label">Incident Report Date</label>
                  <input type="date" class="form-control" id="incidentReportDate" v-model="taskData.incidentReportDate">
                </div>
                <div class="mb-3">
                  <label for="incidentLocation" class="form-label">Incident Location</label>
                  <input type="text" class="form-control" id="incidentLocation" v-model="taskData.incidentLocation">
                </div>
              </div>

              <!-- Right side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="employeeId" class="form-label">Employee ID / Name</label>
                  <input type="text" class="form-control" id="employeeId" v-model="taskData.employeeId" disabled>
                </div>
                <div class="mb-3">
                  <label for="causeId" class="form-label">Cause ID</label>
                  <input type="text" class="form-control" id="causeId" v-model="taskData.causeId">
                </div>
                <div class="mb-3">
                  <label for="incidentTime" class="form-label">Incident Time</label>
                  <input type="time" class="form-control" id="incidentTime" v-model="taskData.incidentTime">
                </div>
                <div class="mb-3">
                  <label for="incidentReportTime" class="form-label">Incident Report Time</label>
                  <input type="time" class="form-control" id="incidentReportTime" v-model="taskData.incidentReportTime">
                </div>
                <div class="mb-3">
                  <label for="incidentInvolve" class="form-label">Incident Involve</label>
                  <input type="text" class="form-control" id="incidentInvolve" v-model="taskData.incidentInvolve">
                </div>
              </div>
            </div>

            <!-- Below the two columns -->
            <div class="mb-3">
              <label for="incidentDescription" class="form-label">Incident Description</label>
              <textarea class="form-control" id="incidentDescription" v-model="taskData.incidentDescription"></textarea>
            </div>
          </form>

          <form v-if="currentStep === 'witness'">
            <div class="mb-3">
              <label for="witnessId" class="form-label">Witness ID</label>
              <input type="text" class="form-control" id="witnessId" v-model="witnessData.witnessId">
            </div>
            <div class="mb-3">
              <label for="witnessName" class="form-label">Witness Name</label>
              <input type="text" class="form-control" id="witnessName" v-model="witnessData.witnessName">
            </div>
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input type="text" class="form-control" id="phoneNumber" v-model="witnessData.phoneNumber">
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" v-model="witnessData.address">
            </div>
          </form>

          <form v-if="currentStep === 'ppe'">
            <div class="mb-3">
              <label for="ppeId" class="form-label">PPE ID</label>
              <input type="text" class="form-control" id="ppeId" v-model="ppeData.ppeId">
            </div>
            <div class="mb-3">
              <label for="shouldWorn" class="form-label">Should Worn</label>
              <input type="text" class="form-control" id="shouldWorn" v-model="ppeData.shouldWorn">
            </div>
            <div class="mb-3">
              <label for="wasWorn" class="form-label">Was Worn</label>
              <input type="text" class="form-control" id="wasWorn" v-model="ppeData.wasWorn">
            </div>
          </form>

          <form v-if="currentStep === 'cause'">
            <div class="mb-3">
              <label for="causeId" class="form-label">Cause ID</label>
              <input type="text" class="form-control" id="causeId" v-model="causeData.causeId">
            </div>
            <div class="mb-3">
              <label for="causeDescription" class="form-label">Cause Description</label>
              <input type="text" class="form-control" id="causeDescription" v-model="causeData.causeDescription">
            </div>
            <div class="mb-3">
              <label for="condition" class="form-label">Condition</label>
              <input type="text" class="form-control" id="condition" v-model="causeData.condition">
            </div>
          </form>

          <form v-if="currentStep === 'firstAid'">
            <div class="row">
              <!-- Left side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="aidId" class="form-label">AID ID</label>
                  <input type="text" class="form-control" id="aidId" v-model="firstAidData.aidId">
                </div>
                <div class="mb-3">
                  <label for="victimId" class="form-label">Victim ID</label>
                  <input type="text" class="form-control" id="victimId" v-model="firstAidData.victimId">
                </div>
                <div class="mb-3">
                  <label for="examId" class="form-label">Exam ID</label>
                  <input type="text" class="form-control" id="examId" v-model="firstAidData.examId">
                </div>
                <div class="mb-3">
                  <label for="historyId" class="form-label">History ID</label>
                  <input type="text" class="form-control" id="historyId" v-model="firstAidData.historyId">
                </div>
                <div class="mb-3">
                  <label for="aidDate" class="form-label">Aid Date</label>
                  <input type="date" class="form-control" id="aidDate" v-model="firstAidData.aidDate">
                </div>
              </div>

              <!-- Right side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="rescuerId" class="form-label">Rescuer ID / Name</label>
                  <input type="text" class="form-control" id="rescuerId" v-model="firstAidData.rescuerId">
                </div>
                <div class="mb-3">
                  <label for="primarySurveyId" class="form-label">Primary Survey ID</label>
                  <input type="text" class="form-control" id="primarySurveyId" v-model="firstAidData.primarySurveyId">
                </div>
                <div class="mb-3">
                  <label for="secondarySurveyId" class="form-label">Secondary Survey ID</label>
                  <input type="text" class="form-control" id="secondarySurveyId" v-model="firstAidData.secondarySurveyId">
                </div>
                <div class="mb-3">
                  <label for="witnessId" class="form-label">Witness ID</label>
                  <input type="text" class="form-control" id="witnessId" v-model="firstAidData.witnessId">
                </div>
                <div class="mb-3">
                  <label for="aidTime" class="form-label">Aid Time</label>
                  <input type="time" class="form-control" id="aidTime" v-model="firstAidData.aidTime">
                </div>
              </div>
            </div>

            <!-- Below the two columns -->
            <div class="mb-3">
              <label for="aidDescription" class="form-label">Aid Description</label>
              <textarea class="form-control" id="aidDescription" v-model="firstAidData.aidDescription"></textarea>
            </div>
          </form>

          <form v-if="currentStep === 'victim'">
            <div class="row">
              <!-- Left side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="victimId" class="form-label">Victim ID</label>
                  <input type="text" class="form-control" id="victimId" v-model="victimData.victimId">
                </div>
                <div class="mb-3">
                  <label for="victimName" class="form-label">Victim Name</label>
                  <input type="text" class="form-control" id="victimName" v-model="victimData.victimName">
                </div>
                <div class="mb-3">
                  <label for="victimGender" class="form-label">Victim Gender</label>
                  <input type="text" class="form-control" id="victimGender" v-model="victimData.victimGender">
                </div>
                <div class="mb-3">
                  <label for="victimAddress" class="form-label">Victim Address</label>
                  <input type="date" class="form-control" id="victimAddress" v-model="victimData.victimAddress">
                </div>
              </div>

              <!-- Right side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="victimAge" class="form-label">Victim Age</label>
                  <input type="text" class="form-control" id="victimAge" v-model="victimData.victimAge">
                </div>
                <div class="mb-3">
                  <label for="victimPhoneNum" class="form-label">Victim Phone Number</label>
                  <input type="text" class="form-control" id="victimPhoneNum" v-model="victimData.victimPhoneNum">
                </div>
                <div class="mb-3">
                  <label for="victimPGName" class="form-label">Victim Parent/Guardian Name</label>
                  <input type="time" class="form-control" id="victimPGName" v-model="victimData.victimPGName">
                </div>
                
              </div>
            </div>

            <!-- Below the two columns -->
            
          </form>

          <form v-if="currentStep === 'victimHistory'">
            <div class="mb-3">
              <label for="historyId" class="form-label">History ID</label>
              <input type="text" class="form-control" id="historyId" v-model="victimHistoryData.historyId">
            </div>
            <div class="mb-3">
              <label for="historyMedication" class="form-label">History Medication</label>
              <input type="text" class="form-control" id="historyMedication" v-model="victimHistoryData.historyMedication">
            </div>
            <div class="mb-3">
              <label for="historyMedicDescription" class="form-label">Medication Description</label>
              <input type="text" class="form-control" id="historyMedicDescription" v-model="victimHistoryData.historyMedicDescription">
            </div>
          </form>

          <form v-if="currentStep === 'rescuer'">
            <div class="mb-3">
              <label for="rescuerId" class="form-label">Rescuer ID</label>
              <input type="text" class="form-control" id="rescuerId" v-model="rescuerData.rescuerId">
            </div>
            <div class="mb-3">
              <label for="rescuerName" class="form-label">Rescuer Name</label>
              <input type="text" class="form-control" id="rescuerName" v-model="rescuerData.rescuerName">
            </div>
            <div class="mb-3">
              <label for="rescuerAddress" class="form-label">Rescuer Address</label>
              <input type="text" class="form-control" id="rescuerAddress" v-model="rescuerData.rescuerAddress">
            </div>
            <div class="mb-3">
              <label for="rescuerPhoneNum" class="form-label">Rescuer Phone Number</label>
              <input type="text" class="form-control" id="rescuerPhoneNum" v-model="rescuerData.rescuerPhoneNum">
            </div>
          </form>

          <form v-if="currentStep === 'primarySurvey'">
            <div class="row">
              <!-- Left side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="psId" class="form-label">Primary Survey ID</label>
                  <input type="text" class="form-control" id="psId" v-model="psData.psId">
                </div>
                <div class="mb-3">
                  <label for="psTime" class="form-label">Primary Survey Time</label>
                  <input type="time" class="form-control" id="psTime" v-model="psData.psTime">
                </div>

                <div class="mb-3">
                  <label for="psSpinalInjury" class="form-label">Spinal Injury?</label>
                  <div class="btn-group" role="group" aria-label="Spinal Injury">
                    <button 
                      type="button" 
                      class="btn" 
                      :class="psData.psSpinalInjury === 'yes' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="psData.psSpinalInjury = 'yes'">
                      Yes
                    </button>
                    <button 
                      type="button" 
                      class="btn" 
                      :class="psData.psSpinalInjury === 'no' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="psData.psSpinalInjury = 'no'">
                      No
                    </button>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="psTreatShock" class="form-label">Treat for Shock?</label>
                  <div class="btn-group" role="group" aria-label="Treat for Shock">
                    <button 
                      type="button" 
                      class="btn" 
                      :class="psData.psTreatShock === 'yes' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="psData.psTreatShock = 'yes'">
                      Yes
                    </button>
                    <button 
                      type="button" 
                      class="btn" 
                      :class="psData.psTreatShock === 'no' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="psData.psTreatShock = 'no'">
                      No
                    </button>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="psEMS" class="form-label">Activate EMS?</label>
                  <div class="btn-group" role="group" aria-label="Activate EMS">
                    <button 
                      type="button" 
                      class="btn" 
                      :class="psData.psEMS === 'yes' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="psData.psEMS = 'yes'">
                      Yes
                    </button>
                    <button 
                      type="button" 
                      class="btn" 
                      :class="psData.psEMS === 'no' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="psData.psEMS = 'no'">
                      No
                    </button>
                  </div>
                </div>

                

                
              </div>

              <!-- Right side -->
              <div class="col-md-6">

                <!-- Level of Consciousness -->
                <div class="mb-3 position-relative">
                  <label for="psLOC" class="form-label">Level of Consciousness</label>
                  <div class="position-relative">
                    <select class="form-select" id="psLOC" v-model="psData.psLOC" aria-label="Level of Consciousness">
                      <option value="" disabled>Select consciousness level</option>
                      <option value="alert">Alert</option>
                      <option value="drowsy">Drowsy</option>
                      <option value="unconscious">Unconscious</option>
                    </select>
                    
                  </div>
                </div>

                <!-- Assessment of Breathing -->
                <div class="mb-3 position-relative">
                  <label for="psBreathing" class="form-label">Assessment of Breathing</label>
                  <div class="position-relative">
                    <select class="form-select" id="psBreathing" v-model="psData.psBreathing" aria-label="Assessment of Breathing">
                      <option value="" disabled>Select breathing assessment</option>
                      <option value="normal">Normal</option>
                      <option value="labored">Labored</option>
                      <option value="absent">Absent</option>
                    </select>
                    
                  </div>
                </div>

                <!-- Assessment of Circulation -->
                <div class="mb-3 position-relative">
                  <label for="psCirculation" class="form-label">Assessment of Circulation</label>
                  <div class="position-relative">
                    <select class="form-select" id="psCirculation" v-model="psData.psCirculation" aria-label="Assessment of Circulation">
                      <option value="" disabled>Select circulation assessment</option>
                      <option value="pulsepresent">Pulse Present</option>
                      <option value="absent">Absent</option>
                    </select>
                    
                  </div>
                </div>
              </div>
            </div>
          </form>

          <form v-if="currentStep === 'secondarySurvey'">
            <div class="row">
              <!-- Left side -->
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="ssId" class="form-label">Secondary Survey ID</label>
                  <input type="text" class="form-control" id="ssId" v-model="ssData.ssId">
                </div>

                

                <div class="mb-3">
                  <label for="ssBreathingRate" class="form-label">Breathing Rate</label>
                  <input type="text" class="form-control" id="ssBreathingRate" v-model="ssData.ssBreathingRate">
                </div>

                <div class="mb-3 position-relative">
                  <label for="ssBreathingRhythm" class="form-label">Breathing Rhythm</label>
                  <div class="position-relative">
                    <select class="form-select" id="ssBreathingRhythm" v-model="ssData.ssBreathingRhythm" aria-label="Breathing Rhythm">
                      <option value="" disabled>Select breathing rhythm</option>
                      <option value="regular">Regular Pulse</option>
                      <option value="irregular">Irregular Pulse</option>
                
                    </select>
                    
                  </div>
                </div>

                <div class="mb-3">
                  <label for="ssBreathingDepth" class="form-label">Breathing Depth</label>
                  <input type="text" class="form-control" id="ssBreathingDepth" v-model="ssData.ssBreathingDepth">
                </div>

                <div class="mb-3">
                  <label for="ssPulseRate" class="form-label">Pulse Rate</label>
                  <input type="text" class="form-control" id="ssPulseRate" v-model="ssData.ssPulseRate">
                </div>

                <div class="mb-3 position-relative">
                  <label for="ssPulseRhythm" class="form-label">Pulse Rhythm</label>
                  <div class="position-relative">
                    <select class="form-select" id="ssPulseRhythm" v-model="ssData.ssPulseRhythm" aria-label="Pulse Rhythm">
                      <option value="" disabled>Select pulse rhythm</option>
                      <option value="regular">Regular Pulse</option>
                      <option value="arrhythmic">Arrhythmic Pulse</option>
                
                    </select>
                    
                  </div>
                </div>

                <div class="mb-3">
                  <label for="ssPulseDepth" class="form-label">Pulse Depth</label>
                  <input type="text" class="form-control" id="ssPulseDepth" v-model="ssData.ssPulseDepth">
                </div>

              
                
              </div>

              <!-- Right side -->
              
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="victimName" class="form-label">Secondary Survey Time</label>
                  <input type="time" class="form-control" id="victimName" v-model="ssData.ssTime">
                </div>
                <div class="mb-3 position-relative">
                  <label for="ssLOC" class="form-label">Level of Consciousness</label>
                  <div class="position-relative">
                    <select class="form-select" id="ssLOC" v-model="ssData.ssLOC" aria-label="Level of Consciousness">
                      <option value="" disabled>Select consciousness level</option>
                      <option value="alert">Alert</option>
                      <option value="drowsy">Drowsy</option>
                      <option value="unconscious">Unconscious</option>
                    </select>
                    
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="ssPupilEqual" class="form-label">Pupil Equal?</label>
                  <div class="btn-group" role="group" aria-label="Pupil Equal">
                    <button 
                      type="button" 
                      class="btn" 
                      :class="ssData.ssPupilEqual === 'yes' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="ssData.ssPupilEqual = 'yes'">
                      Yes
                    </button>
                    <button 
                      type="button" 
                      class="btn" 
                      :class="ssData.ssPupilEqual === 'no' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="ssData.ssPupilEqual = 'no'">
                      No
                    </button>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="ssPupilReactsLight" class="form-label">Pupil Reacts to Light?</label>
                  <div class="btn-group" role="group" aria-label="Pupil Reacts to Light">
                    <button 
                      type="button" 
                      class="btn" 
                      :class="ssData.ssPupilReactsLight === 'yes' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="ssData.ssPupilReactsLight = 'yes'">
                      Yes
                    </button>
                    <button 
                      type="button" 
                      class="btn" 
                      :class="ssData.ssPupilReactsLight === 'no' ? 'btn-primary' : 'btn-outline-primary'" 
                      @click="ssData.ssPupilReactsLight = 'no'">
                      No
                    </button>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="ssPupilRSize" class="form-label">Pupil Right Size</label>
                  <input type="text" class="form-control" id="ssPupilRSize" v-model="ssData.ssPupilRSize">
                </div>
                <div class="mb-3">
                  <label for="ssPupilLSize" class="form-label">Pupil left Size</label>
                  <input type="text" class="form-control" id="ssPupilLSize" v-model="ssData.ssPupilLSize">
                </div>
                
                <div class="mb-3">
                  <label for="ssSequence" class="form-label">Sequence</label>
                  <input type="text" class="form-control" id="ssSequence" v-model="ssData.ssSequence">
                </div>
                
              </div>
            </div>
          </form>
          
          <form v-if="currentStep === 'headToeExam'">
            <div class="mb-3">
              <label for="htExamId" class="form-label">Head Toe Exam ID</label>
              <input type="text" class="form-control" id="htExamId" v-model="headToeExamData.htExamId">
            </div>
            <div class="mb-3">
              <label for="htExamInfo" class="form-label">Head Toe Exam Information</label>
              <input type="text" class="form-control" id="htExamInfo" v-model="headToeExamData.htExamInfo">
            </div>
            <div class="mb-3">
              <label for="htExamMedAlert" class="form-label">Medical Allergic</label>
              <input type="text" class="form-control" id="htExamMedAlert" v-model="headToeExamData.htExamMedAlert">
            </div>
          </form>

        
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="goBack" v-if="currentStep !== 'incident'">Back</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-if="currentStep === 'incident'">Cancel</button>
          <button type="button" class="btn btn-primary" @click="goToNextPage">{{ currentStep === 'headToeExam' ? 'OK' : 'Next' }}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'adhocTaskModal',
  props: {
    modalId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      adhocTaskModalId: 'adhocTaskModal',
      currentStep: 'incident', // Starts with incident step
      loggedInUser: '',
      taskData: {
        incidentId: '',
        employeeId: '', // This will be set dynamically
        ppeId: '',
        causeId: '',
        incidentType: '',
        incidentDate: '',
        incidentReportDate: '',
        incidentLocation: '',
        incidentTime: '',
        incidentReportTime: '',
        incidentInvolve: '',
        incidentDescription: ''
      },
      witnessData: { // Initialize witnessData here
        witnessId: '', // Set an initial value or null if you expect it to be dynamically assigned
        witnessName: '',
        witnessStatement: ''
      },
      ppeData: {
        ppeType: '',
        ppeCondition: '',
        ppeUsed: false
      },
      causeData: {
        causeDescription: '',
        causeCategory: '',
        causeSeverity: ''
      },
      firstAidData: {
        firstAidGiven: false,
        firstAidDetails: '',
        firstAidTime: ''
      },
      victimData: {
        victimId: '',
        victimName: '',
        victimAge: '',
        victimGender: '',
        victimInjuryDescription: ''
      },
      victimHistoryData: {
        previousInjuries: '',
        medicalHistory: '',
        ongoingConditions: ''
      },
      rescuerData: {
        rescuerId: '',
        rescuerName: '',
        rescuerContact: '',
        rescuerActions: ''
      }
    };
  },

  mounted() {
    this.setLoggedInUser(); // Call this method to set the logged-in user when the component is mounted
    const modalElement = document.getElementById(this.adhocTaskModalId);
    this.modalInstance = new Modal(modalElement);
  },
  methods: {
    setLoggedInUser() {
      // Retrieve the logged-in user's details dynamically from your authentication system
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser && loggedInUser.username) {
        this.loggedInUser = loggedInUser.username;
        this.taskData.employeeId = this.loggedInUser; // Set the employeeId from the logged-in user's username
      } else {
        this.loggedInUser = "Unknown";
        this.taskData.employeeId = "Unknown"; // Handle case if no user is logged in
      }
    },
    openModal() {
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
    },
    goToNextPage() {
      if (this.currentStep === 'incident') {
        this.currentStep = 'witness'; // Go to witness step
      } else if (this.currentStep === 'witness') {
        this.currentStep = 'ppe'; // Go to PPE step
      } else if (this.currentStep === 'ppe') {
        this.currentStep = 'cause'; // Go to cause step
      } else if (this.currentStep === 'cause') {
        this.currentStep = 'firstAid'; // Go to first aid step
      } else if (this.currentStep === 'firstAid') {
        this.currentStep = 'victim';
      } else if (this.currentStep === 'victim') {
        this.currentStep = 'victimHistory';
      } else if (this.currentStep === 'victimHistory') {
        this.currentStep = 'rescuer';
      } else if (this.currentStep === 'rescuer') {
        this.currentStep = 'primarySurvey';
      } else if (this.currentStep === 'primarySurvey') {
        this.currentStep = 'secondarySurvey';
      } else if (this.currentStep === 'secondarySurvey') {
        this.currentStep = 'headToeExam';
      } else {
        this.saveData(); // Submit data when on first aid
      }
    },
    
    goBack() {
      if (this.currentStep === 'headToeExam') {
        this.currentStep = 'secondarySurvey'; // Go back to cause step
      } else if (this.currentStep === 'secondarySurvey') {
        this.currentStep = 'primarySurvey'; // Go back to PPE step
      } else if (this.currentStep === 'primarySurvey') {
        this.currentStep = 'rescuer'; // Go back to PPE step
      } else if (this.currentStep === 'rescuer') {
        this.currentStep = 'victimHistory'; // Go back to PPE step
      } else if (this.currentStep === 'victimHistory') {
        this.currentStep = 'victim'; // Go back to PPE step
      } else if (this.currentStep === 'victim') {
        this.currentStep = 'firstAid'; // Go back to PPE step
      } else if (this.currentStep === 'firstAid') {
        this.currentStep = 'cause'; // Go back to PPE step
      } else if (this.currentStep === 'cause') {
        this.currentStep = 'ppe'; // Go back to witness step
      } else if (this.currentStep === 'ppe') {
        this.currentStep = 'witness'; // Go back to incident step
      } else {
        this.currentStep = 'incident'; // This case seems off, make sure you want to handle 'victim' at the beginning.
      }
    },

    saveData() {
      // You can add your API call or save logic here
      console.log('Saved data:', {
        taskData: this.taskData,
        witnessData: this.witnessData,
        ppeData: this.ppeData,
        causeData: this.causeData,
        firstAidData: this.firstAidData,
        victimData: this.victimData,
        victimHistoryData: this.victimHistoryData,
        rescuerData: this.resuerData
      });
      // Close the modal after saving
      this.closeModal();
    }
  }
};
</script>


<style scoped>
.modal-title {
    font-family: 'Montserrat', sans-serif; /* Fallback for browsers without Montserrat */
    font-weight: bold;
}
@media (max-width: 768px) {
  .modal-dialog {
    max-width: 100%; /* Full width on small screens */
  }
  .form-label {
    font-size: 0.9rem; /* Adjust label font size */
  }
}
.dropdown-icon {
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 16px; /* Adjust as needed */
  color: #6c757d; /* Bootstrap secondary text color */
}

</style>
