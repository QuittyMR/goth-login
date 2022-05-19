<script lang="ts">
    import Marker from './Marker.svelte';
    import { rules, GetRules } from './ruleHandler';
    import type { Rule } from './ruleHandler';
    import { onMount } from 'svelte/internal';

    export let value: string;
    
    onMount(async () => {
        // TODO: Get from server
        return {
            isValidEmail: true,
        };
    });

    let activeRules = async () =>
        Object.entries(await getRules())
            .filter((entry) => entry[1])
            .map((entry) => {
                let validator = new rules[entry[0]]();
                return { status: validator.isValid(value), message: validator.message };
            });
</script>

<ul>
    {#each activeRules as rule}
        <li><Marker {...rule} /></li>
    {/each}
</ul>
