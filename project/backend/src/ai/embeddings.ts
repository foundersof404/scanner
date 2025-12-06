export async function createEmbedding(text: string): Promise<number[]> {
    // Stub for embedding generation
    console.log('Creating embedding for:', text);
    return new Array(1536).fill(0).map(() => Math.random());
}
