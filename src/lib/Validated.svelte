<script lang="ts">
    import type { Rule } from './ruleHandler';

    export let validators: Rule[];
    let validatorStates: boolean[];

    let inputElement: HTMLInputElement;
</script>

<slot validatorStates={validatorStates} />
