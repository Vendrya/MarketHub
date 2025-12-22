export async function publicHttp<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        {
            ...options,
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
        }
    );

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
}
