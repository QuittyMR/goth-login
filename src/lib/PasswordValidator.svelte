<script lang="ts">
    import Marker from './Marker.svelte';
    import { rules } from './ruleHandler';
    import type { Rule } from './ruleHandler';

    export let password: string;

    // TODO: Get from server
    let passwordRules = {
        length: 4,
        hasSpecial: true,
        hasMixedCase: true,
        hasNumeric: true,
    };

    let activeRules = [
        new rules.length(passwordRules.length),
        ...Object.keys(passwordRules)
            .filter((rule: string) => passwordRules[rule] === true)
            .map((rule: string): Rule => new rules[rule]()),
    ];
</script>

<ul>
    {#each activeRules as rule}
        {rule}
        <li><Marker status={password ? rule.isValid(password) : undefined} message={rule.message} /></li>
    {/each}
</ul>
