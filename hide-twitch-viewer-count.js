const viewerCounts = document.querySelectorAll('[data-a-target="animated-channel-viewers-count"]');

for (let i = 0; i < viewerCounts.length; i += 1) {
    viewerCounts[i].style.display = 'none';
}
