<svelte:options immutable/>
<script lang="ts">
    import Marker from './Marker.svelte'
    import {GetRules, Rule} from './ruleHandler'
    import Spinner from "./Spinner.svelte";
    import {createEventDispatcher} from "svelte";

    export let value: string
    export let ruleSet: string = undefined

    let isValid = false;
    let rules: Rule[] = []
    //TODO: working with the promise directly in the UI is elegant, but prevents rendering based on `value` changes, or places the rendering at the end of the event loop
    const dispatch = createEventDispatcher()

    let rulePromise: Promise<Rule[]> = GetRules(ruleSet)
    rulePromise.then(results => {
        rules = results
        validateRules(value)
    })

    const validateRules = (value?: string) => {
        let isValidBuffer = true
        rules.forEach(rule => {
            rule.status = value ? rule.isValid(value) : undefined
            if (!rule.status) {
                isValidBuffer = false
            }
        })
        isValid = isValidBuffer
    }

    function emitValid(isValid: boolean) {
        console.log(`Emitting ${isValid} for ${ruleSet}`)
        dispatch(ruleSet, {isValid: isValid})
    }

    $: validateRules(value)
    $: emitValid(isValid)

    function status(rule: Rule, value?: string) {
        return rule.status
    }
</script>

{#await rulePromise}
    <div class="w-8 self-center transition-all duration-300">
        <Spinner/>
    </div>
{:then _}
    <ul>
        {#each rules as rule (rule.message)}
            <li>
                <Marker status={status(rule, value)}>{rule.message}</Marker>
            </li>
        {/each}
    </ul>
{/await}

