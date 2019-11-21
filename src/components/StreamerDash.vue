<template>
  <div>
    <div class="d-flex flex-column ma-4" v-if="!streamerURL">
      <v-alert type="error" :value="(error.length > 0)" width="450">
              {{error}}
      </v-alert>
      <v-card width="450">
          <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Connect nOptics Streamer</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              <v-form ref="form" v-model="valid">
                  <v-text-field
                      label="streamer url (http://127.0.0.1:7786)"
                      name="streamer"
                      prepend-icon="fa-server"
                      type="text"
                      :rules="streamerRules"
                      required
                      v-model="streamerInput"
                  ></v-text-field>
              </v-form>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                  color="primary"
                  :loading="loading"
                  :disabled="!valid || loading"
                  v-on:click="checkStreamer">Connect</v-btn>
          </v-card-actions>
      </v-card>
    </div>
    <div v-if="streamerURL">
      <div class="d-flex flex-row ma-4 mb-8">
          <v-card min-width="250">
              <v-card-title>Connected Streamer</v-card-title>
              <v-card-text>
                  <div class="d-flex flex-row">
                        <div class="ma-3">
                          Version
                      </div>
                      <div class="ma-3">
                          {{ streamer.version }}
                      </div>
                  </div>
                  <div class="d-flex flex-row">
                        <div class="ma-3">
                          Commit
                      </div>
                      <div class="ma-3">
                          {{ streamer.git_commit }}
                      </div>
                  </div>
                  <div class="d-flex flex-row">
                        <div class="ma-3">
                          Go
                      </div>
                      <div class="ma-3">
                          {{ streamer.go }}
                      </div>
                  </div>
              </v-card-text>
          </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'streamerDash',
  data() {
    return {
      loading: false,
      valid: false,
      streamerInput: '',
      streamerRules: [
          v => !!v || 'streamer address is required',
          v => /^(?:http(s)?:\/\/)[\w.-]+(?:.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v) || 'must be a valid url'
      ],
      error: '',
    }
  },
  computed: {
    streamerURL() {
      return this.$store.state.streamerURL
    },
    streamer() {
      return this.$store.state.streamer
    }
  },
  methods: {
    checkStreamer(){
      this.loading = true
      this.error = ''
      axios({
          method: 'get',
          url: this.streamerInput
      })
      .then(response =>{
          if (response.status != 200) {
              throw response.status
          }
          this.$store.commit('streamerURL', this.streamerInput)
          this.$store.dispatch('streamerInfo')
      })
      .catch(error => {
          console.log(error)
          this.error = 'there was an error connecting to the registry. Please check the address and try again'
      })
      .finally(() => this.loading = false)
    },
  }
}
</script>