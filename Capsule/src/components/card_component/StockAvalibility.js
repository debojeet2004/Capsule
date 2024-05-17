export const checkFormsForNonNullIds = (saltFormsJson) => {
    const results = [];

    for (const formKey in saltFormsJson) {
        const form = saltFormsJson[formKey];
        let formHasNonNullId = false;

        // Iterate over each strength (e.g., 50mg, 100mg)
        for (const strengthKey in form) {
            const strength = form[strengthKey];

            // Iterate over each packaging (e.g., 10 tablets, 20 capsules)
            for (const packagingKey in strength) {
                const packaging = strength[packagingKey];

                // Check if packaging is not null
                if (packaging !== null) {
                    // Iterate over each ID
                    for (const idKey in packaging) {
                        const id = packaging[idKey];

                        // If any ID is not null, mark this form as having a non-null ID
                        if (id !== null) {
                            formHasNonNullId = true;
                            break;
                        }
                    }
                }

                // If we found a non-null ID in this packaging, no need to check more packagings for this strength
                if (formHasNonNullId) {
                    break;
                }
            }

            // If we found a non-null ID in this strength, no need to check more strengths for this form
            if (formHasNonNullId) {
                break;
            }
        }

        // Store the result for this form
        results.push(formHasNonNullId);
    }

    return results;
}



export const checkStrengthForNonNullIds = (saltFormsJson) => {
    const results = [];

    for (const strengthKey in saltFormsJson) {
        const strength = saltFormsJson[strengthKey];
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
        results.push(strengthHasNonNullId);
    }

    return results;
}


export const checkPackagingForNonNullIds = (packagingJson) => {
    const results = [];

    // Iterate over each packaging
    for (const packagingKey in packagingJson) {
        const packaging = packagingJson[packagingKey];
        let packagingHasNonNullId = false;

        // Check if packaging is not null
        if (packaging !== null) {
            // Iterate over each ID
            for (const idKey in packaging) {
                const id = packaging[idKey];

                // If any ID is not null, mark this packaging as having a non-null ID
                if (id !== null) {
                    packagingHasNonNullId = true;
                    break;
                }
            }
        }

        // Store the result for this packaging
        results.push(packagingHasNonNullId);
    }

    return results;
}
