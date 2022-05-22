import {GetRules, Rule} from './ruleHandler'

class Validator {
    readonly isReady: Promise<boolean>
    private rules: Rule[]
    private validations: Map<string, boolean> = new Map()

    constructor(ruleSet: string, value?:string) {
        this.isReady = new Promise<boolean>((resolve) => {
            GetRules(ruleSet).then((rules) => {
                this.rules = rules;
                this.update(value);
                return resolve(true);
            })
        })
    }

    update(value: string) {
        if (!this.rules) return
        this.rules.forEach((rule) => this.validations.set(
            rule.message,
            value ? rule.isValid(value) : undefined
        ))
    }

    isValid(): boolean {
        if (!this.rules) return
        return [...this.validations.values()].reduce((a, b) => a && b)
    }

    get(rule: string, ..._): boolean {
        if (!this.rules) return
        return this.validations.get(rule)
    }

    list(): string[] {
        if (!this.rules) return
        return [...this.validations.keys()]
    }
}

export default Validator;