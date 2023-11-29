const getCurrentPage = () => {
    if (!window) {
        return "idle";
    }  
    let path = window.location.pathname;
    if (path.endsWith("/")) {
        // remove trailing slash
        path = path.slice(0, -1);
    }
    if (path.endsWith("/select-project")) {
        return "selectProject";
    }
    if (path.endsWith("/dashboard")) {
        return "dashboard";
    }
    if (path.endsWith("/run-session")) {
        return "runSession";
    }
    if (path.endsWith("/action-items")) {
        return "actionItems";
    }
    if (path.endsWith(".com")) {
        return "home";
    }
    return "idle";
}

export { getCurrentPage };