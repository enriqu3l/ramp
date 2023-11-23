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
}

export interface Notes {
  up: string;
  down: string;
}

export interface GroupWithVotes extends Group {
  votes: Votes[];
  notes: Notes[];
}

export interface VotingSession {
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
  votingSessions: VotingSession[];
  actionItems: ActionItem[];
  groupNumber: number;
  type?: string;
}
