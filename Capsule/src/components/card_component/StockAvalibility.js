export const stock_check_forForms = (saltFormsJson) => {
    // Iterate over each form (tablet, capsule)
    for (const formKey in saltFormsJson) {
        const form = saltFormsJson[formKey];
        // console.log("form",form);
        
        // Iterate over each strength (e.g., 50mg, 100mg)
        for (const strengthKey in form) {
            const strength = form[strengthKey];
            // console.log("strength",strength);
            // Iterate over each packaging (e.g., 10 tablets, 20 capsules)
            for (const packagingKey in strength) {
                const packaging = strength[packagingKey];
                // console.log("packaging",packaging);
                // Check if packaging is not null
                if (packaging !== null) {
                    // Iterate over each ID
                    for (const idKey in packaging) {
                        const id = packaging[idKey];
                        
                        // If any ID is not null, return true
                        if (id !== null) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    // If no non-null ID found, return false
    return false;
}
export const  stock_check_forStrengths = (strengths) => {
        // Iterate over each strength (e.g., 50mg, 100mg)
        for (const strengthKey in strengths) {
            const strength = strengths[strengthKey];
            
            // Iterate over each packaging (e.g., 10 tablets, 20 capsules)
            for (const packagingKey in strength) {
                const packaging = strength[packagingKey];
                
                // Check if packaging is not null
                if (packaging !== null) {
                    // Iterate over each ID
                    for (const idKey in packaging) {
                        const id = packaging[idKey];
                        
                        // If any ID is not null, return true
                        if (id !== null) {
                            return true;
                        }
                    }
                }
            }
        }
        // If no non-null ID found, return false
        return false;
    }



export const checkFormsForNonNullIds = (saltFormsJson) => {
    const results = [];

    // Iterate over each form (e.g., tablet, capsule)
    for (const formKey in saltFormsJson) {
        const form = saltFormsJson[formKey];
        const formResults = [];

        // Iterate over each strength (e.g., 50mg, 100mg)
        for (const strengthKey in form) {
            const strength = form[strengthKey];
            let strengthHasNonNullId = false;

            // Iterate over each packaging (e.g., 10 tablets, 20 capsules)
            for (const packagingKey in strength) {
                const packaging = strength[packagingKey];

                // Check if packaging is not null
                if (packaging !== null) {
                    // Iterate over each ID
                    for (const idKey in packaging) {
                        const id = packaging[idKey];

                        // If any ID is not null, mark this strength as having a non-null ID
                        if (id !== null) {
                            strengthHasNonNullId = true;
                            break;
                        }
                    }
                }

                // If we found a non-null ID in this packaging, no need to check more packagings for this strength
                if (strengthHasNonNullId) {
                    break;
                }
            }

            // Store the result for this strength
            formResults.push(strengthHasNonNullId);
        }

        // Store the results for this form
        results.push(formResults);
    }

    return results;
}