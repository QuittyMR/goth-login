<svelte:options immutable/>
<script lang="ts">
    import Marker from './Marker.svelte'
    import Spinner from "./Spinner.svelte";
    import Validator from "./validator";

    export let ruleSet: string
    export const validator: Validator = new Validator(ruleSet)
</script>

{#await validator.init}
    <div class="w-8 self-center transition-all duration-300">
        <Spinner/>
    </div>
{:then rules}
    <ul>
        {#each rules as rule (rule.message)}
            <li>
                <Marker status={validator.get(rule.message)}>{rule.message}</Marker>
            </li>
        {/each}
    </ul>
{/await}

