const APPTYPES = {
    VOTING: "voting",
    SELECTIVE: "selective",
}

const APPS = {
    THC: {
        id: 1,
        code: "THC",
        name: "Team Health Check",
        description: "Lorem Ipsum Dolor Sit A Met",
        type: APPTYPES.VOTING
    },
    QAMA: {
        id: 1,
        code: "QAMA",
        name: "QA Maturity Assessment",
        description: "Lorem Ipsum Dolor Sit A Met",
        type: APPTYPES.SELECTIVE
    }
}

export { APPS };
