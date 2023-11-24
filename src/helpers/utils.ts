const getCurrentPage = () => {
    if (!window) {
        return "idle";
    }  
    let path = window.location.pathname;
    if (path.endsWith("/")) {
        // remove trailing slash
        path = path.slice(0, -1);
    }
    if (path.endsWith("/run-session")) {
        return "run-session";
    }
    if (path.endsWith("/dashboard")) {
        return "dashboard";
    }
    if (path.endsWith("/action-items")) {
        return "actionItems";
    }
    return "idle";
}

export { getCurrentPage };