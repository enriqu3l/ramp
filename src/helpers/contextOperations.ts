import type { ProjectData, RunSession, Notes, Votes } from "../data-objects/types";
import groups from "../templates/THC_data";

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
            votes: group.questions.map(() => ({ up: 0, down: 0 })),
            notes: group.questions.map(() => ({ up: "", down: "" })),
        })),
    });
    context.type = projectType;
    context.groupNumber = 0;

    return context;
}

/**
 * Get context from Local Storage
 * @param  {string} project String from local storage
 */
const getCurrentContext = (project): ProjectData => {
  if (!project) {
    window.location.href = "";
    return defaultContext;
  }
  const savedSession = window?.localStorage.getItem(project);
  let context = savedSession ? JSON.parse(savedSession) : defaultContext;
  const today = getTodayAsYYYYMMDD();

  if (context.runSessions.length === 0) {
    // sessions are empty, create one.
    context.runSessions.push({
      date: today,
      groups: groups.map((group) => ({
        ...group,
        votes: group.questions.map(() => ({ up: 0, down: 0 })),
        notes: group.questions.map(() => ({ up: "", down: "" })),
      })),
    });
    context.groupNumber = 0;
  }
  return context;
}

export {
  groupsLength,
  defaultContext,
  createNewContext,
  createEmptyRunSession,
  getCurrentContext
};
