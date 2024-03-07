




export async function addCategory(name: string): Promise<void> {
    const response = await fetch("http://localhost:3001/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) {
        throw new Error("Failed to add category");
    }
}
