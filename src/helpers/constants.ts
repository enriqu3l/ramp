const APPTYPES = {
    VOTING: "voting",
    SELECTIVE: "selective",
}

const APPS = {
    THC: {
        id: 1,
        code: "THC",
        name: "Team Health Check",
        shortDescription: "With this tool, you'll be able to track progress over time, set clear goals, and make adjustments to your management approach as needed",
        description: "Team health checks are structured reviews of a team's performance and well-being. Similar to a medical check-up for your physical health, a team health check evaluates a group's emotional well-being, interpersonal dynamics, work-life balance, and effectiveness",
        type: APPTYPES.VOTING
    },
    QAMA: {
        id: 2,
        code: "QAMA",
        name: "QA Maturity Assessment",
        shortDescription: "With this tool, you'll be able to track progress over time, set clear goals, and make adjustments to your QA strategy",
        description: "The objective of this quality maturity assessment is to identify gaps and improvement areas in the current process for products and services. The next step requires recommendations that address some of the current quality assurance QA challenges to facilitate a transition to a better QA strategy",
        type: APPTYPES.SELECTIVE
    }
}

export { APPS };
