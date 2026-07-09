import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { GithubUser } from "../interfaces/GithubUser";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";

const githubApiClient = axios.create({
    baseURL: GITHUB_API_URL,
});


githubApiClient.interceptors.request.use((config) => {
    const authHeader = AuthService.getAuthHeader();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    config.headers.Accept = "application/vnd.github.v3+json";
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetchRepositories = async (): Promise<Repository[]> => {
    try {
        const response = await githubApiClient.get("/user/repos", {
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
                t: Date.now() // Previene caché
            },
        });
        return response.data as Repository[];
    } catch (error) {
        throw new Error("Error obteniendo repositorios: " + error);
    }
};

export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
    try {
        const response = await githubApiClient.post("/user/repos", repository);
        return response.data as Repository;
    } catch (error) {
        throw new Error("Error creando repositorio: " + error);
    }
};

export const getUserInfo = async (): Promise<GithubUser | null> => {
    try {
        const response = await githubApiClient.get("/user");
        return response.data as GithubUser;
    } catch (error) {
        throw new Error("Error obteniendo informacion del usuario: " + error);
    }
};

export const deleteRepository = async (owner: string, repo: string): Promise<void> => {
    try {
        await githubApiClient.delete(`/repos/${owner}/${repo}`);
    } catch (error) {
        throw new Error("Error eliminando repositorio: " + error);
    }
};

export const editRepository = async (owner: string, repo: string, repositoryData: Partial<RepositoryPayload>): Promise<Repository | null> => {
    try {
        const response = await githubApiClient.patch(`/repos/${owner}/${repo}`, repositoryData);
        return response.data as Repository;
    } catch (error) {
        throw new Error("Error editando repositorio: " + error);
    }
};