<svelte:options immutable/>
<script lang="ts">
    import Marker from './Marker.svelte'
    import {GetRules, Rule} from './ruleHandler'
    import {onMount} from 'svelte/internal'
    import Spinner from "./Spinner.svelte";

    export let value: string
    export let ruleSet: string
    let activeRules: Promise<Rule[]>

    onMount(() => {
        activeRules = GetRules(ruleSet)
    })

    function status(rule: Rule, value: string) {
        return rule.isValid(value)
    }
</script>

<ul>
    {#if activeRules}
        {#await activeRules}
            <div class="w-8">
                <Spinner/>
            </div>
        {:then rules}
            {#each rules as rule}
                <li>
                    <Marker status={value ? status(rule, value) : undefined}>{rule.message}</Marker>
                </li>
            {/each}
        {/await}
    {/if}
</ul>
