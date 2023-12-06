import { createMachine, interpret, assign } from "xstate";
import { getCurrentPage } from "../helpers/utils";
import { defaultContext, getCurrentContext, groupsLength, createEmptyRunSession, createNewContext } from "../helpers/contextOperations"
import { type ProjectData, type ActionItem } from "../data-objects/types"

export type KindOfVote = "up" | "down";

const getCurrentProject = () => {
    return window?.localStorage.getItem("currentProject");
}

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
    predictableActionArguments: true,
    id: "app",
    initial: getCurrentPage(),
    context: getCurrentContext(getCurrentProject(), getCurrentPage()),
    on: {
        LOAD: {}
    },
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
// TODO: verify if return ctx could be removed
const options = {
    actions: {
        newProject: (ctx: ProjectData, evt: { data: { projectType, projectName } }) => {
            ctx = createNewContext(evt.data.projectType);
            window?.localStorage.setItem("currentProject", evt.data.projectName);
            window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            window.location.href = evt.data.projectType + "/dashboard";
            return ctx;
        },
        newRunSession: (ctx: ProjectData) => {
            ctx.runSessions.push(createEmptyRunSession());
            ctx.groupNumber = 0;
            window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            return ctx;
        },
        addActionItem: (ctx: ProjectData, evt: { data: ActionItem }) => {
            ctx.actionItems.push(evt.data);
            window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            return ctx;
        },
        editItemAt: (
            ctx: ProjectData,
            evt: { data: { index: number; item: ActionItem } }
        ) => {
            ctx.actionItems[evt.data.index] = evt.data.item;
            window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            return ctx;
        },
        deleteItemAt: (ctx: ProjectData, evt: { data: { index: number } }) => {
            const newActionItems = ctx.actionItems.filter(
                (_, i) => i !== evt.data.index
            );
            ctx.actionItems = newActionItems;
            window.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
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
            window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
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
            window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            return ctx;
        },
        nextGroup: (ctx: ProjectData) => {
            ctx.groupNumber = ctx.groupNumber + 1,
                window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            return ctx;
        },
        previousGroup: (ctx: ProjectData) => {
            ctx.groupNumber = ctx.groupNumber - 1,
                window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            return ctx;
        },
        switchGroup: (ctx: ProjectData, evt: SwitchEvent) => {
            ctx.groupNumber = evt.groupNumber
            window?.localStorage.setItem(getCurrentProject(), JSON.stringify(ctx));
            return ctx;
        },
    },
};

const appMachine = createMachine(machineConfig, options);

const actor = interpret(appMachine).start();

actor.subscribe((state) => {
    console.log(state);
});

export default actor;