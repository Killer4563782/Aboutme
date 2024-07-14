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
                    if (target === 'projects') 
                    {
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

function fetchGitHubRepos(username) 
{
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
            allProjects.forEach(project => 
            {
                project.style.display = 'block';
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
}

function getLanguageIcon(language) 
{
    switch (language) 
    {
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

function getLanguageClass(language) 
{
    switch (language) 
    {
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

function smoothScrollToTop(selector) 
{
    const element = document.querySelector(selector);
    if (element) 
        {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
}

function filterProjects(language) 
{
    const allProjects = document.querySelectorAll('.project-card');
    allProjects.forEach(project => {
        const projectLanguage = project.querySelector('.language span').textContent.toLowerCase();
        if (language === 'all' || projectLanguage === language.toLowerCase()) 
        {
            project.style.display = 'block';
        } 
        else 
        {
            project.style.display = 'none';
        }
    });
}

function detectDeviceAndBuildUI() {
    // Überprüfen, ob es sich um ein mobiles Gerät handelt
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Stylesheets für Desktop und Mobile
    const desktopStyle = document.getElementById('desktopStyle');
    const mobileStyle = document.getElementById('mobileStyle');

    if (isMobile) {
        // Für mobile Geräte
        desktopStyle.disabled = true; // Desktop-Styles deaktivieren
        mobileStyle.disabled = false; // Mobile-Styles aktivieren

        buildMobileUI();
    } 
    else
     {
        // Für Desktop-Geräte
        desktopStyle.disabled = false; // Desktop-Styles aktivieren
        mobileStyle.disabled = true; // Mobile-Styles deaktivieren

        buildDesktopUI();
    }
}

function buildDesktopUI() 
{
    const navContainer = document.getElementById('navContainer');
    const mainContainer = document.getElementById('mainContainer');

    navContainer.innerHTML = `
        <ul id="navList">
            <li><a href="#" data-tab="profile" class="active">Profile</a></li>
            <li><a href="#" data-tab="projects">Projects</a></li>
            <li><a href="#" data-tab="interests">Interests</a></li>
            <li><a href="#" data-tab="social">Social Media</a></li>
        </ul>
    `;

    mainContainer.innerHTML = `
        <section id="profile" class="tab-content active">
            <div class="card">
                <img src="textures/profile.png" alt="Profile Picture">
                <h2>Patrick</h2>
                <p>Hello, I'm Patrick, a 16-year-old student with a passion for programming, particularly in assembly language. I enjoy diving into the intricacies of low-level code and exploring its nuances. Outside of coding, you can find me at the gym or underwater, as diving and sports are my other passions. I approach tasks with precision and enjoy solving complex problems, making programming not just a skill but a fulfilling pursuit in my daily life.</p>
            </div>
        </section>
        <section id="projects" class="tab-content">
            <div class="projects-nav">
                <ul id="projectsNavList">
                    <li><a href="#" class="active" data-subtab="all">All</a></li>
                    <!-- Weitere Subtabs hinzufügen, falls benötigt -->
                </ul>
            </div>
            <div class="projects-list" id="projectsList">
                <!-- Projekt-Karten werden dynamisch generiert -->
            </div>
        </section>
        <section id="interests" class="tab-content">
            <div class="card">
                <h2>My Interests</h2>
                <p>Details about your interests go here.</p>
            </div>
        </section>
        <section id="social" class="tab-content">
            <div class="card">
                <h2>Social Media</h2>
                <p>Links to your social media profiles go here.</p>
            </div>
        </section>
    `;
}

function buildMobileUI() 
{
    const navContainer = document.getElementById('navContainer');
    const mainContainer = document.getElementById('mainContainer');

    navContainer.innerHTML = `
        <ul id="navList">
            <li><a href="#" data-tab="profile" class="active">Profile</a></li>
            <li><a href="#" data-tab="projects">Projects</a></li>
            <li><a href="#" data-tab="interests">Interests</a></li>
            <li><a href="#" data-tab="social">Social Media</a></li>
        </ul>
    `;

    mainContainer.innerHTML = `
        <section id="profile" class="tab-content active">
            <div class="card">
                <img src="textures/profile.png" alt="Profile Picture">
                <h2>Patrick</h2>
                <p>Hello, I'm Patrick, a 16-year-old student with a passion for programming, particularly in assembly language. I enjoy diving into the intricacies of low-level code and exploring its nuances. Outside of coding, you can find me at the gym or underwater, as diving and sports are my other passions. I approach tasks with precision and enjoy solving complex problems, making programming not just a skill but a fulfilling pursuit in my daily life.</p>
            </div>
        </section>
        <section id="projects" class="tab-content">
            <div class="projects-nav">
                <ul id="projectsNavList">
                    <li><a href="#" class="active" data-subtab="all">All</a></li>
                    <!-- Weitere Subtabs hinzufügen, falls benötigt -->
                </ul>
            </div>
            <div class="projects-list" id="projectsList">
                <!-- Projekt-Karten werden dynamisch generiert -->
            </div>
        </section>
        <section id="interests" class="tab-content">
            <div class="card">
                <h2>My Interests</h2>
                <p>Details about your interests go here.</p>
            </div>
        </section>
        <section id="social" class="tab-content">
            <div class="card">
                <h2>Social Media</h2>
                <p>Links to your social media profiles go here.</p>
            </div>
        </section>
    `;
}
// Funktion aufrufen, wenn die Seite geladen ist
detectDeviceAndBuildUI();