<svelte:options immutable />

<script lang="ts">
    import { draw } from 'svelte/transition';
    import { quintInOut as quintIn } from 'svelte/easing';
    import type { Rule } from './ruleHandler'

    export let validator: Rule;
    export let positiveColor = 'darkgreen';
    export let negativeColor = 'crimson';

    let x = 'M3,3 L9,9 M9,3 3,9';
    let v = 'M3,6 L5,9 L9,2';
    let o = '';

    function getColor(status) {
        if (status != undefined) {
            return status ? positiveColor : negativeColor;
        } else return '';
    }
    
    $: color = getColor(status);
</script>

<div class="block">
    <svg viewBox="0 0 12 12" class="w-8 inline">
        {#if status === true}
            <path fill="none" stroke={positiveColor} d={v} transition:draw={{ duration: 500, easing: quintIn }} />
        {:else if status === false}
            <path stroke={negativeColor} d={x} transition:draw={{ duration: 500, easing: quintIn }} />
        {:else}
            <path d={o} transition:draw={{ duration: 300, easing: quintIn }} />
        {/if}
    </svg>
    <div class="inline self-center text-text transition-all duration-1000">{message}</div>
</div>
