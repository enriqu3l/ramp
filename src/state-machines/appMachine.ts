import { createMachine, assign } from "xstate";

export const contactFormMachine = createMachine({
    id: "app",
    initial: "home",
    context: {},
    states: {
        home: {},
        selectProject: {},
        dashboard: {}
    }
    },
    {
    actions: {},
    services: {}
});
