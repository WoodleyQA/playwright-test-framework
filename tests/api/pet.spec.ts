import { test, expect } from '@playwright/test';
test('creates a pet and retrieves it by id', async ({ request }) => {
    const petName = `Clifford${Date.now()};`
    // Create a new pet first 
    const createResponse = await request.post('pet', {
        data: {
            name: petName,
            photoUrls:[],
            status:'available',

        }
    });
    expect(createResponse.status()).toBe(200);
    const createdPet = await createResponse.json();
    const petId = createdPet.id; 
    const getResponse = await request.get(`pet/${petId}`);
	expect(getResponse.status()).toBe(200);

	const fetchedPet = await getResponse.json();
	expect(fetchedPet.name).toBe('wrong');
    }
    )

