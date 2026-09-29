import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('creates a pet and retrieves it by id', async ({ request }) => {
  const petId = faker.number.int({ min: 1, max: 1_000_000_000 });
  const petName = faker.animal.dog();;

  const createResponse = await request.post('pet', {
    data: { id: petId, name: petName, photoUrls: [], status: 'available' },
  });
  expect(createResponse.status()).toBe(200);

  const getResponse = await request.get(`pet/${petId}`);
  expect(getResponse.status()).toBe(200);
  const fetchedPet = await getResponse.json();
  expect(fetchedPet.name).toBe(petName);
});

test('updates pet status to sold', async ({ request }) => {
  const petId = faker.number.int({ min: 1, max: 1_000_000_000 });
  const petName = faker.animal.dog();

  const createResponse = await request.post('pet', {
    data: { id: petId, name: petName, photoUrls: [], status: 'available' },
  });
  expect(createResponse.status()).toBe(200);

  const editResponse = await request.put('pet', {
    data: { id: petId, name: petName, photoUrls: [], status: 'sold' },
  });
  expect(editResponse.status()).toBe(200);

  const getResponse = await request.get(`pet/${petId}`);
  expect(getResponse.status()).toBe(200);
  const fetchedPet = await getResponse.json();
  expect(fetchedPet.status).toBe('sold');
});

test('deletes a pet and verifies it is deleted', async ({request}) => {
    const petId = faker.number.int({ min: 1, max: 1_000_000_000 });
    const petName = faker.animal.dog();
    const createResponse = await request.post('pet', {
        data: {
            id: petId,
            name: petName, 
            photoUrls: []
        }
    });
    expect(createResponse.status()).toBe(200);
  const deleteResponse = await request.delete(`pet/${petId}`);
  expect(deleteResponse.status()).toBe(200);

  const getResponse = await request.get(`pet/${petId}`);
  expect(getResponse.status()).toBe(404);
  
});