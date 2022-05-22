import {GetRules, Rule} from './ruleHandler'
import {createEventDispatcher} from "svelte";

class Validator {
    readonly init: Promise<Rule[]>
    private rules: Map<string, boolean> = new Map()
    readonly dispatch = createEventDispatcher()

    constructor(ruleSet: string) {
        this.init = GetRules(ruleSet)
    }

    async update(value: string) {
        let rules = await this.init;
        this.dispatch('update')
        rules.forEach(rule => this.rules.set(
            rule.message,
            value ? rule.isValid(value) : undefined
        ))
    }

    isValid(): boolean {
        return [...this.rules.values()].reduce((a, b) => a && b)
    }

    get(rule: string, ..._): boolean {
        return this.rules.get(rule)
    }
}

export default Validator;