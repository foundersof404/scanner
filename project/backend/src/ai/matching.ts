export async function findMatches(embedding: number[]): Promise<any[]> {
    // Stub for vector DB query
    console.log('Finding matches...');
    return [
        { id: '1', name: 'Product A', score: 0.95, price: 10.99 },
        { id: '2', name: 'Product B', score: 0.88, price: 12.50 },
    ];
}
