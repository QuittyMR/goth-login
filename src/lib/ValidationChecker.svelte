<svelte:options immutable/>
<script lang="ts">
    import Marker from './Marker.svelte'
    import Spinner from "./Spinner.svelte";
    import type Validator from "./validationService";

    export let value: string
    export let validatorService:Validator

    $:validatorService.update(value)
</script>

<ul>
    {#await validatorService.isReady}
        <div class="w-8">
            <Spinner/>
        </div>
    {:then _}
        {#each validatorService.list() as rule}
            <li>
                <Marker status={validatorService.get(rule, value)}>{rule}</Marker>
            </li>
        {/each}
    {/await}
</ul>
