import type { Votes } from "../data-objects/types";

export function calculateNpsScore(votes: Votes) {
  const totalVotes = votes.up + votes.down + votes.side;
  if (totalVotes === 0) {
    // can't calculate NPS score if there are no votes
    return 0;
  }
  const downVotesMultiplier = 2;
  // down votes are weighted 2 time more than up votes
  const votesDiff = votes.up - downVotesMultiplier * votes.down;

  // sum total votes to make middle votes have some weight, then divide by total votes doubled to get percentage
  const score = (votesDiff + totalVotes) / (totalVotes * 2);
  // final score is a number between 0 and 5, where 5 is the best
  return Math.max(score, 0) * 5;
}

export function allAttributesHaveVotes(votes: Votes[]) {
  return votes.every((it) => it.up > 0 || it.down > 0 || it.side > 0);
}

export function atLeastOneAttributeHasVote(votes: Votes[]) {
  return votes.some((it) => it.up > 0 || it.down > 0 || it.side > 0);
}
