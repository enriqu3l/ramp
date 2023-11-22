export interface Attribute {
  title: string;
  questions: AttributeQuestion[];
}

export interface AttributeQuestion {
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

export interface AttributeWithVotes extends Attribute {
  votes: Votes[];
  notes: Notes[];
}

export interface VotingSession {
  date: string;
  attributes: AttributeWithVotes[];
}

export interface ActionItem {
  task: string;
  date: string;
  attribute: string;
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
  attributeNumber: number;
  type?: string;
}
