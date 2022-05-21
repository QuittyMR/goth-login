<svelte:options immutable />
<script lang="ts">
    import Marker from './Marker.svelte'
    import {GetRules, Rule} from './ruleHandler'
    import {onMount} from 'svelte/internal'

    export let value: string
    export let ruleSet: string
    let activeRules: Promise<Rule[]>

    onMount(async () => {
        activeRules = GetRules(ruleSet)
    })

    function status(rule:Rule, value:string) {
        return rule.isValid(value)
    }
</script>

<ul>
    {#if activeRules}
        {#await activeRules}
            Loading rules from server... //TODO: spinner
        {:then rules}
            {#each rules as rule}
                <li>
                    <Marker status={value ? status(rule, value) : undefined}>{rule.message}</Marker>
                </li>
            {/each}
        {/await}
    {/if}
</ul>
