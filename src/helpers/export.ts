import Papa from "papaparse";
import { getTodayAsYYYYMMDD } from "./date";
import { type ActionItem, type ProjectData, type RunSession } from "../data-objects/types";

interface CsvDataStructureMultirow {
  fields: string[];
  data: string[][];
}
interface CsvDataStructure {
  fields: string[];
  data: string[];
}

export function exportCsv(
  projectData: ProjectData,
  projectName: string
): string {
  const metadata = generateProjectMetaData(projectName, projectData.type);
  const actionItemsCsv = actionItemsToCSV(projectData.actionItems);
  const runSessionsCsv = runSessionsToCsv(projectData.runSessions);
  const delim = "\r\n#======\r\n";
  return (
    Papa.unparse(metadata) +
    delim +
    runSessionsCsv +
    delim +
    Papa.unparse(actionItemsCsv)
  );
}

function generateProjectMetaData(projectName: string, projectType: string): CsvDataStructure {
  const headers = ["app", "version", "projectName", "createdAt"];
  const row = [projectType, "1.0.0", projectName, getTodayAsYYYYMMDD()];
  return {
    fields: headers,
    data: row,
  };
}

function runSessionToCSV(
  runSession: RunSession
): CsvDataStructureMultirow {
  const headers = [
    "Date",
    "Group",
    "Question",
    "up",
    "down",
    "notesUp",
    "notesDown",
  ];

  const res: CsvDataStructureMultirow = { data: [], fields: headers };

  for (let i = 0; i < runSession.groups.length; i++) {
    const attribute = runSession.groups[i];
    for (let j = 0; j < attribute.questions.length; j++) {
      const { up, down } = attribute.votes[j];
      const { up: notesUp, down: notesDown } = attribute.notes[j];
      const date = runSession.date;
      const { question } = attribute.questions[j];

      res.data.push([
        date,
        attribute.title,
        question,
        up.toString(10),
        down.toString(10),
        notesUp,
        notesDown,
      ]);
    }
  }

  return res;
}

function actionItemsToCSV(actionItems: ActionItem[]): CsvDataStructureMultirow {
  const data = {
    fields: ["date", "group", "title", "description", "status", "owner"],
    data: actionItems.map((a) => {
      const { task: title, notes: description, status, owner, group } = a;

      return [
        getTodayAsYYYYMMDD(),
        group,
        title,
        description,
        status,
        owner,
      ];
    }),
  };

  return data;
}

function runSessionsToCsv(runSessions: RunSession[]): string {
  return runSessions
    .map((session: RunSession) => {
      return Papa.unparse(runSessionToCSV(session));
    })
    .join("\n");
}
