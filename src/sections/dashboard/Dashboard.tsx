import { InMemoryGitHubRepositoryRepository } from "../../infrastructure/InMemoryGitHubRepositoryRepository";

import styles from "./Dashboard.module.scss";

import Lock from "./lock.svg?react";
import Unlock from "./unlock.svg?react";
import Star from "./star.svg?react";
import Watchers from "./watchers.svg?react";
import Forks from "./repo-forked.svg?react";
import PullRequest from "./git-pull-request.svg?react";
import PyLogo from "./py-logo.svg?react";

const isoToReadableDate = (lastUpdate: string) => {
    const lastUpdateDate = new Date(lastUpdate);
    const currentDate = new Date();
    const diffDays = currentDate.getDate() - lastUpdateDate.getDate();

    if (diffDays == 0) {
        return "today";
    }

    if (diffDays > 30) {
        return "More than month ago";
    }

    return `${diffDays} days ago` 
};

// Sacando estas instacias fuera evitamos que se pinten cada vez que se renderiza la página.
const repository =  new InMemoryGitHubRepositoryRepository;
const repositories = repository.search();

export function Dashboard() {
    

    // En jsx siempre hay devolver un componente
    return (
        // En lugar de usar siempre divs, react permite usar fragmentos que luego no se renderizan
        // De esta manera se puede evitar el problema de los divs anidados
        // Fragmentos: <> </> que es lo mismo que <React.Fragment> </React.Fragment>
        <> 
            <header className = {styles.header}>
                <section className = {styles.header__container}>
                    <PyLogo />
                    <h1 className = {styles.app__brand}>Open Source Python Projects</h1>
                </section>
            </header>
            <section className={styles.container}>
                {repositories.map((widget) => (
                    // El key ayuda al renderizado de los widgets, es best practice
                    // emplear un id unico siempre en los keys
                    <article className={styles.widget} key={widget.repositoryData.id}>
                        <header className={styles.widget__header}>
                            <a 
                                className={styles.widget__title}    
                                href={widget.repositoryData.html_url}
                                target="_blank"
                                title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
                                rel="noreferrer"
                            >
                                {widget.repositoryData.organization.login}/{widget.repositoryData.name}
                            </a>
                            {widget.repositoryData.private ? <Lock /> : <Unlock />}
                        </header>
                        <div className = {styles.widget__body}>
                            <p>Last update: {isoToReadableDate(widget.repositoryData.updated_at)}</p>
                            <p className={styles.widget__description}>{widget.repositoryData.description}</p>
                        </div>
                        <footer className={styles.widget__footer}>
                            <div className = {styles.widget__stat}>
                                <Star />
                                <span>{widget.repositoryData.stargazers_count}</span>
                            </div>
                            <div className = {styles.widget__stat}>
                                <Watchers />
                                <span>{widget.repositoryData.watchers_count}</span>
                            </div>
                            <div className = {styles.widget__stat}>
                                <Forks />
                                <span>{widget.repositoryData.forks_count}</span>
                            </div>
                            <div className = {styles.widget__stat}>
                                <PullRequest />
                                <span>{widget.pullRequest.length}</span>
                            </div>

                        </footer>
                    </article>
                ))}
            </section>
        </>
    );
}
// Left at minue 10 on the video.