
export const Sign_up = async(names, lastName, email, pw, company) => {
    const body = {
        name: names,
        surname: lastName,
        username: email,
        password: pw,
        enterpriseDTO: {
            name: company
        }

    };

    try {
        const response = await fetch('http://localhost:8080/api/v1/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (response.status !== 201) {
            const errorData = await response.json();
            return { errors: errorData };
        }

        return response.status;
    } catch (error) {
        return { errors: { general: "Error de red o servidor." } };
    }
}
