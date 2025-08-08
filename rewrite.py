import sys

def name_callback(name):
    if name in [b"Faizan Sayyed", b"Faizan2911"]:
        return b"Nilashish De"
    return name

def email_callback(email):
    if email in [b"faizan_email@example.com"]:  # replace with the real one from Step 1
        return b"nilashishde103@gmail.com"
    return email

callbacks = {
    'name': name_callback,
    'email': email_callback
}

# This import triggers git-filter-repo to run with our callbacks
from git_filter_repo import main
sys.argv.extend([
    '--name-callback', 'callbacks["name"]',
    '--email-callback', 'callbacks["email"]'
])
main()
