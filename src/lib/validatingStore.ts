import {Writable, writable} from "svelte/store";
import type Validator from "./validationService";

export class ValidatingStore<T> {
    value: Writable<T> = writable<T>()
    isValid = writable<boolean>()
    private readonly validator:Validator

    constructor(validator:Validator) {
        this.validator = validator
        validator.isReady.then(this.init)
    }

    private init() {
        this.isValid.set(this.validator.isValid())
    }

    set(value:T) {
        this.value.set(value)
        this.isValid.set(this.validator.isValid())
    }
    subscribe=this.value.subscribe
}
