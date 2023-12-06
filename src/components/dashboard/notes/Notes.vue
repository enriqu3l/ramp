<script>
import { addLineJumps } from "../../../helpers/text";
import { calculateNpsScore } from "../../../helpers/statistics";

import { useActor } from "@xstate/vue";
import actor from "../../../state-machines/appMachine";
import NotesIcon from "../../icons/NotesIcon.vue";
import NotesModal from "./NotesModal.vue";

export default {
    components: { NotesIcon, NotesModal },
    setup() {
        const { state } = useActor(actor);
        return {
            sessions: state.value.context.runSessions,
            lastSession: state.value.context.runSessions.at(-1),
        };
    },
    data() {
        return {
            selected: {
                group: "",
                up: 0,
                side: 0,
                down: 0,
                npsScore: 0,
                notes: {
                    up: "",
                    side: "",
                    down: "",
                },
            },
        };
    },
    computed: {
        lastSession() {
            return this.sessions.at(-1);
        },
        groups() {
            return this.lastSession.groups.map((group) => group.title);
        },
        tableRowsData() {
            return this.groups
                .map((group, index) => {
                    const groupWithVotes = this.lastSession.groups[index];
                    // TODO: Its hardcoded, we need Navigate through all the questions
                    const votes = groupWithVotes.votes[0];
                    const notes = groupWithVotes.notes[0];
                    const npsScore = calculateNpsScore(votes).toFixed(2);
                    return {
                        group,
                        up: votes.up,
                        side: votes.side,
                        down: votes.down,
                        npsScore,
                        notes,
                    };
                })
                .sort((a, b) => a.npsScore - b.npsScore);
        },
    },
    methods: {
        selectRow(row) {
            this.selected = row;
        },
        colorScore(score) {
            if (score <= 1.5) {
                return "text-red-700";
            }
            if (score <= 3) {
                return "text-yellow-500";
            }
            return "";
        },
        addLineJumps: addLineJumps,
    },
};
</script>

<template>
    <div>
        <h2 class="card-title">Latest session: {{ lastSession.date }}</h2>
        <table class="table w-full">
            <thead>
                <tr>
                    <th>Group</th>
                    <th>Score</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in tableRowsData" :key="row.group">
                    <td :data-test="`results-attribute-${index}`">{{ row.group }}</td>
                    <td :data-test="`results-score-${index}`" class="font-bold" :class="colorScore(row.npsScore)">
                        {{ row.npsScore }}
                    </td>
                    <td>
                        <label for="notes-modal" class="btn modal-button btn-ghost" @click="selectRow(row)">Open notes
                            <NotesIcon class="ml-2" />
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>

        <NotesModal :votingData="selected" />
    </div>
</template>
