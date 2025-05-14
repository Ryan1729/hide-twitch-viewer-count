//
// Utils
//

const numberRegex = /\p{Number}/gu;

const hideAllNodesStartingWithNumerals = (root) => {
    const childNodes = root.childNodes;
    for (let i = 0; i < childNodes.length; i += 1) {
        const node = childNodes[i]
        if (node.nodeType == 3 /* Text */) {
            const firstChar = node.nodeValue[0]
            if (firstChar.match(numberRegex)) {
                // Hide the whole parent node
                root.style.display = 'none';
            }
        }

        hideAllNodesStartingWithNumerals(node)
    }
}

//
// Hiding Specific Sections
//

const hideUnderStream = () => {
    const viewerCounts = document.querySelectorAll('[data-a-target="animated-channel-viewers-count"]');

    for (let i = 0; i < viewerCounts.length; i += 1) {
        viewerCounts[i].style.display = 'none';
    }
};

const hideLeftSidebar = () => {
    const statusSections = document.querySelectorAll('[data-a-target="side-nav-live-status"]');

    for (let i = 0; i < statusSections.length; i += 1) {
        hideAllNodesStartingWithNumerals(statusSections[i]);
    }
};

//
// Trigger Hiding
//

hideUnderStream();
hideLeftSidebar();
