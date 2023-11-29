import { createMachine, interpret, assign } from "xstate";
import { getCurrentPage } from "../helpers/utils";
import { getCurrentContext, groupsLength, createEmptyRunSession } from "../helpers/contextOperations"
import { type ProjectData, type ActionItem } from "../data-objects/types"

export type KindOfVote = "up" | "down";

const currentProject = window?.localStorage.getItem("currentProject");

export interface VoteEvent {
    type: string;
    data: {
        type: KindOfVote;
        value: number;
        questionNumber: number;
    };
}

export interface NoteEvent {
    type: string;
    data: {
        type: KindOfVote;
        value: string;
        questionNumber: number;
    };
}

export interface SwitchEvent {
    type: string;
    groupNumber: number;
}

const machineConfig = {
    id: "app",
    initial: getCurrentPage(),
    context: getCurrentContext(currentProject),
    states: {
        idle: {},
        home: {
            on: {
                START_THC: {},
                START_QAA: {}
            }
        },
        selectProject: {
            on: {
                IMPORT_PROJECT: {},
                OPEN_PROJECT: {},
                NEW_PROJECT: {
                    actions: "newProject"
                }
            }
        },
        dashboard: {
            on: {
                NEW_SESSION: {
                    actions: "newRunSession",
                },
                ADD_ACTION_ITEM: {
                    actions: "addActionItem",
                },
                EDIT_ACTION_ITEM: {
                    actions: "editItemAt",
                },
                DELETE_ACTION_ITEM: {
                    actions: "deleteItemAt",
                },
            },
        },
        runSession: {
            on: {
                ADD_NOTE: {
                    actions: "addNote",
                },
                ADD_VOTE: {
                    actions: "addVote",
                },
                NEXT_GROUP: {
                    actions: "nextGroup",
                    cond: (ctx: ProjectData) =>
                        ctx.groupNumber < groupsLength - 1,
                },
                PREVIOUS_GROUP: {
                    actions: "previousGroup",
                    cond: (ctx: ProjectData) => ctx.groupNumber > 0,
                },
                SWITCH_GROUP: {
                    actions: "switchGroup",
                    cond: (_ctx: ProjectData, evn: SwitchEvent) =>
                        evn.groupNumber >= 0 &&
                        evn.groupNumber <= groupsLength - 1,
                },
            },
        },
        actionItems: {
            on: {
                ADD_ACTION_ITEM: {
                    actions: "addActionItem",
                },
                EDIT_ACTION_ITEM: {
                    actions: "editItemAt",
                },
                DELETE_ACTION_ITEM: {
                    actions: "deleteItemAt",
                },
            },
        },
    }
}

const options = {
    actions: {
        newProject: (ctx: ProjectData) =>  {
            ctx.runSessions.push(createEmptyRunSession());
            ctx.groupNumber = 0;
            return ctx;
        },
        newRunSession: (ctx: ProjectData) =>  {
            ctx.runSessions.push(createEmptyRunSession());
            ctx.groupNumber = 0;
            return ctx;
        },
        addActionItem: (ctx: ProjectData, evt: { data: ActionItem }) => {
            ctx.actionItems.push(evt.data);
            return ctx;
        },
        editItemAt: (
            ctx: ProjectData,
            evt: { data: { index: number; item: ActionItem } }
            ) => {
            ctx.actionItems[evt.data.index] = evt.data.item;
            return ctx;
        },
        deleteItemAt: (ctx: ProjectData, evt: { data: { index: number } }) => {
            const newActionItems = ctx.actionItems.filter(
                (_, i) => i !== evt.data.index
            );
            ctx.actionItems = newActionItems;
            return ctx;
        },
        addNote: (ctx: ProjectData, evt: NoteEvent) => {
            const session = ctx.runSessions[ctx.runSessions.length - 1];
            const attributeWithVote = session.groups[ctx.groupNumber];
            const newNotes = attributeWithVote.notes.map((note, index) => {
                if (index === evt.data.questionNumber) {
                return { ...note, [evt.data.type]: evt.data.value };
                }
                return note;
            });

            const newAttributes = [...session.groups];
            newAttributes[ctx.groupNumber].notes = newNotes;

            ctx.runSessions[ctx.runSessions.length - 1] = {
                ...session,
                groups: newAttributes,
            };
            return ctx;
        },
        addVote: (ctx: ProjectData, evt: VoteEvent) => {
            const session = ctx.runSessions[ctx.runSessions.length - 1];
            const groupWithVote = session.groups[ctx.groupNumber];
            const newVotes = groupWithVote.votes.map((vote, index) => {
                if (index === evt.data.questionNumber) {
                return { ...vote, [evt.data.type]: evt.data.value };
                }
                return vote;
            });

            const newGroups = [...session.groups];
            newGroups[ctx.groupNumber].votes = newVotes;

            ctx.runSessions[ctx.runSessions.length - 1] = {
                ...session,
                groups: newGroups,
            };
            return ctx;
        },
        nextGroup: assign({
            groupNumber: (ctx: ProjectData) => ctx.groupNumber + 1,
        }),
        previousGroup: assign({
            groupNumber: (ctx: ProjectData) => ctx.groupNumber - 1,
        }),
        switchGroup: assign({
            groupNumber: (_ctx: ProjectData, evt: SwitchEvent) =>
            evt.groupNumber,
        }),
    },
};

const appMachine = createMachine(machineConfig, options);

const actor = interpret(appMachine).start();

actor.subscribe((state) => {
    window?.localStorage.setItem(currentProject, JSON.stringify(state.context));
});

export default actor;