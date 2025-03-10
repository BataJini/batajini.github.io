document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Update filters based on URL parameters
    if (params.has('q')) document.querySelector('input[name="q"]').value = params.get('q');
    if (params.has('location')) document.querySelector('input[name="location"]').value = params.get('location');
    if (params.has('remote')) document.querySelector('input[name="remote"]').checked = true;
    if (params.has('fulltime')) document.querySelector('input[name="fulltime"]').checked = true;
    if (params.has('parttime')) document.querySelector('input[name="parttime"]').checked = true;
    
    // Load and display filtered jobs
    loadFilteredJobs(params);
});

function loadFilteredJobs(params) {
    // This would typically be an API call to your backend
    // For now, we'll just display some dummy data
    const jobsList = document.querySelector('.jobs__list');
    if (!jobsList) return;
    
    // Example job data
    const jobs = [
        {
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            location: 'New York, NY',
            salary: '$120,000 - $150,000',
            isRemote: true,
            type: 'Full-time'
        },
        // Add more job listings...
    ];
    
    // Filter jobs based on params
    const filteredJobs = filterJobs(jobs, params);
    
    // Display jobs
    jobsList.innerHTML = filteredJobs.map(job => `
        <div class="job-card">
            <div class="job-card__company-logo">
                <img src="img/company-placeholder.png" alt="${job.company} Logo">
            </div>
            <h3 class="job-card__title">${job.title}</h3>
            <div class="job-card__company">${job.company}</div>
            <div class="job-card__location">
                <i class="location-icon"></i>
                ${job.location}${job.isRemote ? ' (Remote)' : ''}
            </div>
            <div class="job-card__salary">${job.salary}</div>
            <a href="#" class="job-card__button button">View Job</a>
        </div>
    `).join('');
}

function filterJobs(jobs, params) {
    return jobs.filter(job => {
        if (params.has('q') && !job.title.toLowerCase().includes(params.get('q').toLowerCase())) return false;
        if (params.has('location') && !job.location.toLowerCase().includes(params.get('location').toLowerCase())) return false;
        if (params.has('remote') && !job.isRemote) return false;
        if (params.has('fulltime') && job.type !== 'Full-time') return false;
        if (params.has('parttime') && job.type !== 'Part-time') return false;
        return true;
    });
} 