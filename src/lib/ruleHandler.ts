type VerificationFunction = (value: string) => boolean;

export async function GetRules(fieldName:string): Promise<Rule[]> {
    // TODO: Get from server
    let rules =  {
        email: [
            {
                isValid: '\w+@\w+\.\w+',
                message: "Must be a valid email"
            },
        ],
        password: [
            { // TODO: mixed case check?
                isValid: '.*[A-Z].*',
                message: 'Must contain an uppercase letter '
            },
            {
                isValid: '.*\d.*',
                message: 'Must contain a digit'
            },
            {
                isValid: '.*\W.*',
                message: 'Must contain a special character'
            },
            {
                isValid: '^.{4,}$',
                message: 'Must be longer than 4 characters'
            }
        ]
    }
    let fieldRules = rules[fieldName]
    fieldRules.forEach(rule => {
        rule.isValid = (new RegExp(rule.isValid)).test
    });
    return fieldRules
}

export type Rule = {
    message: string;
    isValid: VerificationFunction;
}

export const rules = {
    length: class implements Rule {
        message: string
        isValid: VerificationFunction
        constructor (length: number) {
            this.message = `must be longer than ${length} characters`
            this.isValid = (password) => password.length > length
        }
    },
    hasSpecial: class implements Rule {
        message: string = 'must contain a special character'
        isValid: VerificationFunction = (password) => /.*\W.*/.test(password)
    },
    hasNumeric: class implements Rule {
        message: string = 'must contain a numeric character'
        isValid: VerificationFunction = (password) => /.*\d.*/.test(password)
    },
    hasMixedCase: class implements Rule {
        message: string = 'must contain an uppercase character'
        isValid: VerificationFunction = (password) => /.*[A-Z].*/.test(password)
    },
    isValidEmail: class implements Rule {
        message: string = 'must be a valid email'
        isValid: VerificationFunction = (password) => /\w+@\w+\.\w+/.test(password)
    },
}
