import type { ProjectData } from "../data-objects/types";
import groups from "../data-objects/THGroups";
import { getTodayAsYYYYMMDD } from "./date";

const defaultContext: ProjectData = {
    votingSessions: [],
    actionItems: [],
    groupNumber: 0,
    type: "",
};

const createNewContext = (projectType) => {
    let context = defaultContext;
    const today = getTodayAsYYYYMMDD();

    context.votingSessions.push({
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

export { defaultContext, createNewContext };
