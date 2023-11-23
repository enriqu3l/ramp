import Papa from "papaparse";
import { type ActionItem, type ProjectData, type VotingSession } from "../data-objects/types";

export interface ImportedProjectData {
  name: string;
  data: ProjectData;
}

export function importCsv(csvStr: string): ImportedProjectData {
  const delim = /[=#].*\r\n/; // delimiter is any line that starts with # or =
  const [meta, votingSessions, actionItems] = csvStr.split(delim);
  const metaData = metadataFromCsv(meta);

  let projectData: ProjectData = {
    votingSessions: votingSessionsFromCsv(votingSessions),
    actionItems: actionItemsFromCsv(actionItems),
    groupNumber: 0,
    type: metaData.app,
  };

  return {
    name: metaData.projectName,
    data: projectData,
  };
}

interface Metadata {
  app: string;
  version: string;
  projectName: string;
  createdAt: string;
}

function metadataFromCsv(csv: string): Metadata {
  const table = Papa.parse(csv).data;

  const [app, version, projectName, createdAt] = table[1];

  return {
    app,
    version,
    projectName,
    createdAt,
  };
}

function actionItemsFromCsv(actionItems: string): ActionItem[] {
  const delim = "\r\n";
  const tables = actionItems
    .split(delim)
    .splice(1)
    .map((x) => Papa.parse(x))
    .map((x) => x.data)
    .filter((x) => x.length > 0);

  // csv column indexes
  enum ActionItemsColumns {
    date = 0,
    attribute = 1,
    title = 2,
    description = 3,
    status = 4,
    owner = 5,
  }

  return tables.map((rows: string[][]): ActionItem => {
    return {
      task: rows[0][ActionItemsColumns.title],
      date: rows[0][ActionItemsColumns.date],
      group: rows[0][ActionItemsColumns.attribute],
      owner: rows[0][ActionItemsColumns.owner],
      status: rows[0][ActionItemsColumns.status],
      notes: rows[0][ActionItemsColumns.description],
    };
  });
}

function votingSessionsFromCsv(sessions: string): VotingSession[] {
  // headers separate each voting session
  const delim = "Date,Group,Question,up,down,notesUp,notesDown\r\n";
  const dateColumn = 0;

  const tables = sessions
    .split(delim)
    .splice(1)
    .map((x) => Papa.parse(x))
    .map((x) => x.data);

  return tables.map((rows: string[][]) => {
    const votingSession: VotingSession = {
      groups: [],
      date: rows[0][dateColumn],
    };

    rows.forEach((row) => {
      const [
        _date,
        group,
        question,
        up = "0",
        down = "0",
        notesUp,
        notesDown,
      ] = row;
      if (!group) return;

      let attributeIndex = votingSession.groups.findIndex(
        (x) => x.title === group
      );
      if (attributeIndex === -1) {
        attributeIndex = votingSession.groups.length;
        votingSession.groups.push({
          title: group,
          description: "",
          examples: {
            good: "",
            meh: "",
            bad: ""
          },
          questions: [],
          votes: [],
          notes: [],
        });
      }

      votingSession.groups[attributeIndex].questions.push({
        question,
        weight: 1,
      });
      votingSession.groups[attributeIndex].votes.push({
        up: parseInt(up),
        down: parseInt(down),
      });
      votingSession.groups[attributeIndex].notes.push({
        up: notesUp,
        down: notesDown,
      });
    });

    return votingSession;
  });
}