import type { Group } from "../data-objects/types";

const groups: Group[] = [
  {
    title: "Delivering Value",
    description:
      "We are proud of what we do, we act quickly, reliably, and consistently to deliver the value we've promised to our clients and look for opportunities to surpass their expectations.",
    examples: {
      good: `🟢 We have met all the objectives set for the project, increasing our quality levels.
      🟢 Our project is differentiating, we have built innovative solutions that have our stakeholders very satisfied.`,
      meh: "🟡 We use to be proud of our work, however lately it's becoming more and more challenging and we are not having any impact on the project",
      bad: "🔴 Our delivery is inconsistent and does not add any differentiating value to our customers, nor does it reflect quality work.",
    },
    questions: [{
      question: "How well do you feel about delivering value?",
      weight: 1,
    }]
  },
  {
    title: "Career Growth",
    description:
      "The project enables professional growth, allowing the team to improve their knowledge and skills so that they make progress in their career paths.",
    examples: {
      good: "🟢 This project allows the team to learn lots of interesting stuff all the time. Proving that it has challenges that push us to improve our skills and knowledge.",
      meh: "🟡 We rarely have the time to learn or the project is starting to become boring and repetitive.",
      bad: "🔴 The project does not offer us anything new or different. We are doing repetitive tasks with few challenges that allow us to learn new things.",
    },
    questions: [{
      question: "How well do you feel about your career growth?",
      weight: 1,
    }]
  },
  {
    title: "Shared Understanding",
    description:
      "The scope of our team's work is clear. Ownership and accountability for individuals and leaders are defined. We know our mission and have a clear idea of what to do to accomplish our work.",
    examples: {
      good: "🟢 We have clear goals and understanding of what the customer is expecting from us.",
      meh: "🟡 We understand what the customer and end users of our application expects from us, but the day to day operations don't allow us to do enough to get there. Also, some stakeholders don't seem to understand or agree on what is what we are here for.",
      bad: "🔴 Our motto is basically “whatever it takes”, which hurts the team. We need to clarify what we do and don't do.",
    },
    questions: [{
      question: "How well do you feel about your career growth?",
      weight: 1,
    }]
  },
  {
    title: "Work/Life Balance",
    description:
      "The project environment allows our team to have meaningful daily achievements, enjoyment, and well-being in our work and personal lives.",
    examples: {
      good: "🟢 The team has built great internal tools and a feedback culture which allow us to make the most with our time, bringing balance to the project.",
      meh: "🟡 We used to be able to balance our work and personal life. With the recent changes we have more work than expected.",
      bad: "🔴 The amount of daily tasks and/or complexity is overwhelming. We don't have resources enough to keep up to date.",
    },
    questions: [{
      question: "How well do you feel about your work/life balance?",
      weight: 1,
    }]
  },
  {
    title: "Team Collaboration",
    description:
      "We work together as a team. Positive and constant interactions, communication, and collaboration allow us to resolve challenges together, share lessons learned, and iterate. We share responsibility, acknowledge our roles, and adapt to help each other balance duties.",
    examples: {
      good: "🟢 The team has complementary skills that set the team for success. We share the same values and principles, which allows us to be aligned in the way we do our work.",
      meh: "🟡 Agreements and team rules are up-to-date but in practice, they are sometimes disregarded. The team is not fully set on their skills which calls into question the contribution of each of us.",
      bad: "🔴 We identified that the team needs alignment and communication. People are feeling alone, gaps aren't filling at the right pace causing overburden and rework.",
    },
    questions: [{
      question: "How well do you feel about team collaboration?",
      weight: 1,
    }]
  },
  {
    title: "Consulting Mindset",
    description:
      "The client views our team as professional advisors because we complete our tasks and proactively identify and solve problems. We help each other and the client understand and solve problems with an open mind, and we feel comfortable surveying the entire landscape to uncover new potential solutions.",
    examples: {
      good: `🟢 The recent training session Julie ran on “understanding the customer” was awesome to help us in building relationships with customers.
      🟢  Wizeline team adds value to the whole product lifecycle. Our team is proactively suggesting improvements that get included.`,
      meh: "🟡 We have gained trust with our clients, but it still takes many conversations before they accept our proposals.",
      bad: "🔴 The team has only executed what the client has asked.",
    },
    questions: [{
      question: "How well do you feel about the team's consulting mindest?",
      weight: 1,
    }]
  },
  {
    title: "Customer Relationship",
    description:
      "Leaders on the client side are well known and there is a trusting relationship in place fulfilled with positive, open and effective interactions. The client knows that we understand their needs and are committed to owning the project and delivering the highest value possible. We promote the clients' satisfaction while building a strong, reliable relationship.",
    examples: {
      good: `🟢 The client has give us good feedback due to our recent milestone and we have posted in our #customer-feedback slack Channel
      🟢   The client recognized Julie because she on-boarded new team members.`,
      meh: "🟡 We have gained trust with our clients, but it still takes many conversations before they accept our proposals.",
      bad: "🔴 We have noticed a certain disengagement from our client due to the lack of attendance in our Sprint ceremonies.",
    },
    questions: [{
      question: "How well do you feel about customer relationship?",
      weight: 1,
    }]
  },
  {
    title: "Support",
    description:
      "We are regularly asked what we need and get great support and help when we ask for it. Processes and tools are in place to fit our needs and enable us to deliver the services offered to our clients.",
    examples: {
      good: "🟢 Our development processes and automation allow the team to move fast and focus on business value.",
      meh: `🟡 Infrastructure is getting complex, not everyone in the team understands how to lift or configure environments, we depend on one person to do it.
      🟡 We've got clear definitions of objectives for our highest priority milestones, but not all.`,
      bad: "🔴 Deploying to production is painful, it is not automated, there are not enough tests to trust the pipeline and we depend on manual approvals.",
    },
    questions: [{
      question: "How well do you feel about the support you receive?",
      weight: 1,
    }]
  },
];

export { groups }