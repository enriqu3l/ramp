import type { ProjectData, RunSession, Notes, Votes } from "../data-objects/types";
import groups from "../data-objects/THGroups";
import { getTodayAsYYYYMMDD } from "./date";

function createEmptyRunSession(): RunSession {
  return {
    notes: Array(groups.length).fill(createEmptyNotes()),
    votes: Array(groups.length).fill(createEmptyVotes()),
    questions: [...groups],
    date: getTodayAsYYYYMMDD(),
  };
}

function createEmptyNotes(): Notes {
  return {
    up: "",
    down: ""
  };
}

function createEmptyVotes(): Votes {
  return {
    up: 0,
    down: 0
  };
}

const defaultContext: ProjectData = {
    runSessions: [],
    actionItems: [],
    groupNumber: 0,
    type: "",
};

const createNewContext = (projectType) => {
    let context = defaultContext;
    const today = getTodayAsYYYYMMDD();

    context.runSessions.push({
        date: today,
        groups: groups.map((group) => ({
            ...group,
            votes: group.questions.map(() => ({ up: 0, down: 0 })),
            notes: group.questions.map(() => ({ up: "", down: "" })),
        })),
    });
    context.type = projectType;
    context.groupNumber = 0;

    return context;
}

export { defaultContext, createNewContext, createEmptyRunSession };
