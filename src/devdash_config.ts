export interface DevdashConfig {
    github_access_token: string;
    widgets: {
        id: string;
        repository_url: string;
    }[];
}

export const config: DevdashConfig = {
    github_access_token: import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN as string,
    widgets: [
        {
            id: "f731d0d4-3bd6-40e0-a481-9e223a93f00d",
            repository_url: "https://github.com/pandas-dev/pandas",
        },
        {
            id: "1525a243-69e2-4b6c-b73c-3e441ac0a275",
            repository_url: "https://github.com/python-poetry/poetry",
        },
    ],
}