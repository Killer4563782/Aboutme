document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('nav a');
    const tabContents = document.querySelectorAll('.tab-content');
    const projectsNavLinks = document.querySelectorAll('.projects-nav a');
    const projectsContainer = document.querySelector('.projects-list');

    tabs.forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                    if (target === 'projects') {
                        smoothScrollToTop('.tabs-container');
                    }
                }
            });
        });
    });

    projectsNavLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const subtab = link.getAttribute('data-subtab');

            projectsNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            filterProjects(subtab);
        });
    });

    fetchGitHubRepos('Killer4563782');
});

function fetchGitHubRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.querySelector('.projects-list');
            projectsContainer.innerHTML = '';

            data.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.classList.add(getLanguageClass(repo.language));
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <div class="language">
                        <i class="devicon-${getLanguageIcon(repo.language)}-plain colored"></i>
                        <span>${repo.language || 'Unknown'}</span>
                    </div>
                    <p>${repo.description || 'No description available'}</p>
                `;
                projectsContainer.appendChild(projectCard);
            });

            const allProjects = document.querySelectorAll('.project-card');
            allProjects.forEach(project => {
                project.style.display = 'block';
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
}

function getLanguageIcon(language) {
    switch (language) {
        case 'JavaScript':
            return 'javascript';
        case 'Python':
            return 'python';
        case 'C++':
            return 'cplusplus';
        case 'CSS':
            return 'css3';
        default:
            return 'file';
    }
}

function getLanguageClass(language) {
    switch (language) {
        case 'JavaScript':
            return 'javascript';
        case 'Python':
            return 'python';
        case 'C++':
            return 'cplusplus';
        case 'C#':
            return 'csharp';
        case 'C':
            return 'c';
        case 'TypeScript':
            return 'typescript';
        case 'CSS':
            return 'css3';
        default:
            return 'unknown';
    }
}

function smoothScrollToTop(selector) {
    const element = document.querySelector(selector);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
}

function filterProjects(language) {
    const allProjects = document.querySelectorAll('.project-card');
    allProjects.forEach(project => {
        const projectLanguage = project.querySelector('.language span').textContent.toLowerCase();
        if (language === 'all' || projectLanguage === language.toLowerCase()) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}
