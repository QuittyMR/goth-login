<svg viewBox="0 0 40 40" class="fill-transparent stroke-secondary">
    <circle cx="20" cy="20" r="18"></circle>
</svg>

<style>

    circle {
        stroke-width: 4;
        stroke-linecap: round;
        stroke-dasharray: 140;
        transform-origin: 20px 20px 0;
        animation: spinner 2s linear infinite;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
            stroke-dashoffset: 40;
        }
        50% {
            transform: rotate(720deg);
            stroke-dashoffset: 140;
        }
        100% {
            transform: rotate(1080deg);
            stroke-dashoffset: 40;
        }
    }
</style>