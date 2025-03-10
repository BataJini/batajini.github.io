from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from .forms import CustomUserCreationForm, CustomAuthenticationForm

# Sample job data (simulating a database)
JOBS = [
    {
        'id': 1,
        'title': 'Senior Software Engineer',
        'company': 'TechCorp Inc.',
        'location': 'New York, NY',
        'is_remote': True,
        'salary': '$120,000 - $150,000',
        'type': 'Full-time',
        'description': 'We are looking for a Senior Software Engineer to join our team. You will be responsible for developing high-quality applications, collaborating with cross-functional teams, and mentoring junior developers.',
        'requirements': [
            'Bachelor\'s degree in Computer Science or related field',
            '5+ years of experience in software development',
            'Proficiency in Python, JavaScript, and SQL',
            'Experience with web frameworks like Django or Flask',
            'Strong problem-solving skills and attention to detail'
        ],
        'benefits': [
            'Competitive salary and equity',
            'Health, dental, and vision insurance',
            'Flexible work hours and remote options',
            'Professional development budget',
            '401(k) matching'
        ],
        'posted_date': '2023-03-01'
    },
    {
        'id': 2,
        'title': 'UX/UI Designer',
        'company': 'Design Studio',
        'location': 'San Francisco, CA',
        'is_remote': False,
        'salary': '$90,000 - $120,000',
        'type': 'Full-time',
        'description': 'Design Studio is seeking a talented UX/UI Designer to create amazing user experiences. You will work on various projects, from concept to implementation, ensuring the best user experience.',
        'requirements': [
            'Bachelor\'s degree in Design, HCI, or related field',
            '3+ years of experience in UX/UI design',
            'Proficiency in design tools like Figma, Sketch, and Adobe Creative Suite',
            'Portfolio demonstrating strong design skills',
            'Understanding of user-centered design principles'
        ],
        'benefits': [
            'Competitive salary',
            'Health benefits',
            'Creative work environment',
            'Professional development opportunities',
            'Flexible schedule'
        ],
        'posted_date': '2023-03-05'
    },
    {
        'id': 3,
        'title': 'Marketing Manager',
        'company': 'Growth Co.',
        'location': 'Chicago, IL',
        'is_remote': False,
        'salary': '$80,000 - $100,000',
        'type': 'Full-time',
        'description': 'Growth Co. is looking for a Marketing Manager to lead our marketing efforts. You will develop and implement marketing strategies to promote our products and services.',
        'requirements': [
            'Bachelor\'s degree in Marketing or related field',
            '4+ years of experience in marketing',
            'Experience with digital marketing channels',
            'Strong analytical and communication skills',
            'Ability to manage multiple projects simultaneously'
        ],
        'benefits': [
            'Competitive salary',
            'Health and wellness benefits',
            'Professional development budget',
            'Collaborative work environment',
            'Paid time off'
        ],
        'posted_date': '2023-03-10'
    },
]

def home(request):
    return render(request, 'index.html')

def jobs(request):
    # Get search parameters from the request
    query = request.GET.get('q', '')
    location = request.GET.get('location', '')
    remote = request.GET.get('remote', False)
    fulltime = request.GET.get('fulltime', False)
    parttime = request.GET.get('parttime', False)
    
    # For now, we'll just display a simple jobs page with the search parameters
    context = {
        'query': query,
        'location': location,
        'remote': remote,
        'fulltime': fulltime,
        'parttime': parttime,
        'jobs': JOBS
    }
    
    return render(request, 'jobs.html', context)

def job_detail(request, job_id):
    # Find the job with the given ID
    job = next((job for job in JOBS if job['id'] == job_id), None)
    
    # If job not found, return 404
    if not job:
        return render(request, '404.html', {'message': 'Job not found'}, status=404)
    
    context = {
        'job': job
    }
    
    return render(request, 'job_detail.html', context)

def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Account created successfully!')
            return redirect('authentication:home')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = CustomUserCreationForm()
    return render(request, 'authentication/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, 'Logged in successfully!')
            return redirect('authentication:home')
        else:
            messages.error(request, 'Invalid email or password.')
    else:
        form = CustomAuthenticationForm()
    return render(request, 'authentication/login.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.success(request, 'Logged out successfully!')
    return redirect('authentication:home') 