const DEBUG_MODE = false;
const REPEAT_FREQUENCY_MS = 500;

//
// Utils
//

const dbg = (x) => {
    if (DEBUG_MODE) {
        console.log("dbg: " + x);
    }
    return x
};

const numberRegex = /\p{Number}/gu;

// returns true when it successfully hid anything
const hideAllNodesStartingWithNumerals = (root) => {
    let didSomething = false;

    const childNodes = root.childNodes;
    for (let i = 0; i < childNodes.length; i += 1) {
        const node = childNodes[i]
        if (node.nodeType == 3 /* Text */) {
            const firstChar = node.nodeValue[0]
            if (firstChar.match(numberRegex)) {
                // Hide the whole parent node
                root.style.display = 'none';
                didSomething = true;
            }
        }

        // Don't use ||= because that short circuits!
        didSomething |= hideAllNodesStartingWithNumerals(node)
    }
    return Boolean(didSomething);
}

//
// Hiding Specific Sections
//

// returns true when it successfully hid anything
const hideUnderStream = () => {
    const viewerCounts = document.querySelectorAll('[data-a-target="animated-channel-viewers-count"]');

    let didSomething = false;

    for (let i = 0; i < viewerCounts.length; i += 1) {
        if (viewerCounts[i].style.display != 'none') {
            viewerCounts[i].style.display = 'none';
            didSomething = true;
        }
    }
    return didSomething;
};

// returns true when it successfully hid anything
const hideLeftSidebar = () => {
    const statusSections = document.querySelectorAll('[data-a-target="side-nav-live-status"]');

    let didSomething = false;

    for (let i = 0; i < statusSections.length; i += 1) {
        // Don't use ||= because that short circuits!
        didSomething |= hideAllNodesStartingWithNumerals(statusSections[i]);
    }
    return Boolean(didSomething);
};

// returns true when it successfully toggled it off
const toggleViewersOnDashOff = () => {
    const topButtons = document.querySelectorAll('[data-test-selector="click"]');

    for (let i = 0; i < topButtons.length; i += 1) {
        // We want to click it only if it is set to visible currently
        const label = topButtons[i].ariaLabel.toLowerCase();
        if (
            label.includes("hide viewers")
            || label.includes("hide shared viewers")
        ) {
            topButtons[i].click();
            return true
        }
    }
    return false
}

//
// Trigger Hiding
//

const intervalFunc = () => {
    let didSomething = false;

    //
    // Dash page section
    //
    // Don't use ||= because that short circuits!
    didSomething |= dbg(toggleViewersOnDashOff());

    //
    // Stream page section
    //
    if (!didSomething) {
        // The dash doesn't have these things, so skip them if we
        // toggled the buttons.
        // Don't use ||= because that short circuits!
        didSomething |= dbg(hideUnderStream());
        didSomething |= dbg(hideLeftSidebar());
    }

    setTimeout(intervalFunc, REPEAT_FREQUENCY_MS)

    if (DEBUG_MODE) {
        console.log("Hide Twitch Viewer Count extension ran once");
    }
};

intervalFunc()
