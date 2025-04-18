import { GithubApiResponses, PullRequest, RepositoryData } from "./GithubApiResponse";

interface RespositoryId {
    organization: string;
    name: string;
}

// TODO: continue on minute 11
export class GitHubApiGithubRepositoryRepository {
    private readonly endpoints = [
        "https://api.github.com/repos/$organization/$name",
        "https://api.github.com/repos/$organization/$name/pulls",
    ];

    constructor(private readonly personalAccessToken: string){};

    async search(repositoryUrls: string[]): Promise<GithubApiResponses[]> {
        const responsePromises = repositoryUrls.map((url) => urlToId(url))
    }

}