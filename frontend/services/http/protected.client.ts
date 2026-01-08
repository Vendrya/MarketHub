export async function protectedHttp<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(
        `${process.env.API_URL}${url}`,
        {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
        }
    );

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error("Unauthorized");
        }
        throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
}
