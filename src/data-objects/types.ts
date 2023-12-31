export interface Group {
  title: string;
  description: string;
  examples: GroupExamples
  questions: GroupQuestion[];
}
export interface GroupExamples {
  good: string;
  meh: string;
  bad: string;
}
export interface GroupQuestion {
  question: string;
  weight: number;
}
export interface Votes {
  up: number;
  down: number;
  side: number;
}

export interface Notes {
  up: string;
  down: string;
  side: string;
}

export interface GroupWithVotes extends Group {
  votes: Votes[];
  notes: Notes[];
}

export interface RunSession {
  date: string;
  groups: GroupWithVotes[];
}

export interface ActionItem {
  task: string;
  date: string;
  group: string;
  owner: string;
  status: string;
  notes: string;
}

export interface Meta {
  app: string;
  createdAt: string;
  projectName: string;
  version: string;
}

export interface ProjectData {
  runSessions: RunSession[];
  actionItems: ActionItem[];
  groupNumber: number;
  type?: string;
}
