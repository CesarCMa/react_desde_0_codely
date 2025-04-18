import { GithubApiResponses, PullRequest, RepositoryData } from "./GithubApiResponse";

interface RepositoryId {
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
        const responsePromises = repositoryUrls
            .map((url) => this.urlToId(url))
            .map((id) => this.searchBy(id));
        
            return Promise.all(responsePromises);
    }

    private urlToId(url: string): RepositoryId {
        const splitUrl = url.split("/");

        return {
            name: splitUrl.pop() as string,
            organization: splitUrl.pop() as string,
        }
    }

    private searchBy(repositoryId: RepositoryId): Promise<GithubApiResponses> {
        const repositoryRequests = this.endpoints
            .map((endpoint) => endpoint.replace("$organization", repositoryId.organization))
            .map((endpoint) => endpoint.replace("$name", repositoryId.name))
            .map((url) =>
                fetch(url)
            );
        
        return Promise.all(repositoryRequests)
            .then((responses) => Promise.all(responses.map((response) => response.json())))
            .then(([repositoryData, pullRequests]) => {
                return {
                    repositoryData: repositoryData as RepositoryData,
                    pullRequests: pullRequests as PullRequest[],
                };
            });
        
    }
}
