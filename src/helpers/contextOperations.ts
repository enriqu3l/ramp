import type { ProjectData, RunSession, Notes, Votes } from "../data-objects/types";
import { groups } from "../templates/THC";

import { getTodayAsYYYYMMDD } from "./date";

const groupsLength = groups.length;

function createEmptyRunSession(): RunSession {
  return {
        date: getTodayAsYYYYMMDD(),
        groups: groups.map((group) => ({
            ...group,
            votes: group.questions.map(() => ({ up: 0, down: 0 })),
            notes: group.questions.map(() => ({ up: "", down: "" })),
        })),
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
            votes: group.questions.map(() => ({ up: 0, down: 0, side: 0 })),
            notes: group.questions.map(() => ({ up: "", down: "", side: "" })),
        })),
    });
    context.type = projectType;
    context.groupNumber = 0;

    return context;
}

/**
 * Get context from Local Storage
 * @param  {string} project String from local storage
 * @param  {string} page String of the current page
 */
const getCurrentContext = (project, page): ProjectData => {
  if (!project || page == "selectProject") {
    return defaultContext;
  }
  const savedSession = window?.localStorage.getItem(project);

  return savedSession ? JSON.parse(savedSession) : defaultContext;
}

export {
  groupsLength,
  defaultContext,
  createNewContext,
  createEmptyRunSession,
  getCurrentContext
};
