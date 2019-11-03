<template>
    <v-card min-width="350">
        <v-card-text>
            <v-container>
                <v-row>
                    <p v-if="!sub.client_id"></p>
                    {{ sub.client_id }}
                </v-row>
                <v-row>
                    <v-col>
                        <v-chip label :color="sub.is_offline ? 'red' : 'green'">
                            {{sub.is_offline ? "offline" : "online"}}
                        </v-chip>
                    </v-col>
                    <v-col v-if="!sub.is_offline">
                        <v-chip label :color="sub.is_stalled ? 'red' : 'green'">
                            {{sub.is_stalled ? "stalled" : "running"}}
                        </v-chip>
                    </v-col>
                    <v-col v-if="sub.is_durable">
                        <v-chip label>
                            durable
                        </v-chip>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Queue:
                    </v-col>
                    <v-col>
                        {{ sub.queue_name }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Last Sent:
                    </v-col>
                    <v-col>
                        {{ sub.last_sent }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Pending:
                    </v-col>
                    <v-col>
                        {{ sub.pending_count }}
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: "subscription",
    props: ['sub']
}
</script>