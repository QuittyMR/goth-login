type VerificationFunction = (value: string) => boolean;

export async function GetRules(fieldName: string): Promise<Rule[]> {
    // TODO: Get from server
    let rules = {
        email: [
            {
                regexp: '\\w+@\\w+\\.\\w+',
                message: "Must be a valid email"
            },
        ],
        password: [
            { // TODO: mixed case check?
                regexp: '.*[A-Z].*',
                message: 'Must contain an uppercase letter '
            },
            {
                regexp: '.*\\d.*',
                message: 'Must contain a digit'
            },
            {
                regexp: '\\W+',
                message: 'Must contain a special character'
            },
            {
                regexp: '^.{4,}$',
                message: 'Must be longer than 4 characters'
            }
        ]
    }
    let fieldRules = rules[fieldName]
    fieldRules.forEach(rule => rule.isValid = (value: string) => (new RegExp(rule.regexp)).test(value));
    return Promise.resolve(fieldRules)
}

export type Rule = {
    message: string;
    isValid: VerificationFunction;
    status?: boolean;
}
