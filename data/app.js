let allProjects = [];

async function initPortfolio() {
    try {
        const response = await fetch('./data/projects.json');
        allProjects = await response.json();
        renderProjects('all');
    } catch (error) {
        console.error("Error loading project data:", error);
    }
}

function renderProjects(category) {
    const grid = document.getElementById('project-grid');
    const filtered = category === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.category === category);

    grid.innerHTML = filtered.map(project => `
        <div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                        ${project.category.toUpperCase()}
                    </span>
                </div>
                <!-- Clicking project title opens GitHub repo showing README -->
                <h3 class="text-xl font-bold mb-2">
                    <a href="${project.github}" target="_blank" class="hover:text-blue-600 transition flex items-center gap-1">
                        ${project.title} 
                        <span class="text-sm font-normal text-slate-400">↗</span>
                    </a>
                </h3>
                <p class="text-slate-600 text-sm mb-4 leading-relaxed">${project.summary}</p>
            </div>
            <div>
                <div class="flex flex-wrap gap-1.5 mb-5">
                    ${project.stack.map(tech => `<span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">${tech}</span>`).join('')}
                </div>
                <a href="${project.github}" target="_blank" class="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
                    View Code & README on GitHub →
                </a>
            </div>
        </div>
    `).join('');

    // Update active button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-slate-900', 'text-white');
        btn.classList.add('bg-white', 'text-slate-600', 'border');
    });
    event.target.classList.remove('bg-white', 'text-slate-600', 'border');
    event.target.classList.add('bg-slate-900', 'text-white');
}

document.addEventListener('DOMContentLoaded', initPortfolio);