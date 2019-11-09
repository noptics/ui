<template>
    <v-card min-width="350" class="pa-2 ma-4">
        <v-card-text>
            <div class="d-flex flex-row">
            {{ sub.client_id }}
            </div>
            <div class="d-flex flex-row">
                <v-chip label :color="sub.is_offline ? 'red' : 'green'" class="ma-3">
                    {{sub.is_offline ? "offline" : "online"}}
                </v-chip>
                <v-chip v-if="!sub.is_offline" label :color="sub.is_stalled ? 'red' : 'green'" class="ma-3">
                    {{sub.is_stalled ? "stalled" : "running"}}
                </v-chip>
                <v-chip label v-if="sub.is_durable" class="ma-3">
                    durable
                </v-chip>
            </div>
            <div class="d-flex flex-row">
                <div class="ma-3">
                    Queue:
                </div>
                <div class="ma-3">
                    {{ sub.queue_name }}
                </div>
            </div>
            <div class="d-flex flex-row">
                <div class="ma-3">
                    Last Sent:
                </div>
                <div class="ma-3">
                    {{ sub.last_sent }}
                </div>
            </div>
            <div class="d-flex flex-row">
                <div class="ma-3">
                    Pending:
                </div>
                <div class="ma-3">
                    {{ sub.pending_count }}
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: "subscription",
    props: ['sub']
}
</script>